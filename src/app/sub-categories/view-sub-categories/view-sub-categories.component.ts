import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-sub-categories',
  templateUrl: './view-sub-categories.component.html',
  styleUrls: ['./view-sub-categories.component.scss']
})
export class ViewSubCategoriesComponent implements OnInit {
  public filterInput: any;
  public p: any;
  public httpOptions: any;
  public productSubCategory: any;
  public pageno: any;
  public sort: boolean = false
  constructor(private apiserveice: CommonServiceService, public toast: ToastrService,private storageService: StorageService, public router: Router) { }

  ngOnInit() {
    this.apiserveice.title = 'Sub-Categories';
    this.getSubCategories();
  }
  // fetch start
  getSubCategories() {
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
        this.apiserveice.fetchSubCategory(data, this.httpOptions).subscribe(res => {
          this.productSubCategory = res['data'];
        })
      }
    });
  }
  // fetch end
  //  update start
  SubCategoryUpadate(row) {
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
    var data = { "id": row.id, "active": row.active }
    this.toast.success('Updated Successfully');
    this.apiserveice.UpdateSubCategory(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }

  //  update end
  // delete start
  deleteeSUBcategories(id) {
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
            this.apiserveice.deleteSubCategories(data, this.httpOptions).subscribe(res => {
              this.getSubCategories();
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
  // delete end

  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.productSubCategory = this.apiserveice.sortDataByCol(this.productSubCategory, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.productSubCategory = this.apiserveice.sortDataByCol(this.productSubCategory, colName, 'asc', type);
    }
  }
  // SORTING API END

  // Particular Id start
  getSubCategoryiD(id) {
    this.router.navigate(['/sub-categories/sub-categories-summary', id]);
  }
  // Particular Id end
}
