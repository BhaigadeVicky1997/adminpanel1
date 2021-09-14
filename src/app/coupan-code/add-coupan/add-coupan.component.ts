import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-add-coupan',
  templateUrl: './add-coupan.component.html',
  styleUrls: ['./add-coupan.component.scss']
})
export class AddCoupanComponent implements OnInit {
  public CoupanCode1: any;
  public CCessgae2: any;
  public Discount3: any;
  public ActiveToggle: any;
  public addFrom: any;
  public codeTYpe2: any;
  public ActiveVariantToggle:any;

  constructor(private spinner: NgxSpinnerService, private apiservice: CommonServiceService, public router: Router, public toast: ToastrService, public FormBuilder: FormBuilder) {
    this.addFrom = this.FormBuilder.group({
      codetypee: new FormControl('', [Validators.required]),
      coupan: new FormControl('', [Validators.required]),
      // mess: new FormControl('', [Validators.required]),
       disc: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    // $(document).ready(function () {
    //   $('form').on('submit', function (e) {
    //     e.preventDefault();
    //   });
    //   $("form").parsley()
    // });
    this.apiservice.gettoken();
  }
  AddCoupan() {
    var CoupanCode = this.CoupanCode1.toUpperCase();
    var CoupanCodeMessahr = this.CCessgae2;
    var Discount = this.Discount3;
    var codeTYpe2 = this.codeTYpe2
    var data = { "codeType": codeTYpe2,"discount":Discount, "coupan_code": CoupanCode};
    //console.log(data);
    this.spinner.show();
    this.apiservice.AddCoupanCode(data).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Coupan code added') {
        setTimeout(() => {
          this.router.navigate(['/coupan-code/view-coupan-code']);
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    })
  }


}
