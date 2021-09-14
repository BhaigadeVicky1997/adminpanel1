import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
declare var $: any;
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  public contactus: any;
  public httpOptions: any;
  public sort: boolean = false;
  public filterInput: any;
  public p: any;

  constructor(private apiservice: CommonServiceService, private storageService: StorageService) { }

  ngOnInit() {
    this.apiservice.title = 'Contact';
    this.getContactUS();
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });
  }

  getContactUS() {
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
        var data = ''
        this.apiservice.fetchContact(data, this.httpOptions).subscribe(res => {
          this.contactus = res['data'];
        })
      }
    });
  }
  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.contactus = this.apiservice.sortDataByCol(this.contactus, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.contactus = this.apiservice.sortDataByCol(this.contactus, colName, 'asc', type);
    }
  }
  // SORTING API END

}
