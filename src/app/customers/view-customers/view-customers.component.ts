import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { StorageService } from 'src/app/service/storage.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { ExcelService } from 'src/app/service/excel.service';
declare var $: any;
@Component({
  selector: 'app-view-customers',
  templateUrl: './view-customers.component.html',
  styleUrls: ['./view-customers.component.scss']
})
export class ViewCustomersComponent implements OnInit {
  public httpOptions: any;
  public User: any;
  public filterInput: any;
  public p: any;
  public pageno: any;
  public sort: boolean = false;
  constructor(private apiserveice: CommonServiceService, private excelService: ExcelService, public storageService: StorageService) { }

  ngOnInit() {
    this.apiserveice.title = 'Customers';
    this.getCustomer();
  }

  // Fetch api start
  getCustomer() {
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
        this.apiserveice.getCustomer(data, this.httpOptions).subscribe(res => {
          this.User = res['data'];
        })
      }
    });
  }
  // Fetch api end

  // SORTING API START
  filterTableColumn(colName, type) {
    //console.log(colName);
    if (!this.sort) {
      this.sort = !this.sort;
      this.User = this.apiserveice.sortDataByCol(this.User, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.User = this.apiserveice.sortDataByCol(this.User, colName, 'asc', type);
    }
  }
  // SORTING API END

  // EXCEL START
  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.User, 'Customers');
  }
  // EXCEL END

}
