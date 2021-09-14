import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-add-sub-categories',
  templateUrl: './add-sub-categories.component.html',
  styleUrls: ['./add-sub-categories.component.scss']
})
export class AddSubCategoriesComponent implements OnInit {
  public Subname1: any;
  public cat1: any;
  public id: any;
  public httpOptions: any;
  public CategoryID: any;
  public addFrom: any;
  public ActiveToggle: any;
  constructor(public FormBuilder: FormBuilder, private spinner: NgxSpinnerService, private apiservice: CommonServiceService, public toast: ToastrService, public route: ActivatedRoute, public router: Router, private storageService: StorageService) {
    this.addFrom = this.FormBuilder.group({
      SubCategoryNames: new FormControl('', [Validators.required]),
      CatDrop: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiservice.gettoken();
    this.getCategories();
  }

  // add sub-category start
  insertSubCategories() {
    var subName = this.Subname1
    var category = this.cat1;
    var data = { "subCategoryName": subName, "categoryId": category ,"active":this.ActiveToggle};
    //console.log(data);
    this.spinner.show();
    this.apiservice.SubcategoryAdd(data).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Sub category added') {
        setTimeout(() => {
          this.router.navigate(['/sub-categories/view-sub-categories', { "id": this.id }])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    })

  }
  // add sub-category end

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
        this.apiservice.fetchCategory(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.CategoryID = res['data'];
        })
      }
    });
  }
  // category fetch dropdown end

}
