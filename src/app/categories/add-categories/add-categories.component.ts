import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any;
@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {
  public multipleImages = [];
  public CatName: any;
  public addFrom: any;
  public ActiveVariantToggle: any;
  constructor(public FormBuilder: FormBuilder, private apiservice: CommonServiceService, private spinner: NgxSpinnerService, public router: Router, public toast: ToastrService) {
    this.addFrom = this.FormBuilder.group({
      CategoryNames: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.apiservice.getFiletoken();
  }

  // Add category with image start
  selectMultipleImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multipleImages.push(event.target.files[0]);
      //console.log(this.multipleImages);
    }
  }
  InsertCategory() {
    var formData = new FormData();
    if (this.multipleImages.length > 0) {
      formData.append('category_image', this.multipleImages[0]);
      this.spinner.show();
    } else {
      this.toast.error("Please Select File");
      return false;
    }
    formData.append("categoryName", this.CatName);
    //console.log(this.CatName);
    formData.append("active", this.ActiveVariantToggle)
    //console.log(this.ActiveVariantToggle)
    //console.log(formData);
    this.apiservice.AddCategory(formData).subscribe(res => {
      //console.log(res);
      if (res['mesage'] == 'category Created') {
        setTimeout(() => {
          this.router.navigate(['/categories/view-categories'])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    }, err => {
      console.log(err.error);
    })
  }
  // Add category with image end
}
