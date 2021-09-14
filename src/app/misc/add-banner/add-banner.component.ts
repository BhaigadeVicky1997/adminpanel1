import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {
  images;
  multiplemobileImages = [];
  multipledesktopImages = [];
  BannerName: any;
  BannerLocations: any;
  bannerlink: any;
  public addFrom: any;
  constructor(private apiservice: CommonServiceService, public FormBuilder: FormBuilder, private spinner: NgxSpinnerService, public router: Router, public toast: ToastrService,
    public route: ActivatedRoute) {
    this.addFrom = this.FormBuilder.group({
      BannerNames: new FormControl('', [Validators.required]),
      bannerLocation: new FormControl('', [Validators.required]),
      //bannerLinks: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.apiservice.getFiletoken();
  }

  // Add banner start with image uploading function
  selectMultipleMobileImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multiplemobileImages.push(event.target.files[0]);
      //console.log(this.multiplemobileImages);
    }
  }
  selectMultipledesktopImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multipledesktopImages.push(event.target.files[0]);
      //console.log(this.multipledesktopImages);
    }
  }
  AddproductBannerPic() {
    var formData = new FormData();
    if (this.multiplemobileImages.length > 0) {
      formData.append('mobile_banner_photo', this.multiplemobileImages[0]);
    }
    else {
      this.toast.error("Please Select Both File");
      return false;
    }
    if (this.multipledesktopImages.length > 0) {
      formData.append('desktop_banner_photo', this.multipledesktopImages[0]);
    }
    else {
      this.toast.error("Please Select Both File");
      return false;
    }
    this.spinner.show();
    //console.log(formData);
    formData.append("bannerName", this.BannerName);
    formData.append("bannerLocation", this.BannerLocations)
    formData.append("link", this.bannerlink)
    this.apiservice.addBanner(formData).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Banner inserted') {
        setTimeout(() => {
          this.router.navigate(['/misc/view-banner'])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    }, err => {
      console.log(err.error);
    })
  }
  // Add banner end with image uploading function
}
