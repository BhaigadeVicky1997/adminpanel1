import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-banner-summary',
  templateUrl: './banner-summary.component.html',
  styleUrls: ['./banner-summary.component.scss']
})
export class BannerSummaryComponent implements OnInit {
  public httpOptions: any;
  public id: any;
  public bannerName1: any;
  public bannerLocations: any;
  links: any;
  desktopimagePath: any;
  MobileimagePath: any;
  public MobileImage = [];
  public DesktopImage = [];
  constructor(public toast: ToastrService, private apiservice: CommonServiceService, private route: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit() {
    this.apiservice.getFiletoken();
    this.apiservice.title = 'Banner Summary';
    this.id = this.route.snapshot.paramMap.get('id');
    this.ParticularBanner();
  }

  // Particular banner start
  ParticularBanner() {
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
        var data = "id=" + this.id;
        //console.log(data);
        this.apiservice.particularBannerID(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.bannerName1 = res['data'][0].bannerName;
          this.bannerLocations = res['data'][0].bannerLocation;
          this.links = res['data'][0].link;
          if (res['data'][0].desktop_banner_photo !== '') {
            //this.desktopimagePath = 'https://sos.api-central.kenmarkserver.com/banner/' + res['data'][0].desktop_banner_photo;
            this.desktopimagePath =  this.apiservice.domainname + "banner/" + res['data'][0].desktop_banner_photo;
          } else {
            this.desktopimagePath = '';
          }
          if (res['data'][0].mobile_banner_photo !== '') {
            //this.MobileimagePath = 'https://sos.api-central.kenmarkserver.com/banner/' + res['data'][0].mobile_banner_photo;
            this.MobileimagePath =  this.apiservice.domainname + "banner/" + res['data'][0].mobile_banner_photo;
          } else {
            this.MobileimagePath = '';
          }

        })
      }
    });
  }
  // Particular banner end

  // banner update start without image uploding function
  bannerUpadate(feildType) {
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
    var data = { "id": this.id }
    if (feildType == 'banname') {
      data["bannerName"] = this.bannerName1;
    }
    else if (feildType == 'lockss') {
      data["bannerLocation"] = this.bannerLocations;
    }
    else if (feildType == 'linksss') {
      data["link"] = this.links;
    }
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateBannerrwwwForm(data, this.httpOptions).subscribe(res => {
      //console.log(res);
      this.ParticularBanner();
    });
  }
  // banner update end without image uploding function

  // banner update start with image uploding function
  selectMobileImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.MobileImage = event.target.files;
      //console.log(this.MobileImage);
    }
  }
  selectDesktopImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.DesktopImage = event.target.files;
      //console.log(this.DesktopImage);
    }
  }
  UpdateBannerImage() {
    const formData = new FormData();
    let immget;
    for (let img of this.MobileImage) {
      immget = img;
      formData.append('mobile_banner_photo', immget);
    }
    for (let img of this.DesktopImage) {
      immget = img;
      formData.append('desktop_banner_photo', immget);
    }
    formData.append("id", this.id)
    //console.log(formData);
    this.toast.success('Updated Successfully');
    this.apiservice.updateBanner(formData).subscribe(res => {
      //console.log(res);
      this.ParticularBanner();
    }, err => {
      console.log(err.error);
    })
  }
  // banner update end with image uploding function
}
