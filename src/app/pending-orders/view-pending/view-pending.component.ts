import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from 'src/app/service/common-service.service';

@Component({
  selector: 'app-view-pending',
  templateUrl: './view-pending.component.html',
  styleUrls: ['./view-pending.component.scss']
})
export class ViewPendingComponent implements OnInit {

  constructor(private apiservice:CommonServiceService) { }

  ngOnInit() {
    this.apiservice.title = 'Pending-Orders';
  }

}
