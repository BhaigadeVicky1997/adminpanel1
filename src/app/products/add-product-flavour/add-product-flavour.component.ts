import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-add-product-flavour',
  templateUrl: './add-product-flavour.component.html',
  styleUrls: ['./add-product-flavour.component.scss']
})
export class AddProductFlavourComponent implements OnInit {
  public id: any;
  public ActiveToggle: any;
  public addFrom: any;
  constructor(public FormBuilder: FormBuilder, private spinner: NgxSpinnerService, public route: ActivatedRoute, public toast: ToastrService, public router: Router, private apiservice: CommonServiceService) {
    this.addFrom = this.FormBuilder.group({
      flavoursName: new FormControl('', [Validators.required]),
    })
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.apiservice.gettoken();
  }
  // ADD PRODUCT FLAVOUR START
  AddproductFlavour() {
    var fname1 = $('#fname1').val();
    var activevariantsstogggle = this.ActiveToggle;
    this.spinner.show();
    var data = { "flavour_name": fname1, "active_flavour": activevariantsstogggle, "productVariantId": this.id };
    //console.log(data);
    this.apiservice.addProductFlavour(data).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Flavour added') {
        setTimeout(() => {
          this.router.navigate(['/products/product-variant-summary', this.id])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    })
  }
  // ADD PRODUCT FLAVOUR END
}

