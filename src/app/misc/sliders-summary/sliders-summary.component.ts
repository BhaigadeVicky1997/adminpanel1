import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sliders-summary',
  templateUrl: './sliders-summary.component.html',
  styleUrls: ['./sliders-summary.component.scss']
})
export class SlidersSummaryComponent implements OnInit {
  public id: any;
  public httpOptions: any;
  public SliderNames: any;
  public sliderPosition: any;
  public links: any;
  public SliderimagePath: any;
  public desktopSliderimagePath: any;
  public ActiveToggle: any;

  public sliderDesktopImage = [];
  public sliderPath = [];
  constructor(private route: ActivatedRoute, public toast: ToastrService, private storageService: StorageService, private apiservice: CommonServiceService) { }

  ngOnInit() {
    this.apiservice.title = 'Slider Summary';
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiservice.getFiletoken();
    this.ParticularSlider();
  }
  // Particular Slider start
  ParticularSlider() {
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
        var data = "id=" + this.id;
        //console.log(data);
        this.apiservice.getsliderparticularID(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.SliderNames = res['data'][0].slider_name;
          this.sliderPosition = res['data'][0].slider_position;
          this.links = res['data'][0].link;
          this.ActiveToggle = res['data'][0].active;
          if (res['data'][0].desktop_banner_photo !== '') {
            //this.SliderimagePath = 'https://sos.api-central.kenmarkserver.com/slider/' + res['data'][0].slider_path;
            this.SliderimagePath =  this.apiservice.domainname + "slider/" + res['data'][0].slider_path;
          } else {
            this.SliderimagePath = '';
          }
          if (res['data'][0].mobile_banner_photo !== '') {
            //this.desktopSliderimagePath = 'https://sos.api-central.kenmarkserver.com/slider/' + res['data'][0].slider_desktop;
            this.desktopSliderimagePath =  this.apiservice.domainname + "slider/" + res['data'][0].slider_desktop;
          } else {
            this.desktopSliderimagePath = '';
          }
        })
      }
    });
  }
  // Particular Slider end

  // Slider update start without image function
  SliderUpadate(feildType) {
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
    var data = { "id": this.id, "active": this.ActiveToggle }
    if (feildType == 'Snname') {
      data["slider_name"] = this.SliderNames;
    }
    else if (feildType == 'spos') {
      data["slider_position"] = this.sliderPosition;
    }
    else if (feildType == 'linksss') {
      data["link"] = this.links;
    }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateSliderwwwForm(data, this.httpOptions).subscribe(res => {
      //console.log(res);
      this.ParticularSlider();
      //this.getproductVariantSummary();
    });
  }
  // Slider update end without image function

  // Slider update start with image function
  selectsliderdesktop(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.sliderDesktopImage = event.target.files;
      //console.log(this.sliderDesktopImage);
    }
  }
  sliderimagePath(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.sliderPath = event.target.files;
      //console.log(this.sliderPath);
    }
  }
  UpdateSliderImage() {
    const formData = new FormData();
    let immget;
    for (let img of this.sliderDesktopImage) {
      immget = img;
      formData.append('slider_desktop', immget);
    }
    for (let img of this.sliderPath) {
      immget = img;
      formData.append('slider_path', immget);
    }
    formData.append("id", this.id)
    //console.log(formData);
    this.toast.success('Updated Successfully');
    this.apiservice.updateSliderPic(formData).subscribe(res => {
      //console.log(res);
      this.ParticularSlider();
    }, err => {
      console.log(err.error);
    })
  }
  // Slider update end with image function


}
