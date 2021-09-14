import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  public title: any = 'Welcome';
  public httpOptions: any;
  public fileupload: any;

  // public domainname = "https://sos.test-central.kenmarkserver.com/"
  public domainname = "https://api.sourceofsupplements.com/"
  user: any;
  constructor(private http: HttpClient, private storageService: StorageService, public router: Router) { }

  // Auth Integration Start
  getUser() {
    return this.http.get(this.domainname + 'user')
  }
  loginApi(data) {
    return this.http.post(this.domainname + 'dashboard/login', data)
  }
  registerUser(data) {
    return this.http.post(this.domainname + 'signUp', data)
  }
  // Auth Integration End


  // All products api start
  getproduct(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product?' + data, headerData)
  }

  getproductVariantSumm(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product' + data, headerData)
  }
  getBrandDropdown(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/brand' + data, headerData)
  }
  getCategoryDropdown(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/category' + data, headerData)
  }
  getSubCategoryDropdown(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/sub-category?' + data, headerData)
  }
  updateProduct(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/product', data, headerData)
  }
  deleteProduct(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/product/' + data, headerData)
  }
  getProductFlavour(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product-flavour?' + data, headerData)
  }
  addProductapi(data) {
    return this.http.post(this.domainname + 'dashboard/product', data, this.httpOptions)
  }
  addProductFlavour(data) {
    return this.http.post(this.domainname + 'dashboard/product-flavour', data, this.httpOptions)
  }
  deleteProductFlavour(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/product-flavour/' + data, headerData)
  }
  deleteProductPictures(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/product-variant-pic/' + data, headerData)
  }
  addProductVariantPicture(data) {
    return this.http.post(this.domainname + 'dashboard/product-variant-pic', data, this.fileupload)
  }
  UpdateProductVariantPicture(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/product-variant-pic', data, headerData)
  }
  flavourUpdate(data) {
    return this.http.put(this.domainname + 'dashboard/product-flavour', data, this.httpOptions)
  }
  particularCoupan(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product-coupan?' + data, headerData)
  }
  addParticularCoupan(data) {
    return this.http.post(this.domainname + 'dashboard/product-coupan', data, this.httpOptions)
  }
  ProductCoupanCode(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product-coupan' + data, headerData)
  }
  addProductCoupanCode(data) {
    return this.http.post(this.domainname + 'dashboard/product-coupan', data, this.httpOptions)
  }
  deleteParticularCoupan(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/product-coupan/' + data, headerData)
  }
  getSku(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/sku' + data, headerData)
  }
  getParticularProductFlavour(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product-flavour?' + data, headerData)
  }
  // All products api end

  // All brand api start
  ProductBrand(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/brand' + data, headerData)
  }
  productBrandSumm(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/brand?' + data, headerData)
  }
  addProductBrand(data) {
    return this.http.post(this.domainname + 'dashboard/brand', data, this.fileupload)
  }
  deleteProductBrand(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/brand/' + data, headerData)
  }
  updateProductBrand(data) {
    return this.http.put(this.domainname + 'dashboard/brand-image', data, this.fileupload)
  }
  UpdateBrandwwwForm(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/brand', data, headerData)
  }
  UpdateDropdown(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/brand', data, headerData)
  }
  particularBrandID(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/product?' + data, headerData)
  }
  // All brand api end

  //All Category Api start
  fetchCategory(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/category' + data, headerData)
  }
  AddCategory(data) {
    return this.http.post(this.domainname + 'dashboard/category', data, this.fileupload)
  }
  deleteCategories(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/category/' + data, headerData)
  }
  categorySumm(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/category?' + data, headerData)
  }
  UpdateCategorywwwForm(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/category', data, headerData)
  }
  updateimageCategory(data) {
    return this.http.put(this.domainname + 'dashboard/category-image', data, this.fileupload)
  }
  //All Category Api End

  // Sub-category Api Start
  fetchSubCategory(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/sub-category' + data, headerData)
  }
  deleteSubCategories(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/sub-category/' + data, headerData)
  }
  SubcategoryAdd(data) {
    return this.http.post(this.domainname + 'dashboard/sub-category', data, this.httpOptions)
  }
  SubcategorySumm(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/sub-category?' + data, headerData)
  }
  UpdateSubCategory(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/sub-category', data, headerData)
  }
  // Sub-category Api End

  //All order api start
  fetchOrder(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/order' + data, headerData)
  }
  orderSummary(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/order?' + data, headerData)
  }
  Updateorders(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/order', data, headerData)
  }
  UpdateGuestAddress(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/guest', data, headerData)
  }
  AddStreetAddressCode(data) {
    return this.http.post(this.domainname + 'dashboard/client-address', data, this.httpOptions)
  }
  pendingOrder(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/order?orderStatus=ORDER PENDING' + data, headerData)
  }
  shippedOrder(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/order?orderStatus=SHIPPED' + data, headerData)
  }
  completedOrder(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/order?orderStatus=COMPLETED' + data, headerData)
  }
  guestExcel(data,headerData){
    return this.http.get(this.domainname + 'dashboard/guest/excel' + data, headerData)
  }
  customerExcel(data,headerData){
    return this.http.get(this.domainname + 'dashboard/client-Address/excel' + data, headerData)
  }
  //All order api end  

  //All Coupan Code api start
  fetchCoupanCode(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/coupan-code' + data, headerData)
  }
  AddCoupanCode(data) {
    return this.http.post(this.domainname + 'dashboard/coupan-code', data, this.httpOptions)
  }
  coupanCodeOnclick(data) {
    return this.http.post(this.domainname + 'dashboard/product-coupan', data, this.httpOptions)
  }
  DeleteCoupanCode(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/coupan-code/' + data, headerData)
  }
  particularCoupanCode(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/coupan-code?' + data, headerData)
  }
  UpdateCoupan(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/coupan-code', data, headerData)
  }
  DeleteProductCoupon(data,headerData) {
    headerData.body =data;
    return this.http.delete(this.domainname + 'dashboard/product-coupan', headerData)
  }
  //All Coupan Code api end

  //All Customer api start
  getCustomer(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/client' + data, headerData)
  }
  //All Customer api end

  //ALL MISCELLANEOUS COMPONENT API START HERE
  // Store locator api start
  getStore(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/store-locator' + data, headerData)
  }
  AddStore(data) {
    return this.http.post(this.domainname + 'dashboard/store-locator', data, this.httpOptions)
  }
  deletestore(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/store-locator/' + data, headerData)
  }
  particularStore(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/store-locator?' + data, headerData)
  }
  UpdateStore(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/store-locator', data, headerData)
  }
  // Store Loactor api end

  // Franchise api start
  fetchFranchise(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/franchise' + data, headerData)
  }
  // Franchise api end

  // Banner Api start
  getBanner(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/banner' + data, headerData)
  }
  addBanner(data) {
    return this.http.post(this.domainname + 'dashboard/banner', data, this.fileupload)
  }
  particularBannerID(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/banner?' + data, headerData)
  }
  UpdateBannerrwwwForm(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/banner', data, headerData)
  }
  updateBanner(data) {
    return this.http.put(this.domainname + 'dashboard/banner-image', data, this.fileupload)
  }
  deletebanner(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/banner/' + data, headerData)
  }
  // Banner Api End

  // Subscription api start
  fetchSubscription(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/subscription' + data, headerData)
  }
  // Subscription api end

  // Slider Start
  getslider(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/slider' + data, headerData)
  }
  addSlider(data) {
    return this.http.post(this.domainname + 'dashboard/slider', data, this.fileupload)
  }
  UpdateSliderwwwForm(data, headerData) {
    return this.http.put(this.domainname + 'dashboard/slider', data, headerData)
  }
  deleteslider(data, headerData) {
    return this.http.delete(this.domainname + 'dashboard/slider/' + data, headerData)
  }
  getsliderparticularID(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/slider?' + data, headerData)
  }
  updateSliderPic(data) {
    return this.http.put(this.domainname + 'dashboard/slider-image', data, this.fileupload)
  }
  // Slider End
  fetchContact(data, headerData) {
    return this.http.get(this.domainname + 'dashboard/contactus' + data, headerData)
  }

  sendtracklinkapi(data) {
    return this.http.post(this.domainname + 'dashboard/send-track-link', data, this.httpOptions)
  }
  //ALL MISCELLANEOUS COMPONENT API END HERE



  // Global token start but its working only in post method
  gettoken() {
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
  }
  // Global token end but its working only in post method

  // Global file uploading token start
  getFiletoken() {
    var token = '';
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'token') != undefined) {
        token = dbres[CommonFunctions.findKeyIndex(dbres, 'token')]['token'];
        this.fileupload = {
          headers: new HttpHeaders({
            "Authorization": "Bearer " + token
          })
        };
      }
    });
  }
  // Global file uploading token end

  // AutoLogout function start
  autoLogout(currentUrl: string) {
    this.storageService.get_storageData().then((dbres) => {
      if (CommonFunctions.findKeyIndex(dbres, 'token') != undefined) {
        if (currentUrl == '/' || currentUrl == '/login') {
          this.router.navigate(['dashboard/view-dashboard']);
        } else {
          this.router.navigate([currentUrl]);
        }
      }
      else {
        this.router.navigate(['']);
      }
    });
  }
  // AutoLogout function end

  // TABLE SORTING FUNCTION START
  sortDataByCol(array, column, type, dataType) {
    if (array.length > 0) {
      if (typeof column === "object") {
        if (dataType == 'int') {
          if (type == 'asc') {
            array = array.sort((a, b) => {
              return a[column[0]][column[1]] - b[column[0]][column[1]]
            });
          } else if (type == 'des') {
            array = array.sort((a, b) => {
              return b[column[0]][column[1]] - a[column[0]][column[1]]
            });
          }
        } else {
          if (type == 'asc') {
            array = array.sort((a, b) => {
              return (a[column[0]][column[1]] == b[column[0]][column[1]]) ? 0 : ((a[column[0]][column[1]] > b[column[0]][column[1]]) ? 1 : -1);
            });
          } else if (type == 'des') {
            array = array.sort((a, b) => {
              return (b[column[0]][column[1]] == a[column[0]][column[1]]) ? 0 : ((b[column[0]][column[1]] > a[column[0]][column[1]]) ? 1 : -1);
            });
          }
        }
      }
      else {
        if (dataType == 'int') {
          if (type == 'asc') {
            array = array.sort((a, b) => {
              return a[column] - b[column]
            });
          } else if (type == 'des') {
            array = array.sort((a, b) => {
              return b[column] - a[column]
            });
          }
        } else {
          if (type == 'asc') {
            array = array.sort((a, b) => {
              return (a[column] == b[column]) ? 0 : ((a[column] > b[column]) ? 1 : -1);
            });
          } else if (type == 'des') {
            array = array.sort((a, b) => {
              return (b[column] == a[column]) ? 0 : ((b[column] > a[column]) ? 1 : -1);
            });
          }
        }
      }
    }
    return array;
  }
}
// TABLE SORTING FUNCTION START

