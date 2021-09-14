import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { StorageService } from 'src/app/service/storage.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonFunctions } from 'src/app/common.function';
import { ExcelService } from 'src/app/service/excel.service';
declare var $: any;
@Component({
  selector: 'app-orders-summary',
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.scss']
})
export class OrdersSummaryComponent implements OnInit {
  public httpOptions: any;
  public id: any;
  public orderStat: any;
  public orderids: any;
  public clientId: any;
  public partucularOrder: any;
  public sort: boolean = false;
  public Cname: any;
  public deviceIdentifier: any;
  public emailD: any;
  public HouseNo: any;
  public Areas: any;
  public HAddress: any;
  public State: any;
  public Count: any;
  public orders: any;
  public guestIds: any;
  public deviceIndentity: any;
  public mobNumber: any;
  public fullNAme: any;
  public guestId: any;
  public mNumberame: any;
  public clientShow: boolean = false;
  public guestShow: boolean = false;
  public streetaddress: any;
  public countries: any;
  public houseNO: any;
  public sAddrrs: any;
  public AREa: any;
  public CiTy: any;
  public sTate: any;
  public countriess: any;
  public codePost: any;
  public ClientProduct: any;
  public countriessDDD: any;
  public codePostDDD: any;
  public ordersExcel: any;
  emailClient: any;
  coupanCode: any;
  clientAddress: any;
  nextprev: any;

  constructor(public route: ActivatedRoute, private excelService: ExcelService, private apiserveice: CommonServiceService, public toast: ToastrService, public router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.apiserveice.title = 'Order Summary';
    this.apiserveice.gettoken();
    this.route.params.subscribe(routeParams => {
      this.id = routeParams.id;
      this.guestId = routeParams.guestId;
      this.clientId = routeParams.clientid;
      if (this.clientId == 0) {
        this.clientShow = false;
        this.guestShow = true;
      }
      else {
        this.guestShow = false;
        this.clientShow = true;
      }
      this.ParticularOrdder();
    });
    /* this.id = this.route.snapshot.paramMap.get('id');
    this.guestId = this.route.snapshot.paramMap.get('guestId');
    this.clientId = this.route.snapshot.paramMap.get('clientid'); */

    // Hide n show start
    this.getnextandPrevious();
    // Hide n show end
  }

