import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view-coupan',
  templateUrl: './view-coupan.component.html',
  styleUrls: ['./view-coupan.component.scss']
})
export class ViewCoupanComponent implements OnInit {
  public filterInput: any;
  public p: any;
  public httpOptions: any;
  public coupanCode: any;
  public sort: boolean = false;
  public pageno: any;
  constructor(private apiservice: CommonServiceService,public toast: ToastrService, private storageService: StorageService,private router:Router) { }

  ngOnInit() {
    // this.apiservice.gettoken();
    this.apiservice.title = 'Coupon-Code';
    this.getCoupancode();
  }

  getCoupancode() {
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
        var data = ''
        this.apiservice.fetchCoupanCode(data, this.httpOptions).subscribe(res => {
          this.coupanCode = res['data'];
        })
      }
    });
  }

  deleteeCoupanCodee(id) {
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
            var data = id
            this.apiservice.DeleteCoupanCode(data, this.httpOptions).subscribe(res => {
              this.getCoupancode();
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
  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.coupanCode = this.apiservice.sortDataByCol(this.coupanCode, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.coupanCode = this.apiservice.sortDataByCol(this.coupanCode, colName, 'asc', type);
    }
  }
  // SORTING API END

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
    var data = {
      "Active": row.Active,
      "id": row.id,
    }
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateCoupan(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
  // Update Function end
  getPrticularCoupanID(id,type) {
    //console.log(id,type);
    this.router.navigate(['/coupan-code/coupan-code-summary', id,type]);
  }
}
