import { Injectable } from '@angular/core';
import idb from 'idb';
import { CommonFunctions } from '../common.function';
//import { Observable, Subject } from 'rxjs';
//import { Schedule } from '../app.component';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  //private _dataChange: Subject<Schedule> = new Subject<Schedule>();
  private _dbPromise;
  data: any;
  public commentdata: any;
  public createIdeadataArray: any;
  public storagePostID: any;
  public profileID: any = '';
  public searchkeyword: any;
  constructor() {
  }

  connectToIDB() {
    this._dbPromise = idb.open('SOS-indexDB', 1, UpgradeDB => {
      if (!UpgradeDB.objectStoreNames.contains('local_storage')) {
        UpgradeDB.createObjectStore('local_storage', { keyPath: 'id', autoIncrement: true });
      }
      /*
      if (!UpgradeDB.objectStoreNames.contains('Sync-Items')) {
        UpgradeDB.createObjectStore('Sync-Items', {keyPath: 'id', autoIncrement: true});
      }
      */
    });
  }

  addItems(target: string, data: any) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      tx.objectStore(target).put(data);
      /* this.getAllData('local_storage').then((items: Schedule) => {
        this._dataChange.next(items);
      }); */
      //return tx.complete;
    });
  }

  deleteItems(target: string, data: string) { //value: Schedule
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target).delete(data);
      //store.delete(data);
      //console.log(data, store);
      /* this.getAllData(target).then((items: Schedule) => {
        this._dataChange.next(items);
      }); */
      //return tx.complete;
    });
  }

  getAllData(target: string) {
    return this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      return store.getAll();
    });
  }


  check_add_storageData(arrayData, col: string) {
    return new Promise((resolve, reject) => {
      this.connectToIDB();

      var check_data = false;
      this.getAllData('local_storage').then(res => {
        //console.log(res.length);
        if (res.length == 0) {
          //console.log(res);
          this.addItems('local_storage', arrayData);
          resolve(true);
        } else {
          res.forEach((element, index) => {
            //console.log(element[col]);
            if (element[col] != undefined) {
              //console.log(col, '->', element[col]);
              check_data = true;
            }
          });

          if (!check_data) {
            this.addItems('local_storage', arrayData);
            resolve(true);
          }
        }
      });
    });

  }

  delete_storageData(col) {
    return new Promise((resolve, reject)=>{
      this.getAllData('local_storage').then(res => {
        if (res.length == 0) {
          //console.log(res);
          resolve(true);
        } else {
          res.forEach((element, index) => {
            //console.log(element[col]);
            if (element[col] != undefined) {
              //console.log(col, '->', element[col]);
              this.deleteItems('local_storage', element['id']);
            }
            if(index === (res.length-1)){
              resolve(true);
            }
          });
        }
      });
    });
  }

  get_value_storageData(col) {
    this.data = null;
    var a = this.getAllData('local_storage')
      .then(res => {
        res.forEach((element, index) => {
          if (element[col] != undefined) {
            this.data = element[col];
          }
        });
      });
    return a;
  }

  get_storageData() {
    this.data = null;
    var chk = this.getAllData('local_storage');
    /* .then((result)=>{
      var a = CommonFunctions.findKeyIndex(result,col);
      //console.log(result[a]);
      return result[a];
    }); */
    return chk;
  }

  updateItems(arrayData, col: string) {
    return new Promise((resolve,reject)=>{
      this.delete_storageData(col).then(res=>{
        if(res){
          this.check_add_storageData(arrayData, col);
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });    
  }

  return_Data() {
    this.data;
    return this.data;
  }

  checkArray(data) {
    //console.log(data);
    if (typeof (data) == "object") {
      //console.log(data[0]);
      return true;
    } else {
      //console.log(data[0]);
      return false;
    }
  }
}
