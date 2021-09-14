import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent implements OnInit {
  public multipleImages = [];
  public addFrom: any;
  public bName1: any;
  public popular2: any;
  public trendingbrand3: any;
  public ActiveVariantToggle: any;
  constructor(public FormBuilder: FormBuilder, private spinner: NgxSpinnerService, private apiservice: CommonServiceService, public router: Router, public toast: ToastrService) {
    this.addFrom = this.FormBuilder.group({
      brandName: new FormControl('', [Validators.required]),
      popularBrand: new FormControl('', [Validators.required]),
      trendingBrand: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.apiservice.getFiletoken();
  }

  // file uploading button click function start
  selectMultipleImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multipleImages.push(event.target.files[0]);
      //console.log(this.multipleImages);
      this.addFrom.controls['imageBrand']
    }
  }
  // file uploading button click function end

  // Add brnd Start
  productbrandAdd() {
    var formData = new FormData();
    if (this.multipleImages.length > 0) {
      formData.append('brand_image', this.multipleImages[0]);
      this.spinner.show();
    } else {
      this.toast.error("Please Select File");
      return false;
    }
    formData.append("brand_name", this.bName1);
    formData.append("popular_brand", this.popular2)
    formData.append("trending_brand", this.trendingbrand3)
    formData.append("active", this.ActiveVariantToggle)
    this.apiservice.addProductBrand(formData).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Brand Inserted') {
        setTimeout(() => {
          this.router.navigate(['/brands/view-brand'])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    }, err => {
      console.log(err.error);
    })
  }
  // Add brand End
}
