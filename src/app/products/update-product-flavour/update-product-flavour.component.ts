import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-update-product-flavour',
  templateUrl: './update-product-flavour.component.html',
  styleUrls: ['./update-product-flavour.component.scss']
})
export class UpdateProductFlavourComponent implements OnInit {
  public httpOptions: any;
  public id: any;
  FName: any;
  ActiveToggle: any;
  
  productVID: any;
  constructor(public route: ActivatedRoute, private apiservice: CommonServiceService, public toast: ToastrService, public storageService: StorageService, public router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productVID = this.route.snapshot.paramMap.get('productVID');
    this.ParticularFlavour();
  }

  ParticularFlavour() {
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
        var data2 = "&productVariantId=" + this.productVID;
        this.apiservice.getParticularProductFlavour(data + data2, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.FName = res['data'][0].flavour_name;
          this.ActiveToggle = res['data'][0].active_flavour;
          this.id = res['data'][0].id

        })
      }
    });
  }
  // Update start
  UpdateProductFlavour() {
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
    var data = { "id": this.id, "flavour_name": this.FName, "active_flavour": this.ActiveToggle }
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiservice.flavourUpdate(data).subscribe(res => {
      //console.log(res);
    });
  }
  // Update end

  readOnlyFun(msg) {
    this.toast.error(msg);
  }

}
