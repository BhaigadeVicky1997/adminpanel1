import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import * as Chart from 'chart.js';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { Router } from '@angular/router';
import { ExcelService } from 'src/app/service/excel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  math = Math;
  public orders: any;
  public filterInput: any;
  public pageno: any;
  public p: any;
  public httpOptions: any;
  public fetchOrders: any;
  public sort: boolean = false;
  public fetchExcel: any;
  public fetchExcelCustomer: any;
  public id: any = [];
  trackLink: any = [];


  constructor(private apiservice: CommonServiceService, private excelService: ExcelService, private storageService: StorageService, public router: Router, private spinner: NgxSpinnerService, public toast: ToastrService) { }

  ngOnInit() {
    this.apiservice.title = 'Orders';
    this.apiservice.gettoken();
    this.getOrder();
    this.trackLink = [];
    this.fetchCustomerExcel()
    this.fetchGuestExcel()
  }

  // fetch start
  getOrder() {
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
        this.apiservice.fetchOrder(data, this.httpOptions).subscribe(res => {
          this.fetchOrders = res['data'];
          this.storageService.updateItems({ 'nextpre': this.fetchOrders }, 'nextpre');
        })
      }
    });
  }
  // fetch end

  // fetch guest excel start
  fetchGuestExcel() {
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
        this.apiservice.guestExcel(data, this.httpOptions).subscribe(res => {
          this.fetchExcel = res['data'];
        })
      }
    });
  }
  // fetch guest excel end

  // fetch Customer excel start
  fetchCustomerExcel() {
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
        this.apiservice.customerExcel(data, this.httpOptions).subscribe(res => {
          this.fetchExcelCustomer = res;
        })
      }
    });
  }
  // fetch Customer excel end

  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.fetchOrders = this.apiservice.sortDataByCol(this.fetchOrders, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.fetchOrders = this.apiservice.sortDataByCol(this.fetchOrders, colName, 'asc', type);
    }
  }
  // SORTING API END

  // particular api start
  getPrticularOrderID(id, guestId, clientId) {
    this.router.navigate(['/orders/order-summary', id, (guestId) ? guestId : 0, (clientId) ? clientId : 0]);
  }
  // particular api end

  // EXCEL START GUEST
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.fetchExcel, 'Guest Excel');
  }
  // EXCEL END GUEST
  // EXCEL START Customer
  exportAsXLSXs() {
    this.excelService.exportAsExcelFile(this.fetchExcelCustomer, 'Customer Excel');
  }
  // EXCEL end Customer


  // select all on click to get value by id all select start
  // selectAll(event) {
  //   if (event.target.checked == true) {
  //     this.fetchOrders.forEach(ele => {
  //       this.ORDERID.push({ id: ele.id });
  //     });
  //     console.log(this.ORDERID);
  //   } else {
  //     this.ORDERID = [];
  //   }
  // }
  // select all on click to get value by id all select end

  // Apply coupon code start
  checkValue(event, order_id) {
    if (event.target.checked == true) {
      this.trackLink.push(order_id);
    } else {
      let index = this.trackLink.findIndex(a => a === order_id);
      this.trackLink.splice(index, 1);
    }

    console.log(this.trackLink);
    /* console.log(event.target.checked);
    if (order_id) {
      this.trackLink.push(order_id);
    }

    console.log(this.trackLink); */
    //this.createSendTrackLinkObj(id);


    /* console.log(data);
    this.spinner.show();
    this.apiservice.sendtracklinkapi(data).subscribe(res => {
      console.log(res);
    }); */
  }

  sendtracklink() {
    let multipleID = [];
    this.trackLink.forEach(element => {
      multipleID.push({ "id": element.toString() });
    });

    var data = { "orderId": multipleID };
    if (data) {
      // this.spinner.show();
      this.apiservice.sendtracklinkapi(data).subscribe(res => {
    if(res['message']=='sent the trackorder successfully'){
          this.toast.success(res['message']);
        } 
      });
    }
  }


}
