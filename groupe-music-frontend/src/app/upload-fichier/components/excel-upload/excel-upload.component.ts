import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import {JsonPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  imports: [
    JsonPipe,
    NgIf
  ],
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent {
  excelData: any[] = [];

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Utiliser readAsArrayBuffer au lieu de readAsBinaryString
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Conversion de la feuille en JSON
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log('Excel data:', this.excelData);
    };

    reader.readAsArrayBuffer(file);  // Utiliser readAsArrayBuffer
  }
}

