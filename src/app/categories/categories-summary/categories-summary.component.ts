import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { StorageService } from 'src/app/service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonFunctions } from 'src/app/common.function';
declare var $: any;
@Component({
  selector: 'app-categories-summary',
  templateUrl: './categories-summary.component.html',
  styleUrls: ['./categories-summary.component.scss']
})
export class CategoriesSummaryComponent implements OnInit {
  public httpOptions: any;
  public ActiveToggle: any;
  public catName: any;
  public id: any;
  public multipleImages = [];
  public imagePath: any;
  navOrder: any;
  constructor(private apiserveice: CommonServiceService, public toast: ToastrService, public router: Router, private storageService: StorageService, public route: ActivatedRoute) { }

  ngOnInit() {
    // $(document).ready(function () {
    //   $('form').on('submit', function (e) {
    //     e.preventDefault();
    //   });
    //   $("form").parsley()
    // });
    this.apiserveice.title = 'Categories Summary';
    this.apiserveice.getFiletoken();
    this.id = this.route.snapshot.paramMap.get('id');
    this.ParticularCategory();

  }
  // Particular ID category Start
  ParticularCategory() {
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
        var data = "categoryId=" + this.id;
        this.apiserveice.categorySumm(data, this.httpOptions).subscribe(res => {
          this.catName = res['data'][0].categoryName;
          this.ActiveToggle = res['data'][0].active;
          this.navOrder = res['data'][0].nav_order;
          //console.log(this.navOrder)
          if (res['data'][0].brand_image !== '') {
            //this.imagePath = 'https://sos.api-central.kenmarkserver.com/category/' + res['data'][0].category_image;
            this.imagePath =  this.apiserveice.domainname + "category/" + res['data'][0].category_image;
          } else {
            this.imagePath = '';
          }
        })
      }
    });
  }
  // Particular ID category End

  // Category update start
  CategoryUpadate(fieldType) {
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
    let navOrder = $('#navOrder').val();
    var data = { "id": this.id, "categoryName": this.catName, "active": this.ActiveToggle }
    if (fieldType == 'nav') {
      data["nav_order"] = navOrder;
    }
    this.toast.success('Updated Successfully');
    this.apiserveice.UpdateCategorywwwForm(data, this.httpOptions).subscribe(res => {
      this.ParticularCategory();
    });
  }
  // Category update start

  // Category update image start
  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }
  UpdateCategoryImage() {
    const formData = new FormData();
    let immget;
    for (let img of this.multipleImages) {
      immget = img;
      formData.append('category_image', immget);
    }
    formData.append("id", this.id)
    this.toast.success('Updated Successfully');
    this.apiserveice.updateimageCategory(formData).subscribe(res => {
      this.ParticularCategory();
    }, err => {

    })
  }
  // Category update image start
}