  getnextandPrevious() {
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'nextpre') != undefined) {
        this.nextprev = dbres[CommonFunctions.findKeyIndex(dbres, 'nextpre')]['nextpre'];
      }
    });
  }

  // Particular fetch start
  ParticularOrdder() {
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

        var data = this.clientId !== '0' ? `id=${this.id}&clientId=${this.clientId}` : `id=${this.id}`;
        this.apiserveice.orderSummary(data, this.httpOptions).subscribe(res => {
          // console.log(res['data']['rows'][0]['client'].email);
          //For guest 
          try {
            this.orders = res['data'][0];
            this.guestIds = res['data'][0]['guest'].id;
            this.deviceIndentity = res['data'][0]['guest'].deviceIdentifier;
            this.mobNumber = res['data'][0]['guest'].phoneNumber;
            this.emailD = res['data'][0]['guest'].emailID;
            this.fullNAme = res['data'][0]['guest'].fullName;
            this.houseNO = res['data'][0]['guest'].houseNumber;
            this.sAddrrs = res['data'][0]['guest'].streetAddress;
            this.AREa = res['data'][0]['guest'].area;
            this.CiTy = res['data'][0]['guest'].city;
            this.sTate = res['data'][0]['guest'].state;
            this.countriess = res['data'][0]['guest'].country;
            this.codePost = res['data'][0]['guest'].postCode;
            this.partucularOrder = res['data'][0]['order_products'];
            //console.log(this.partucularOrder);
            this.coupanCode = res['data'][0]['order_products'][0]['productVariant']['productCouponCodes'][0]['coupan_code']['coupan_code'];
          } catch (error) {
            if (res['data']['rows']) {
              this.orders = res['data']['rows'][0];
              this.Cname = res['data']['rows'][0]['client'].name;
              this.emailClient = res['data']['rows'][0]['client'].email;
            }

            if (res['clientAddress']) {
              if (res['clientAddress'].length > 0) {
                this.HAddress = res['clientAddress'];
                this.mNumberame = res['clientAddress'][0].deleivery_mobile_number;
                this.orderids = res['clientAddress'][0].clientId;
              }
            }
            this.getClientProduct();
          }
        })
      }
    });
  }
  // Particular fetch end

  // Particular Address Id Api start
  getClientProduct() {
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
        var data = 'id=' + this.id;
        this.apiserveice.orderSummary(data, this.httpOptions).subscribe(res => {
          this.partucularOrder = res['data'][0]['order_products'];
          //console.log(this.partucularOrder);
          this.clientAddress = res['data'][0]['client_address'];
        })
      }
    });
  }
  // Particular Address Id Api end


  // Update client start
  OrderUpdate() {
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
    var orderStat = $('#orderStat').val();
    var data = {
      "id": this.id,
      "orderStatus": orderStat,
      "clientId": + this.clientId ? this.clientId : null,
      "guestId": + this.guestId ? this.guestId : null
    };
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiserveice.Updateorders(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
  // Update client end

  // Update guest start
  OrderparticularGuest(feildType) {
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
      "id": this.guestId, "postCode": this.codePost
    };
    if (feildType == 'mobile') {
      data["phoneNumber"] = this.mobNumber;
    }
    else if (feildType == 'house') {
      data["houseNumber"] = this.houseNO;
    }
    else if (feildType == 'streetadd') {
      data["streetAddress"] = this.sAddrrs;
    }
    else if (feildType == 'area') {
      data["area"] = this.AREa;
    }
    else if (feildType == 'city') {
      data["city"] = this.CiTy;
    }
    else if (feildType == 'state') {
      data["state"] = this.sTate;
    }
    else if (feildType == 'country') {
      data["country"] = this.countriess;
    }

    this.apiserveice.UpdateGuestAddress(data, this.httpOptions).subscribe(res => {
      if (res['message'] == 'Updated successfully') {
        this.toast.success(res['message']);
      }
    });
  }

  readOnlyFun(msg) {
    this.toast.error(msg);
  }
  // Update guest end

  // Add Address Start
  AddaddressStreet() {
    var data = { "clientId": this.clientId, "house_number": this.houseNO, "street_address": this.sAddrrs, "area": this.AREa, "city": this.CiTy, "state": this.sTate, "country": this.countriessDDD, "post_code": this.codePostDDD };
    //console.log(data);
    this.apiserveice.AddStreetAddressCode(data).subscribe(res => {
      //console.log(res);
      this.toast.success('Added Successfully');
      this.ParticularOrdder();
    })
  }
  // Add Address End


  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.partucularOrder = this.apiserveice.sortDataByCol(this.partucularOrder, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.partucularOrder = this.apiserveice.sortDataByCol(this.partucularOrder, colName, 'asc', type);
    }
  }
  // SORTING API END
  // EXCEL START
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.ordersExcel, 'Guest');
  }
  // EXCEL END


  nextItem(id) {
    try {
      var i = 0;
      this.nextprev.forEach((element, index) => {
        if (element.id == id) {
          i = index;
          i = i + 1;
          var nextItem = this.nextprev[i];
          this.router.navigate(['/orders/order-summary', nextItem.id, (nextItem.guestId) ? nextItem.guestId : 0, (nextItem.clientId) ? nextItem.clientId : 0]);
        }
      });
    } catch (error) {

    }
  }

  prevItem(id) {
    try {
      var i = 0;
      this.nextprev.forEach((element, index) => {
        if (element.id == id) {
          i = index;
          i = i - 1;
          var prevItem = this.nextprev[i];
          this.router.navigate(['/orders/order-summary', prevItem.id, (prevItem.guestId) ? prevItem.guestId : 0, (prevItem.clientId) ? prevItem.clientId : 0]);
        }
      });
    } catch (error) {

    }
  }

}
