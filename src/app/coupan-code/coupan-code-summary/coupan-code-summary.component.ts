import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2/dist/sweetalert2.js'
declare var $: any;



@Component({
  selector: 'app-coupan-code-summary',
  templateUrl: './coupan-code-summary.component.html',
  styleUrls: ['./coupan-code-summary.component.scss']
})
export class CoupanCodeSummaryComponent implements OnInit {
  public httpOptions: any;
  public id: any;
  public coupanCodes: any;
  public Discounts: any;
  public CCmessage: any;
  public product: any;
  public filterInput: any;
  public p: any;
  public pageno: any;
  public codetypess: any;
  public ActiveToggle: any;
  public type:any;
  public productVariantIDCoupan: any = [];
  public productCouponActive:any;
  public couponID:any;
  // public activeFlat: boolean = false;
  // public activePercentage: boolean = false;
  constructor(private apiservice: CommonServiceService, private spinner: NgxSpinnerService, public router: Router, private apiserveice: CommonServiceService, private storageService: StorageService, private route: ActivatedRoute, public toast: ToastrService) { }

  ngOnInit() {

    $(document).ready(function () {
      $("#ckbCheckAll").click(function () {
        $(".checkBoxClass").prop('checked', $(this).prop('checked'));
      });

      $(".checkBoxClass").change(function () {
        if (!$(this).prop("checked")) {
          $("#ckbCheckAll").prop("checked", false);
        }
      });
    });


    this.apiservice.title = 'Coupon-Code Summary';
    this.couponID = this.route.snapshot.paramMap.get('id');
    this.type = this.route.snapshot.paramMap.get('type');
    //console.log(this.couponID, this.type)
    
    this.getProduct();
    // Hide n show end
    this.ParticularCoupanCode();
   
    this.apiservice.gettoken();
  }




  ParticularCoupanCode() {
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
        var data = "id=" + this.couponID;
        this.apiservice.particularCoupanCode(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.coupanCodes = res['data'][0].coupan_code;
          this.Discounts = res['data'][0].discount;;
          this.CCmessage = res['data'][0].coupan_code_message;
          this.codetypess = res['data'][0].codeType;
          this.ActiveToggle = res['data'][0].Active;
        })
      }
    });
  }

  particularCoupanCodeUpadate(feildType) {
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
    var data = { "id": this.couponID, "Active": this.ActiveToggle }
    if (feildType == 'code') {
      data["coupan_code"] = this.coupanCodes;
    }
    else if (feildType == 'mess') {
      data["coupan_code_message"] = this.CCmessage;
    }
    else if (feildType == 'dis') {
      data["discount"] = this.Discounts;
    }
    else if (feildType == 'type') {
      data["codeType"] = this.codetypess;
    }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateCoupan(data, this.httpOptions).subscribe(res => {
    });
  }

  setDelayByRecords(totalRecords){
    return (totalRecords/50)*1000;
  }
  // Fetch Product start in coupon code
  getProduct() {
    // this.spinner.show();
    // this.product=[];
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
          //console.log(data);
          this.product = res['data'];
          this.product.forEach(element => {
            element['discount'] = Math.floor((element.variantPrice - element.variantSalePrice) / element.variantPrice * 100);
          });

          // setTimeout(() => {
          //   this.spinner.hide();
          // }, this.setDelayByRecords(this.product.length));
          // console.log(this.product.length);
        })
      }
      // else{
      //   this.spinner.hide();
      // }
    });
  }
  // Fetch Product end in coupon code

  // checkbox click on get value by id start
  checkValue(id) {
    if (id.target.checked == true) {
      this.productVariantIDCoupan.push({ id: id.target.value });
      //console.log({ id: id.target.value })
    }
    else {
      this.productVariantIDCoupan = this.productVariantIDCoupan.filter((element) => (id.target.value !== element.id))
    }
  }
  // checkbox click on get value by id end

  // select all on click to get value by id all select start
  selectAll(event) {
    if (event.target.checked == true) {
      this.product.forEach(ele => {
        this.productVariantIDCoupan.push({ id: ele.id });
      });
      //console.log(this.productVariantIDCoupan);
    } else {
      this.productVariantIDCoupan = [];
    }
  }
  // select all on click to get value by id all select end

  // Apply coupon code start
  addCoupanCodeProductVariant() {
    var data = { "coupanCodeId": this.couponID, "productVariantId": this.productVariantIDCoupan };
    //console.log(data);
    this.spinner.show();
    this.apiservice.coupanCodeOnclick(data).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Product coupan code inserted') {
        setTimeout(() => {
          this.spinner.hide();
          this.toast.success('Coupon Code Applied Successfully');
          this.getProduct();
          this.productVariantIDCoupan = [];
        }, 10000);
      }
      else { this.toast.error('Coupon Code Applied Successfully'); }
     
    })
  }
  // Apply coupon code end

  // Delete Function start
  deleteCoupon() {
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
        var data = { "coupanCodeId": this.couponID, "productVariantId": this.productVariantIDCoupan };
        //console.log(data);
        this.spinner.show();
        this.apiserveice.DeleteProductCoupon(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          if (res['message'] == 'productVariant deleted') {
            setTimeout(() => {
              this.spinner.show();
              this.getProduct();
              this.spinner.hide()
              this.toast.success('Coupon Code Removed Successfully');
              this.productVariantIDCoupan = [];

            }, 600);
          }
          // this.getProduct();
        }, err => {
          console.log(err.error);
        })
      }
    });
  }
  // Delete Function end
}
