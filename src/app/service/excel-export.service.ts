import { Injectable } from '@angular/core';
import { Excel } from "exceljs/dist/exceljs.min.js";

import { FileSaver } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelExportService {
  name: string;
  sName: string;
  fileName: string;
  excelFileName: string;
  footer: string = "Powered by Kenmark Itan Solutions."
  blobType: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  cols = ["Column1", "Column2", "Column3", "Column4", "Column5"];
  data = [{ col1: "a1", col2: "b1", col3: "c1", col4: "d1", col5: "e1" },
  { col1: "a2", col2: "b2", col3: "c2", col4: "d2", col5: "e2" },
  { col1: "a3", col2: "b3", col3: "c3", col4: "d3", col5: "e3" },
  { col1: "a4", col2: "b4", col3: "c4", col4: "d4", col5: "e4" },
  { col1: "a5", col2: "b5", col3: "c5", col4: "d5", col5: "e5" }]
  colArray = [];



  constructor() {
    this.sName = 'SheetTest';
    this.excelFileName = 'TestExcelExport.xlsx';
  }
  applyRowStyle(sheet) {
    sheet.eachRow(function (row, rowNumber) {
      if (rowNumber > 3) {
        row.eachCell({ includeEmpty: true }, function (cell, colNumber) {
          sheet.getCell(cell.address.toString()).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' }
          sheet.getCell(cell.address.toString()).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
          sheet.getCell(cell.address.toString()).font = {
            name: 'Tahoma',
            family: 2,
            size: 8
          };
        });
      }
    });
    return sheet;
  }
  exportToExcel() {
    var workbook = new Excel.Workbook();
    workbook.creater = 'Web';
    workbook.lastModifiedBy = 'Web';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.addWorksheet(this.sName, { views: [{ state: 'frozen', ySplit: 3, xSplit: 2, activeCell: 'A1', showGridLines: false }] })
    var sheet = workbook.getWorksheet(1);
    var data1 = ["Exported Data"];
    sheet.addRow(data1);
    sheet.addRow("");
    sheet.getRow(3).values = this.cols;
    sheet.columns = [
      { key: 'col1' },
      { key: 'col2' },
      { key: 'col3' },
      { key: 'col4' },
      { key: 'col5' },
    ];
    this.colArray = ['A3', 'B3', 'C3', 'D3', 'E3'];
    sheet.addRows(this.data);
    sheet = this.applyRowStyle(sheet);
    sheet.getCell('A1', 'A2').font = {
      name: 'Tahoma',
      family: 2,
      size: 18
    };
    this.colArray.map(key => {
      sheet.getCell(key).fill = {
        type: 'gradient',
        gradient: 'angle',
        degree: 0,
        stops: [
          { position: 0, color: { argb: 'd9f1fa' } },
          { position: 0.5, color: { argb: 'd9f1fa' } },
          { position: 1, color: { argb: 'd9f1fa' } }
        ]
      };
      sheet.getCell(key).alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
      sheet.getCell(key).border = { right: { style: 'thin' }, top: { style: 'thin' } };
      sheet.getCell(key).font = {
        name: 'Tahoma',
        family: 2,
        size: 8,
        bold: true
      };
    });
    sheet.addRow([this.footer]);
    workbook.xlsx.writeBuffer().then(data => {
      var blob = new Blob([data], { type: this.blobType });
      FileSaver.saveAs(blob, this.excelFileName, true);
    });
  }
}
