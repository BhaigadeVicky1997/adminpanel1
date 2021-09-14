import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  public httpOptions: any;
  public p: any;
  public product: any;
  public updatedProduct: any;
  public brand: any;
  public pageno: any;
  public filterInput: any;
  public isDesc: boolean;
  public productSummary: any;
  public productPictures: any;
  public id: any;
  public sort: boolean = false;
  constructor(public route: ActivatedRoute, private apiserveice: CommonServiceService, public router: Router, private storageService: StorageService, public toast: ToastrService) { }

  ngOnInit() {
    this.apiserveice.title = 'Products';
    this.id = this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }

  // Fetch Start 
  getProduct() {
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
        var data = `&all_product=1`
        this.apiserveice.getproduct(data, this.httpOptions).subscribe(res => {
          this.product = res['data'];
          this.product.forEach(element => {
            element['discount'] = Math.floor((element.variantPrice - element.variantSalePrice) / element.variantPrice * 100);
          });
          //console.log(this.product);
          // this.pageno = res['total_records'];
          // this.page();
        })
      }
    });
  }

  // Pagination function start
  page() {
    var data = `pageno=${this.p}&all_product=1`;//P function is present in HTML thats y = this.p
    this.apiserveice.getproduct(data, this.httpOptions).subscribe(res => {
      this.product = res['data'];
      //console.log(this.product);
    }, err => {
      console.log(err.error);
    });
  }
  // Pagination function start


  // Delete Function start
  deleteeProduct(id) {
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
            this.apiserveice.deleteProduct(data, this.httpOptions).subscribe(res => {
              this.getProduct();
            }, err => {
              console.log(err.error);
            })
            Swal.fire(
              'Deleted!',
              'Your Product has been deleted.',
              'success'
            )
          }
        })
      }
    });
  }
  // Delete Function end

  // Update Function start
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
      "activeVariant": row.activeVariant,
      "id": row.id,
    }
    this.toast.success('Updated Successfully');
    this.apiserveice.updateProduct(data, this.httpOptions).subscribe(res => {
      //console.log(res);
      //this.getProduct();
    });
  }
  // Update Function end

  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.product = this.apiserveice.sortDataByCol(this.product, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.product = this.apiserveice.sortDataByCol(this.product, colName, 'asc', type);
    }
  }
  // SORTING API END

  // Particular Id start
  getProductID(id, updatedData, data) {
    this.router.navigate(['/products/product-variant-summary', id,]);
    this.productSummary = updatedData;
    this.productPictures = data;
  }
  updateParticularProduct(updateddata) {
    this.updatedProduct = updateddata;
  }
  // Particular Id start

}
