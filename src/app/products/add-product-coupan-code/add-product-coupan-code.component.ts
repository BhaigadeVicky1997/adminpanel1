import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-product-coupan-code',
  templateUrl: './add-product-coupan-code.component.html',
  styleUrls: ['./add-product-coupan-code.component.scss']
})
export class AddProductCoupanCodeComponent implements OnInit {
  public id: any;
  public Code: any;
  public ccMessgae: any;
  public discount: any;
  public productVID: any;
  constructor(private apiservice: CommonServiceService, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.apiservice.gettoken();
  }

  // ADD COUPAN CODE START
  AddCoupan() {
    var CoupanCode = this.Code
    var CoupancodeMessgae = this.ccMessgae
    var DiscountCoupan = this.discount
    var data = { "coupan_code": CoupanCode, "coupan_code_message": CoupancodeMessgae, "discount": DiscountCoupan, "productVariantId": this.id }
    //console.log(data);
    this.apiservice.AddCoupanCode(data).subscribe(res => {
      //console.log(res);
    })
    // this.toast.success('Added Successfully');
    this.router.navigate(['/products/product-variant-summary', { "id": this.id }])
  }
  // ADD COUPAN CODE END
}
