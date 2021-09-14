import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-view-shipped',
  templateUrl: './view-shipped.component.html',
  styleUrls: ['./view-shipped.component.scss']
})
export class ViewShippedComponent implements OnInit {

  constructor(private apiservice:CommonServiceService) { }

  ngOnInit() {
    this.apiservice.title = 'Shipped-Orders';
  }

}
