import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-view-brand',
  templateUrl: './view-brand.component.html',
  styleUrls: ['./view-brand.component.scss']
})
export class ViewBrandComponent implements OnInit {
  public Pbrand: any;
  public httpOptions: any;
  public filterInput: any;
  public p: any;
  public pageno: any;
  public sort: boolean = false;
  public popularsbrand: any;
  public trendingsBrand: any;
  constructor(private apiserveice: CommonServiceService, public router: Router, private storageService: StorageService, public toast: ToastrService) { }

  ngOnInit() {
    this.apiserveice.title = 'Brands';
    this.apiserveice.gettoken();
    this.productBrands();
  }

  // fetch start
  productBrands() {
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
        var data = '';
        this.apiserveice.ProductBrand(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.Pbrand = res['data'];
        })
      }
    });
  }
  // fetch end

  // Update function start
  updateActive(row) {
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
    var data1 = row.id;
    var data = {
      "popular_brand": this.popularsbrand, "trending_brand": this.trendingsBrand, "active": row.active.toString(),
      "id": row.id,
    }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiserveice.UpdateBrandwwwForm(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
  getPopularBrandOrder(event) {
    this.popularsbrand = event.target.value;
    //console.log(this.popularsbrand)
  }
  getTrendingBrandOrder(event) {
    this.trendingsBrand = event.target.value;
    //console.log(this.trendingsBrand)
  }
  // Update function end

  // Delete function start
  deleteeBrand(id) {
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
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#D31D28',
          cancelButtonColor: '#D31D28',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            var data = id;
            //console.log(data);
            this.apiserveice.deleteProductBrand(data, this.httpOptions).subscribe(res => {
              //console.log(res);
              this.productBrands();
            }, err => {
              console.log(err.error);
            })
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      }
    });
  }
  // Delete function end

  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.Pbrand = this.apiserveice.sortDataByCol(this.Pbrand, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.Pbrand = this.apiserveice.sortDataByCol(this.Pbrand, colName, 'asc', type);
    }
  }
  // SORTING API END

  // Particular id start
  getProductbrandID(id) {
    this.router.navigate(['/brands/brand-summary', id]);
  }
  // Particular id end

}
