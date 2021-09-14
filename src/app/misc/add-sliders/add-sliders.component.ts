import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-sliders',
  templateUrl: './add-sliders.component.html',
  styleUrls: ['./add-sliders.component.scss']
})
export class AddSlidersComponent implements OnInit {
  public addFrom: any;
  constructor(public FormBuilder: FormBuilder, private spinner: NgxSpinnerService, private apiservice: CommonServiceService, public router: Router, public toast: ToastrService) {
    this.addFrom = this.FormBuilder.group({
      SliderName: new FormControl('', [Validators.required]),
    })
  }
  SliderPathImages = [];
  sliderDesktopImages = [];
  public slideName: any;
  public Sposition: any;
  public ActiveVariantToggle: any;
  public slideLink: any;


  ngOnInit() {
    this.apiservice.title = 'Slidesr';
    this.apiservice.getFiletoken();
  }

  // Add slider start with image function
  selectSliderPath(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.SliderPathImages.push(event.target.files[0]);
      //console.log(this.SliderPathImages);
    }
  }
  selectSliderDesktop(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.sliderDesktopImages.push(event.target.files[0]);
      //console.log(this.sliderDesktopImages);
    }
  }
  AddSlidder() {
    var formData = new FormData();
    if (this.SliderPathImages.length > 0) {
      formData.append('slider_path', this.SliderPathImages[0]);
    }
    else {
      this.toast.error("Please Select Both File");
      return false;
    }
    if (this.sliderDesktopImages.length > 0) {
      formData.append('slider_desktop', this.sliderDesktopImages[0]);
    }
    else {
      this.toast.error("Please Select Both File");
      return false;
    }
    this.spinner.show();
    //console.log(formData);
    formData.append("slider_name", this.slideName);
    formData.append("slider_position", this.Sposition)
    formData.append("active", this.ActiveVariantToggle)
    formData.append("link", this.slideLink)
    this.apiservice.addSlider(formData).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Slider inserted') {
        setTimeout(() => {
          this.router.navigate(['/misc/view-sliders'])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    }, err => {
      console.log(err.error);
    })
  }
  // Add slider end with image function
}
