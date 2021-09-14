import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { CommonServiceService } from 'src/app/service/common-service.service';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { ToastrService } from 'ngx-toastr';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-products-variant-summary',
  templateUrl: './products-variant-summary.component.html',
  styleUrls: ['./products-variant-summary.component.scss']
})
export class ProductsVariantSummaryComponent implements OnInit {
  public productvalueget: any;
  public prodname: any;
  public isDesc: boolean;
  public id: any;
  public httpOptions: any;
  public productSummary: any;
  public Brand: any;
  public catDrop: any;
  public subCatDrop: any;
  public productPictures: any;
  public ActiveToggle: any;
  public Combo: any;
  public crazyDeals: any;
  public Flavour: any;
  public sort: boolean = false;
  public Ccoupanid: any;
  public coupanCodeID: any;
  public Ccoupanmessgae: any;
  public coupanDiscount: any;
  public pVID: any;
  public prochc: any;
  public coupancodes: any;
  public coupanID: any;
  picID: any;
  public Discountproduct: any;
  ppoluar: any;
  trends: any;
  newlaunched: any;
  public shortdescription = [];
  
  
 

  // public productvID: any;

  constructor(public route: ActivatedRoute, private spinner: NgxSpinnerService, private apiserveice: CommonServiceService, public toast: ToastrService, public storageService: StorageService, public router: Router) { }

  ngOnInit() {
    // $(document).ready(function () {
    //   $('form').on('submit', function (e) {
    //     e.preventDefault();
    //   });
    //   $("form").parsley()
    // });
    this.apiserveice.title = 'Product Summary';
    this.apiserveice.gettoken();
    this.id = this.route.snapshot.paramMap.get('id');
    this.getproductVariantSummary()
    this.brandDrop();
    this.categoryDrop();
    this.PFlavour();
    this.PartcicularCoupanFetch();
    
    // this.WholeCoupanCodeFetching();

  }

