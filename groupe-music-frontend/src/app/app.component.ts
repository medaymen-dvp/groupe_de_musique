import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ExcelUploadComponent} from './upload-fichier/components/excel-upload/excel-upload.component';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './core/components/header/header.component';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
