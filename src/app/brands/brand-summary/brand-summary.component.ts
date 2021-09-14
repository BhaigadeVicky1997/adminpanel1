import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-brand-summary',
  templateUrl: './brand-summary.component.html',
  styleUrls: ['./brand-summary.component.scss']
})
export class BrandSummaryComponent implements OnInit {
  public httpOptions: any;
  public Pbrand: any;
  public Popularbrand: any;
  public TrendingBrand: any;
  public multipleImages = [];
  public bName1: any;
  public popular2: any;
  public trendingbrand3: any;
  public ActiveToggle: any;
  public id: any;
  public BrandImage: any;
  public Active: any;
  public ParticularBrands: any;
  public p: any;
  public pageno: any;
  public filterInput: any;
  public sort: boolean = false;
  imageFetch: any;
  imagePath: any;
  constructor(public route: ActivatedRoute, private apiserveice: CommonServiceService, public toast: ToastrService, public router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.apiserveice.title = 'Brand Summary';
    this.apiserveice.getFiletoken();
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.ParticularproductBrands();
    this.getBrandWIthID();

  }
  ParticularproductBrands() {
    var token = '';
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'token') != undefined) {
        token = dbres[CommonFunctions.findKeyIndex(dbres, 'token')]['token'];
        //console.log(token);
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          })
        };
        var data = "brandId=" + this.id;
        this.apiserveice.productBrandSumm(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.bName1 = res['data'][0].brand_name;
          this.popular2 = res['data'][0].popular_brand;
          this.trendingbrand3 = res['data'][0].trending_brand;
          this.ActiveToggle = res['data'][0].active;
          if (res['data'][0].brand_image !== '') {
            this.imagePath = 'https://api.sourceofsupplements.com/brand/' + res['data'][0].brand_image;
            //this.imagePath = 'https://sos.api-central.kenmarkserver.com/brand/' + res['data'][0].brand_image;
            this.imagePath =  this.apiserveice.domainname + "brand/" + res['data'][0].brand_image;
          } else {
            this.imagePath = '';
          }

        })
      }
    });
  }
  selectMultipleImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
      //console.log(this.multipleImages);
    }
  }
  UpdateBrand() {
    const formData = new FormData();
    let immget;
    for (let img of this.multipleImages) {
      immget = img;
      //  var data = "brandId=" + this.id;
      formData.append('brand_image', immget);
    }
    formData.append("id", this.id)
    //console.log(formData);
    this.toast.success('Updated Successfully');
    this.apiserveice.updateProductBrand(formData).subscribe(res => {
      //console.log(res);
      this.ParticularproductBrands();
    }, err => {
      console.log(err.error);
    })
  }

  brandUpadate(fieldType) {
    var token = '';
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'token') != undefined) {
        token = dbres[CommonFunctions.findKeyIndex(dbres, 'token')]['token'];
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          })
        };
      }
    });
    var data = { "id": this.id, "active": this.ActiveToggle.toString() };
    if (fieldType == 'nameBrands') {
      data["brand_name"] = this.bName1;
    }
    else if (fieldType == 'popularBrands') {
      data["popular_brand"] = this.popular2;
    }
    else if (fieldType == 'trendingsbrands') {
      data["trending_brand"] = this.trendingbrand3;
    }

    this.toast.success('Updated Successfully');
    this.apiserveice.UpdateBrandwwwForm(data, this.httpOptions).subscribe(res => {
      //console.log(res);
      this.ParticularproductBrands();
      //this.getproductVariantSummary();
    });
  }





  getBrandWIthID() {
    var token = '';
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'token') != undefined) {
        token = dbres[CommonFunctions.findKeyIndex(dbres, 'token')]['token'];
        //console.log(token);
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          })
        };
        var data = "brandId=" + this.id;
        this.apiserveice.particularBrandID(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.ParticularBrands = res['data'];

        })
      }
    });
  }
  page() {
    var data = `pageno=${this.p}&all_product=1`;//P function is present in HTML thats y = this.p
    //console.log(data);
    this.apiserveice.particularBrandID(data, this.httpOptions).subscribe(res => {
      this.ParticularBrands = res['data'];

    }, err => {
      console.log(err.error);
    });
  }
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.ParticularBrands = this.apiserveice.sortDataByCol(this.ParticularBrands, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.ParticularBrands = this.apiserveice.sortDataByCol(this.ParticularBrands, colName, 'asc', type);
    }
  }

}
