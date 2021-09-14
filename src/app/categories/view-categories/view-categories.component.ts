import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from 'src/app/service/common-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {
  public filterInput: any;
  public p: any;
  public httpOptions: any;
  public productCategory: any;
  public pageno: any;
  public sort: boolean = false
  public navOrder:any;

  constructor(private apiserveice: CommonServiceService, private storageService: StorageService, public router: Router, public toast: ToastrService) { }

  ngOnInit() {
    this.apiserveice.title = 'Categories';
    this.getCategories();
  }

  // category fetch start
  getCategories() {
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
        var data = '';
        this.apiserveice.fetchCategory(data, this.httpOptions).subscribe(res => {
          this.productCategory = res['data'];
        })
      }
    });
  }
  // category fetch end

  // Delete category start
  deleteCategory(id) {
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
            this.apiserveice.deleteCategories(data, this.httpOptions).subscribe(res => {
              this.getCategories();
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
  // Delete category end

  //Id roterlink start 
  getCategoryiD(id) {
    this.router.navigate(['/categories/categories-summary', id]);
  }
  //Id roterlink end 

  // update start
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

    var data = {
      "active": row.active.toString(),
      "id": row.id,"nav_order":this.navOrder
    }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiserveice.UpdateCategorywwwForm(data, this.httpOptions).subscribe(res => {
    });
  }
  // update end
  getOrderNav(event) {
    this.navOrder = event.target.value;
    //console.log(this.navOrder)
  }
  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.productCategory = this.apiserveice.sortDataByCol(this.productCategory, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.productCategory = this.apiserveice.sortDataByCol(this.productCategory, colName, 'asc', type);
    }
  }
  // SORTING API END
}
