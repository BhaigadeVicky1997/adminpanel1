import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { StorageService } from 'src/app/service/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonFunctions } from 'src/app/common.function';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'app-store-locator',
  templateUrl: './store-locator.component.html',
  styleUrls: ['./store-locator.component.scss']
})
export class StoreLocatorComponent implements OnInit {
  public storeLocator: any;
  public filterInput: any;
  public p: any;
  public httpOptions: any;
  public pageno: any;
  public sort: boolean = false;
  constructor(private apiservice: CommonServiceService, public toast: ToastrService, private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.apiservice.title = 'Store Locator';
    this.fetchStorLocator();
  }

  // fetch api start
  fetchStorLocator() {
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
        this.apiservice.getStore(data, this.httpOptions).subscribe(res => {
          this.storeLocator = res['data'];
        })
      }
    });
  }
  // fetch api end

  // Delete Api start
  deleteeStoreLocator(id) {
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
            this.apiservice.deletestore(data, this.httpOptions).subscribe(res => {
              this.fetchStorLocator();
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
  // Delete Api end

  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.storeLocator = this.apiservice.sortDataByCol(this.storeLocator, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.storeLocator = this.apiservice.sortDataByCol(this.storeLocator, colName, 'asc', type);
    }
  }
  // SORTING API 

  // Particular id start
  getStoreLocatorID(id) {
    //console.log(id)
    this.router.navigate(['/misc/store-locator-summary', id]);
  }
  // Particular id end
  StoreUpdate(row) {
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
      "id": row.id, "active": row.active
    }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateStore(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
}