  // particular fetch product start
  getproductVariantSummary() {
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
        var data = "/" + this.id;
        //console.log(data);
        this.apiserveice.getproductVariantSumm(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.productSummary = res['data'];
          //console.log(this.productSummary);
          this.ActiveToggle = res['data']['activeVariant'];
          this.Combo = res['data']['comboOffer'];
          this.crazyDeals = res['data']['crazyDeals'];
          this.ppoluar = res['data']['popularProducts'];
          this.trends = res['data']['trendingProducts'];
          this.productPictures = res['data']['productVariantPictures'];
        //   this.newlaunched =  res['data']['newlyLunched'];
         })
      }
    });
  }
  // particular fetch product end

  // Dropdown Api start
  brandDrop() {
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
        var data = ''
        this.apiserveice.getBrandDropdown(data, this.httpOptions).subscribe(res => {
          this.Brand = res['data'];
        })
      }
    });
  }

  categoryDrop() {
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
        var data = ''
        this.apiserveice.getCategoryDropdown(data, this.httpOptions).subscribe(res => {
          this.catDrop = res['data'];
        })
      }
    });
  }

  getfilter(id) {
    //console.log(id.target.value);
    var data = "categoryId=" + id.target.value;
    this.apiserveice.getSubCategoryDropdown(data, this.httpOptions).subscribe(res => {
      this.subCatDrop = res['data'];
      //console.log(this.subCatDrop);
    })
  }

  PFlavour() {
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
        var data = "productVariantId=" + this.id;
        //console.log(data);
        this.apiserveice.getProductFlavour(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.Flavour = res['data'];
          //console.log(this.Flavour)
        })
      }
    });
  }
  // Dropdown Api end

  // Update Api start
  updateActiveFlavour(row) {
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
        var data = {
          "active_flavour": row.active_flavour,
          "id": row.id,
        }
        //console.log(data);
        this.toast.success('Updated Successfully');
        this.apiserveice.flavourUpdate(data).subscribe(res => {
          //console.log(res);
        });
      }
    });
  }

  updateImageOrder(id) {
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
        var photos = $('#photos').val();
        var data = { id: id, "photoOrder": this.picID }
        //console.log(data);
        this.toast.success('Updated Successfully');
        this.apiserveice.UpdateProductVariantPicture(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          //this.getproductVariantSummary();
        });
      }
    });
  }
  getPhotoOrder(event) {
    this.picID = event.target.value;
  }


  updatefunction(fieldType) {
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
    var Sku1 = $('#Sku1').val();
    var namme2 = $('#namme2').val();
    var mrp3 = $('#mrp3').val();
    var salePrice4 = $('#salePrice4').val();
    var brand5 = $('#brand5').val();
    var category6 = $('#category6').val();
    var subcategory7 = $('#subcategory7').val();
    var popular8 = $('#popular8').val();
    var trending9 = $('#trending9').val();
    var disc = $('#disc').val();
    var pDescription2 = this.productSummary.productDescription;
    var shortdescription = this.productSummary.shortDescription;
    var activevariantsstogggle = this.ActiveToggle;
    var Combo = $('#Combo').val();
    var crazyDeals = $('#crazyDeals').val();
    var newLy = $('#newlaunch').val();
    var weight = $('#weight').val();
    var servings = $('#servings').val();
    var vegnonveg = $('#vegnonveg').val();
    var data = { "id": this.id };
    if (fieldType == 'name') {
      data["variantName"] = namme2;
    }
    else if (fieldType == 'mrp') {
      data["variantPrice"] = mrp3;
    }
    else if (fieldType == 'salePrice') {
      data["variantSalePrice"] = salePrice4;
    }
    else if (fieldType == 'discount') {
      data["discount"] = disc;
    }
    else if (fieldType == 'brand') {
      data["brandId"] = brand5;
    }
    else if (fieldType == 'category') {
      data["categoryId"] = category6;
    }
    else if (fieldType == 'subcategory') {
      data["subCategoryId"] = subcategory7;
    }
    else if (fieldType == 'popular') {
      data["popularProducts"] = popular8;
    }
    else if (fieldType == 'trend') {
      data["trendingProducts"] = trending9;
    }
    else if (fieldType == 'description') {
      data["productDescription"] = pDescription2;
    }
    else if (fieldType == 'Sdescription') {
      data["shortDescription"] = shortdescription;
    }
    else if (fieldType == 'activevariant') {
      data["activeVariant"] = activevariantsstogggle;
    }
    else if (fieldType == 'seller') {
      data["comboOffer"] = Combo;
    }
    else if (fieldType == 'deal') {
      data["crazyDeals"] = crazyDeals;
    } else if (fieldType == 'newLaunch1') {
      data["newlyLaunched"] = newLy;
    }
    else if (fieldType == 'weight') {
      data["weight"] = weight;
    }
    else if (fieldType == 'nservings') {
      data["numberOfServings"] = servings;
    }

    else if (fieldType == 'vegnonveg1') {
      data["veg"] = vegnonveg;
    }
    
    //console.log(data);
    this.toast.success('Updated Successfully');
    this.apiserveice.updateProduct(data, this.httpOptions).subscribe(res => {
      this.getproductVariantSummary();
    });
  }

  getCalculate() {
    var mrp3 = $('#mrp3').val();
    var salePrice4 = $('#salePrice4').val();
    this.Discountproduct = ((Number(mrp3) - Number(salePrice4)) / Number(mrp3) * 100);
  }
  // Update Api start

  sweetalert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#D31D28',
      cancelButtonColor: '#D31D28',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  // Sorting Pictures Api start
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.productPictures = this.apiserveice.sortDataByCol(this.productPictures, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.productPictures = this.apiserveice.sortDataByCol(this.productPictures, colName, 'asc', type);
    }
  }
  // Sorting Pictures Api end

  // Sorting flavour Api start
  filterTableColumns(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.Flavour = this.apiserveice.sortDataByCol(this.Flavour, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.Flavour = this.apiserveice.sortDataByCol(this.Flavour, colName, 'asc', type);
    }
  }
  // Sorting flavour Api end

  // Sorting coupan code Api start
  filterTableColumnss(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.Ccoupanid = this.apiserveice.sortDataByCol(this.Ccoupanid, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.Ccoupanid = this.apiserveice.sortDataByCol(this.Ccoupanid, colName, 'asc', type);
    }
  }
  // Sorting coupan code Api end

  // Particular ID get start
  pVariantID(id) {
    //console.log(id)
    this.router.navigate(['/products/add-product-flavour', id]);
  }
  productpic(id) {
    this.router.navigate(['/products/add-product-variant-picture', id]);
  }
  productFlavour(id, productVID) {
    this.router.navigate(['/products/product-flavour-summary', id, productVID]);
  }
  // getProductvariantId() {
  //   this.router.navigate(['/products/add-product-coupan-code', { "id": this.id }]);
  // }
  // Particular ID get end

  //  Delete Api start
  deleteeFlavour(id) {
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
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#D31D28',
          cancelButtonColor: '#D31D28',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            var data = id
            //console.log(data);
            this.apiserveice.deleteProductFlavour(data, this.httpOptions).subscribe(res => {
              //console.log(res);
              this.PFlavour();
            }, err => {
              console.log(err.error);
            })
            Swal.fire(
              'Deleted!',
              'Your Product Flavour has been deleted.',
              'success'
            )
          }
        })
      }
    });
  }
  deleteeproductpic(id) {
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
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#D31D28',
          cancelButtonColor: '#D31D28',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            var data = id
            //console.log(data);
            this.apiserveice.deleteProductPictures(data, this.httpOptions).subscribe(res => {
              //console.log(res);
              this.getproductVariantSummary();
            }, err => {
              console.log(err.error);
            })
            Swal.fire(
              'Deleted!',
              'Your Product Picture has been deleted.',
              'success'
            )
          }
        })
      }
    });
  }
  deleteeCoupan(id) {
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
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'error',
          showCancelButton: true,
          confirmButtonColor: '#D31D28',
          cancelButtonColor: '#D31D28',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            var data = id
            //console.log(data);
            this.apiserveice.deleteParticularCoupan(data, this.httpOptions).subscribe(res => {
              //console.log(res);
              this.PartcicularCoupanFetch();
            }, err => {
              console.log(err.error);
            })
            Swal.fire(
              'Deleted!',
              'Your Product Coupan has been deleted.',
              'success'
            )
          }
        })
      }
    });
  }
  // Delete Api end

  // Coupan Code linking Start 
  PartcicularCoupanFetch() {
    var token = '';
    let getarray = [];
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'token') != undefined) {
        token = dbres[CommonFunctions.findKeyIndex(dbres, 'token')]['token'];
        this.httpOptions = {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          })
        };
        getarray.push(this.id)
        var data = `productVariantId=` + getarray;
        //console.log(data);
        this.apiserveice.particularCoupan(data, this.httpOptions).subscribe(res => {
          //console.log(res);
          this.Ccoupanid = res['data'];
          //console.log(this.Ccoupanid);
          this.WholeCoupanCodeFetchingForDropdown();
        })
      }
    });
  }
  WholeCoupanCodeFetchingForDropdown() {
    var data = ""
    this.apiserveice.fetchCoupanCode(data, this.httpOptions).subscribe(res => {
      //console.log(res);
      this.coupancodes = res['data'];
      //console.log(this.Flavour)
    })
  }
  GetCoupanCodeID(coupanCodeid) {
    this.coupanID = coupanCodeid.target.value;
    //console.log(this.coupanID)
  }
  CoupanAddingWithParticularID() {
    var data = { "coupanCodeId": this.coupanID, "productVariantId": this.id }
    //console.log(data);
    this.spinner.show();
    this.apiserveice.addProductCoupanCode(data).subscribe(res => {
      //console.log(res);
      if (res['message'] == 'Product Coupan code added') {
        setTimeout(() => {
          this.spinner.hide();
          this.toast.success('Product Coupan Code Added');
        }, 600);
      }
      this.PartcicularCoupanFetch();
    })
  }
  // Coupan Code linking End 
  readOnlyFun(msg) {
    this.toast.error(msg);
  }


}
