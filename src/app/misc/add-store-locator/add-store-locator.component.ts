import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router } from '@angular/router';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-store-locator',
  templateUrl: './add-store-locator.component.html',
  styleUrls: ['./add-store-locator.component.scss']
})
export class AddStoreLocatorComponent implements OnInit {
  public Sname: any;
  public OwnerNO: any;
  public Addrss: any;
  public mailID: any;
  public PNumber: any;
  public Geos: any;
  public GMlink: any;
  public intsaID: any;
  public citys: any;
  public states: any;
  public addFrom: any;
  public ActiveToggle: boolean = false;
  constructor(private apiservice: CommonServiceService, public toast: ToastrService, private spinner: NgxSpinnerService, public FormBuilder: FormBuilder, public router: Router) {
    this.addFrom = this.FormBuilder.group({
      sname: new FormControl('', [Validators.required]),
      own: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      add: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.apiservice.gettoken();
  }

  // Add start
  postStoreLocator() {
    var data = {
      "active": this.ActiveToggle,
      "shopName": this.Sname, "ownerName": this.OwnerNO, "address": this.Addrss, "emailID": this.mailID,
      "phoneNumber": this.PNumber, "geo": this.Geos, "googleMapLink": this.GMlink, "instagramID": this.intsaID, "city": this.citys, "state": this.states
    }
    //console.log(data);
    this.spinner.show();
    this.apiservice.AddStore(data).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Inserted') {
        setTimeout(() => {
          this.router.navigate(['/misc/view-store-locator'])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }

    })
  }
  jkshf(id) {
    //console.log(id.target.value)
  }
  // Add end
}
