import { Component, OnInit } from '@angular/core';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { StorageService } from 'src/app/service/storage.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-view-sliders',
  templateUrl: './view-sliders.component.html',
  styleUrls: ['./view-sliders.component.scss']
})
export class ViewSlidersComponent implements OnInit {
  public httpOptions: any;
  public slide: any;
  public filterInput: any;
  public p: any;
  public pageno: any;
  public sort: boolean = false;
  constructor(private apiservice: CommonServiceService, public toast: ToastrService, private storageService: StorageService, public router: Router) { }

  ngOnInit() {
    this.apiservice.title = 'Sliders';
    this.sliders();
  }
  // fetch start
  sliders() {
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
        this.apiservice.getslider(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.slide = res['data'];
        })
      }
    });
  }
  // fetch end

  // Delete Function start
  deleteesliderparticular(id) {
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
            this.apiservice.deleteslider(data, this.httpOptions).subscribe(res => {
              this.sliders();
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
  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.slide = this.apiservice.sortDataByCol(this.slide, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.slide = this.apiservice.sortDataByCol(this.slide, colName, 'asc', type);
    }
  }
  // SORTING API END

  // Update start
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
      "active": row.active,
      "id": row.id,
    }
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateSliderwwwForm(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
  // Update end
  getSliderID(id) {
    this.router.navigate(['/misc/slider-summary', id]);
  }
}
