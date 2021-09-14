import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-add-product-variant-picture',
  templateUrl: './add-product-variant-picture.component.html',
  styleUrls: ['./add-product-variant-picture.component.scss']
})
export class AddProductVariantPictureComponent implements OnInit {
  images;
  multipleImages = [];
  multipleThumbnail = [];
  public id: any;
  public picID: any;
  constructor(private apiservice: CommonServiceService, private spinner: NgxSpinnerService, public router: Router, public toast: ToastrService,
    public route: ActivatedRoute) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    //console.log(this.id);
    this.apiservice.getFiletoken();
  }

  // IMAGE UPLOADING FUNCTION START
  selectMultipleImage(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multipleImages.push(event.target.files[0]);
      //console.log(this.multipleImages);
    }
  }
  selectMultipleThumbnail(event) {
    //console.log(event);
    if (event.target.files.length > 0) {
      this.multipleThumbnail.push(event.target.files[0]);
      //console.log(this.multipleThumbnail);
    }
  }
  // IMAGE UPLOADING FUNCTION END
  // ADD START
  AddproductvariantPic() {
    var formData = new FormData();
    if (this.multipleImages.length > 0) {
      formData.append('picture', this.multipleImages[0]);
    }
    else {
      this.toast.error("Please Select Both File");
      return false;
    }
    if (this.multipleThumbnail.length > 0) {
      formData.append('thumbnail', this.multipleThumbnail[0]);
    }
    else {
      this.toast.error("Please Select Both File");
      return false;
    }
    this.spinner.show();
    formData.append("productVariantId", this.id);
    formData.append("photoOrder", this.picID);
    //console.log(formData);
    this.apiservice.addProductVariantPicture(formData).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Inserted') {
        setTimeout(() => {
          this.router.navigate(['/products/product-variant-summary', this.id])
          this.spinner.hide();
          this.toast.success('Added Successfully');
        }, 600);
      }
    }, err => {
      console.log(err.error);
    })
  }
  // ADD END
  getPhotoOrder(event) {
    this.picID = event.target.value;
  }


}


