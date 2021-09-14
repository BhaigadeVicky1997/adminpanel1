import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-store-locator-summ',
  templateUrl: './store-locator-summ.component.html',
  styleUrls: ['./store-locator-summ.component.scss']
})
export class StoreLocatorSummComponent implements OnInit {
  public httpOptions: any;
  public id: any;
  public storeID: any;
  public Sname: any;
  public PNumber: any;
  public OwnerN: any;
  public Addrs: any;
  public GMapLink: any;
  public geo: any;
  public IDEmail: any;
  public IdInstagram: any;
  public cits: any;
  public statess: any;
  public activesToggle: any;
  constructor(private apiservice: CommonServiceService, public toast: ToastrService, public route: ActivatedRoute, private storageService: StorageService) { }

  ngOnInit() {
    this.apiservice.title = 'Store Locator Summary';
    this.id = this.route.snapshot.paramMap.get('id');
    this.getParticularStore();
  }

  // fetch start
  getParticularStore() {
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
        this.apiservice.particularStore(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.storeID = res['data'][0].id;
          this.Sname = res['data'][0].shopName;
          this.PNumber = res['data'][0].phoneNumber;
          this.OwnerN = res['data'][0].ownerName;
          this.Addrs = res['data'][0].address;
          this.GMapLink = res['data'][0].googleMapLink;
          this.geo = res['data'][0].geo;
          this.IDEmail = res['data'][0].emailID;
          this.IdInstagram = res['data'][0].instagramID;
          this.cits = res['data'][0].city;
          this.statess = res['data'][0].state;
          this.activesToggle = res['data'][0].active;
        })
      }
    });
  }
  // fetch end

  // Update start
  StoreUpdate(feildType) {
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
      "id": this.id,

    }
    if (feildType == 'nameSSS') {
      data["shopName"] = this.Sname;
    }
    else if (feildType == 'phone') {
      data["phoneNumber"] = this.PNumber;
    }
    else if (feildType == 'owner') {
      data["ownerName"] = this.OwnerN;
    }
    else if (feildType == 'addresss') {
      data["address"] = this.Addrs;
    }
    else if (feildType == 'geo') {
      data["geo"] = this.geo;
    }
    else if (feildType == 'links') {
      data["googleMapLink"] = this.GMapLink;
    }
    else if (feildType == 'Emid') {
      data["emailID"] = this.IDEmail;
    }
    else if (feildType == 'insta') {
      data["instagramID"] = this.IdInstagram;
    }
    else if (feildType == 'city') {
      data["city"] = this.cits;
    }
    else if (feildType == 'state') {
      data["state"] = this.statess;
    }
    else if (feildType == 'active') {
      data["active"] = this.activesToggle;
    }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiservice.UpdateStore(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
  readOnlyFun(msg) {
    this.toast.error(msg);
  }
  // update end
}
