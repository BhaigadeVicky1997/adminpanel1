import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { CommonFunctions } from 'src/app/common.function';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from 'src/app/service/storage.service';
import { CommonServiceService } from 'src/app/service/common-service.service';
declare var CanvasJS: any;
@Component({
  selector: 'app-view-dashboard',
  templateUrl: './view-dashboard.component.html',
  styleUrls: ['./view-dashboard.component.scss']
})
export class ViewDashboardComponent implements OnInit {
  public httpOptions: any;
  public Countproduct: any;
  public Countbrand: any;
  public CountCategory: any;
  public p: any;
  CountSubCategory: any;
  CountOrders: any;
  CountPendingOrders: any;
  shippedOrders: any;
  completedOrders: any;
  constructor(private apiserveice: CommonServiceService, private storageService: StorageService) { }

  ngOnInit() {
    this.getALLcards();
    this.canvasjs();
    this.apiserveice.title = 'Dashboard';
  }

  canvasjs() {
    var chart = new CanvasJS.Chart("chartContainer",
      {
        animationEnabled: true,
        title: {
          // text: "Coupon Code Tracking"
        },
        axisY: {
          title: "Sum of Total Sales",
          includeZero: false
        },
        axisX: {
          title: "Coupon Codes",
        },
        data: [

          {
            color: "#D31D28",
            dataPoints: [
              { x: 1, y: 500, label: "Venezuela" },
              { x: 2, y: 400, label: "Saudi" },
              { x: 3, y: 300, label: "Canada" },
              { x: 4, y: 250, label: "Iran" },
              { x: 5, y: 200, label: "Russia" },
              { x: 6, y: 150, label: "UAE" },
              { x: 7, y: 100, label: "US" },

            ]
          }
        ]
      });

    chart.render();

  }

  // Fetch Start 
  getALLcards() {
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
        var data = ``
        this.apiserveice.getproduct(data, this.httpOptions).subscribe(res => {
          this.Countproduct = res['total_records'];

        })
        this.apiserveice.ProductBrand(data, this.httpOptions).subscribe(res => {
          this.Countbrand = res['count'];
        })
        this.apiserveice.fetchCategory(data, this.httpOptions).subscribe(res => {
          this.CountCategory = res['count'];
        })
        this.apiserveice.fetchSubCategory(data, this.httpOptions).subscribe(res => {
          this.CountSubCategory = res['count'];
        })
        this.apiserveice.fetchOrder(data, this.httpOptions).subscribe(res => {
          this.CountOrders = res['count'];
        })
        this.apiserveice.pendingOrder(data, this.httpOptions).subscribe(res => {
          this.CountPendingOrders = res['count'];
        })
        this.apiserveice.shippedOrder(data, this.httpOptions).subscribe(res => {
          this.shippedOrders = res['count'];
        })
        this.apiserveice.completedOrder(data, this.httpOptions).subscribe(res => {
          this.completedOrders = res['count'];
        })
      }
    });
  }
  // Fetch end

}
