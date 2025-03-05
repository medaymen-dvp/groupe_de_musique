import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { JsonPipe, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UploadServiceService } from '../../service/upload-service.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

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
  dataTransfer: boolean | null = null;

  constructor(private serviceFile: UploadServiceService, private http: HttpClient) {
    this.myForm = new FormGroup({
      file: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  // Gestion du changement de fichier
  onFileChange(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: 'array' });

      // Lecture du premier onglet de la feuille
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Conversion de la feuille en JSON
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log('Excel data:', this.excelData);

      // Enregistrement du fichier pour un envoi ultérieur
      if (file) {
        this.fileToUpload = file;
      }
    };

    reader.readAsArrayBuffer(file);  // Utilisation de readAsArrayBuffer
  }

  // Extraction des clés (colonnes) de la première ligne du tableau
  getKeys(row: any): string[] {
    return Object.keys(row);
  }

  // Envoi des données vers le backend
  sendData(): void {
    this.serviceFile.sendDatatobackend(this.excelData).subscribe({
      next: (response: { message: string }) => {
        if (response && response.message) {
          console.log('Succès:', response.message);
          this.vider();  // Réinitialisation des données après envoi
          this.dataTransfer = true;
        }
      },
      error: (error: any) => {
        console.error('Erreur dans la requête:', error);
        this.dataTransfer = false;

        // Affichage d'un message d'erreur détaillé
        if (error.error && error.error.message) {
          console.error('Message d\'erreur du backend:', error.error.message);
        }
      }
    });
  }

  // Réinitialisation des données et du formulaire
  vider(): void {
    this.excelData = [];
    this.myForm.reset();
    this.dataTransfer = null;
  }
}
