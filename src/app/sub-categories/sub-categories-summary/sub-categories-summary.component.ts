import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-sub-categories-summary',
  templateUrl: './sub-categories-summary.component.html',
  styleUrls: ['./sub-categories-summary.component.scss']
})
export class SubCategoriesSummaryComponent implements OnInit {
  public httpOptions: any;
  public id: any;
  public subname: any;
  public catID: any;
  public CategoryID: any;
  public ActiveToggle: any;

  constructor(private apiserveice: CommonServiceService, public toast: ToastrService, public router: Router, private storageService: StorageService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.apiserveice.title = 'Sub-Categories Summary';
    this.id = this.route.snapshot.paramMap.get('id');
    this.ParticularSubCategory();
    this.getCategories();
  }

  // particular sub category start
  ParticularSubCategory() {
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
        var data = "subCategoryId=" + this.id;
        this.apiserveice.SubcategorySumm(data, this.httpOptions).subscribe(res => {
          this.subname = res['data'][0].subCategoryName;
          this.catID = res['data'][0].categoryId;
          this.ActiveToggle = res['data'][0].active;
        })
      }
    });
  }
  // particular sub category end

  //  update start
  SubCategoryUpadate() {
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
    var data = { "id": this.id, "subCategoryName": this.subname, "categoryId": this.catID, "active": this.ActiveToggle }
    this.toast.success('Updated Successfully');
    this.apiserveice.UpdateSubCategory(data, this.httpOptions).subscribe(res => {
      //console.log(res);
    });
  }
  readOnlyFun(msg) {
    this.toast.error(msg);
  }
  //  update end
  // category fetch dropdown start
  getCategories() {
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
        var data = '';
        this.apiserveice.fetchCategory(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.CategoryID = res['data'];
        })
      }
    });
  }
  // category fetch dropdown end
}
