import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { ExcelService } from 'src/app/service/excel.service';
declare var $: any
@Component({
  selector: 'app-franchise-form',
  templateUrl: './franchise-form.component.html',
  styleUrls: ['./franchise-form.component.scss']
})
export class FranchiseFormComponent implements OnInit {
  public franchise: any;
  public httpOptions: any;
  public sort: boolean = false;
  public filterInput: any;
  public p: any;
  public pageno: any;
  constructor(private apiservice: CommonServiceService,private excelService: ExcelService, private storageService: StorageService) { }

  ngOnInit() {
    this.apiservice.title = 'Partner with SOS';
    this.franchiseFetch();
    // $(document).ready(function () {
    //   $('#example').DataTable();
    // });
  }

  // fetch start
  franchiseFetch() {
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
        this.apiservice.fetchFranchise(data, this.httpOptions).subscribe(res => {
          this.franchise = res['data'];
        })
      }
    });
  }
  // fetch end

  // SORTING API START
  filterTableColumn(colName, type) {
    if (!this.sort) {
      this.sort = !this.sort;
      this.franchise = this.apiservice.sortDataByCol(this.franchise, colName, 'des', type);
    } else {
      this.sort = !this.sort;
      this.franchise = this.apiservice.sortDataByCol(this.franchise, colName, 'asc', type);
    }
  }
  // SORTING API END
    // EXCEL START Customer
    exportAsXLSXs() {
      this.excelService.exportAsExcelFile(this.franchise, 'Partner With SOS  Excel');
    }
    // EXCEL end Customer
}
