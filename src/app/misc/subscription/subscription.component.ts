import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { ExcelService } from 'src/app/service/excel.service';
declare var $: any;
@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {


  public filterInput: any;
  public p: any;
  public httpOptions: any;
  public sort: boolean = false;
  public SubscriptionFetch: any;
  public pageno: any;
  constructor(private apiservice: CommonServiceService, private excelService: ExcelService, private storageService: StorageService) { }

  ngOnInit() {
    this.apiservice.title = 'Subscription';
    this.getSubscription();
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });
  }
  getSubscription() {
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
        this.apiservice.fetchSubscription(data, this.httpOptions).subscribe(res => {
          this.SubscriptionFetch = res['data'];
        })
      }
    });
  }
  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.SubscriptionFetch = this.apiservice.sortDataByCol(this.SubscriptionFetch, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.SubscriptionFetch = this.apiservice.sortDataByCol(this.SubscriptionFetch, colName, 'asc', type);
    }
  }
  // SORTING API END

  // EXCEL START
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.SubscriptionFetch, 'Subscription');
  }
  // EXCEL END
}
