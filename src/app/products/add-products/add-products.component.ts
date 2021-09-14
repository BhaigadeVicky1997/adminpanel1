import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent implements OnInit {
  public description: any;
  public httpOptions: any;
  public ActiveToggle: any;
  public Brand: any;
  public catDrop: any;
  public subCatDrop: any;
  public Combo: any;
  public crazyDeals: any;
  public skus: any;
  public Discountproduct: any;
  public addFrom: any;

  constructor(public FormBuilder: FormBuilder, private spinner: NgxSpinnerService, private apiserveice: CommonServiceService, public router: Router, public toast: ToastrService, private storageService: StorageService) {
    this.addFrom = this.FormBuilder.group({
      names: new FormControl('', [Validators.required]),
      mrps: new FormControl('', [Validators.required]),
      salepricess: new FormControl('', [Validators.required]),
      brandss: new FormControl('', [Validators.required]),
      catss: new FormControl('', [Validators.required]),
      subcatsss: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      // vegnonveg: new FormControl('', [Validators.required]),
      nofs: new FormControl('', [Validators.required]),
      // crazyyyy: new FormControl('', [Validators.required]),
      // popular8: new FormControl('', [Validators.required]),
      // trending9 : new FormControl('', [Validators.required]),
      // bseller : new FormControl('', [Validators.required]),
      // newlylaunched: new FormControl('', [Validators.required]),

    })
  }//public toast: ToastrService

  ngOnInit() {
    this.apiserveice.gettoken();
    this.brandDrop();
    this.categoryDrop()
    this.SKU();
  }

  brandDrop() {
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
        var data = ''
        this.apiserveice.getBrandDropdown(data, this.httpOptions).subscribe(res => {
          this.Brand = res['data'];
        })
      }
    });
  }

  categoryDrop() {
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
        var data = ''
        this.apiserveice.getCategoryDropdown(data, this.httpOptions).subscribe(res => {
          this.catDrop = res['data'];
        })
      }
    });
  }


  getfilter(id) {
    var data = "categoryId=" + id.target.value;
    this.apiserveice.getSubCategoryDropdown(data, this.httpOptions).subscribe(res => {
      this.subCatDrop = res['data'];
    })
  }


  SKU() {
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
        var data = ''
        this.apiserveice.getSku(data, this.httpOptions).subscribe(res => {
          this.skus = res['data'];
        })
      }
    });
  }


  addProducts() {
    var SKU1 = $('#SKU1').val();
    var name2 = $('#name2').val();
    var Mrp3 = $('#Mrp3').val();
    var salePrice4 = $('#salePrice4').val();
    var brand5 = $('#brand5').val();
    var category6 = $('#category6').val();
    var subcategory7 = $('#subcategory7').val();
    var popular8 = $('#popular8').val();
    var trending9 = $('#trending9').val();
    var discProduct = $('#discProduct').val();
    var activevariantsstogggle = this.ActiveToggle;
    var bestSellerToggle = this.Combo;
    var crazyyyy = $('#crazyyyy').val();
    var bseller = $('#bseller').val();
    var weight = $('#saleweight').val();
    var nofs = $('#nofs').val();
    var newlyLaunched = $('#newlyLaunched').val();
    var vegnonveg = $('#vegnonveg').val();


    var data = {
      "discount": discProduct,
      "activeVariant": activevariantsstogggle, "comboOffer": bseller, "crazyDeals": crazyyyy,
      "productSKU": SKU1, "variantName": name2, "variantPrice": Mrp3, "variantSalePrice": salePrice4, "brandId": brand5,
      "categoryId": category6, "subCategoryId": subcategory7, "popularProducts": popular8, "trendingProducts": trending9,
      "weight": weight, "numberOfServings": nofs, 'newlaunched' : newlyLaunched, "veg" : vegnonveg
    }
    
    this.spinner.show();
    this.apiserveice.addProductapi(data).subscribe(res => {
      if (res['message'] == 'Iserted') {
        setTimeout(() => {
          this.router.navigate(['/products/view-products']);
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    });
  }



  // ((MRP-Sale Price)/MRP)*100

  getCalculate() {
    var Mrp3 = $('#Mrp3').val();
    var salePrice4 = $('#salePrice4').val();
    this.Discountproduct = ((Number(Mrp3) - Number(salePrice4)) / Number(Mrp3) * 100);
  }
}
