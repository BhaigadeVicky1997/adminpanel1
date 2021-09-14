import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonFunctions } from 'src/app/common.function';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  public banner: any;
  public filterInput: any;
  public p: any;
  public pageno: any;
  public httpOptions: any;
  public BannerFetch: any;
  public sort: boolean = false;
  constructor(private apiservice: CommonServiceService, private storageService: StorageService, public router: Router) {

  }

  ngOnInit() {
    this.apiservice.title = 'Banner';
    this.FetchBanner();
  }
  // Fetch Banner start
  FetchBanner() {
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
        this.apiservice.getBanner(data, this.httpOptions).subscribe(res => {
          this.BannerFetch = res['data'];
        })
      }
    });
  }
  // Fetch Banner End
  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.BannerFetch = this.apiservice.sortDataByCol(this.BannerFetch, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.BannerFetch = this.apiservice.sortDataByCol(this.BannerFetch, colName, 'asc', type);
    }
  }
  // SORTING API END
  // Particular id start
  getBannerID(id) {
    this.router.navigate(['/misc/banner-summary', id]);
  }
  // Particular id end
  // Delete Function start
  deleteeban(id) {
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
            this.apiservice.deletebanner(data, this.httpOptions).subscribe(res => {
              this.FetchBanner();
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
}
