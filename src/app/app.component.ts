import { Component, OnInit } from '@angular/core';
import { StorageService } from './service/storage.service';

@Component({
  selector: 'app-adminto',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public name: any;
  public title: any = 'SOS Admin'
  constructor(public storageService: StorageService) { }
  handler(event) {
    this.name = event;
  }
  ngOnInit() {
    this.storageService.check_add_storageData({ 'sos': this.title }, 'sos');
  }
}
