import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {JsonPipe, NgIf} from '@angular/common';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DataService} from '../../service/upload-service.service';
import {Observable} from 'rxjs';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  imports: [

    NgIf,
    JsonPipe,
    ReactiveFormsModule
  ],
  styleUrls: ['./excel-upload.component.css']
})
export class ExcelUploadComponent implements OnInit {

  excelData: any[] = [];
  myForm: FormGroup;
  fileToUpload: File | null = null;
  dataTransfer !: boolean | null;


  constructor( private serviceFile: DataService, private http: HttpClient) {

    this.myForm = new FormGroup({
      file: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {

  }


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

      const file = event.target.files[0];
      if (file) {
        this.fileToUpload = file;
      }
    };

    reader.readAsArrayBuffer(file);  // Utiliser readAsArrayBuffer
  }

  getKeys(row: any): string[] {
    return Object.keys(row);
  }







  sendData() {
    this.serviceFile.sendDatatobackend(this.excelData).subscribe({
      next: (response: { message: string }) => {
        if (response && response.message) {
          console.log('Succès:', response.message);
          this.vider(); // Vider les données après envoi
          this.dataTransfer = true;
        }
      },
      error: (error: any) => {
        console.error('Erreur dans la requête:', error);
        this.dataTransfer = false;

        // Afficher un message d'erreur plus détaillé
        if (error.error && error.error.message) {
          console.error('Message d\'erreur du backend:', error.error.message);
        }
      }
    });
  }



  vider() {
    this.excelData = [];
    this.myForm.reset();
    this.dataTransfer=null;

  }
}

