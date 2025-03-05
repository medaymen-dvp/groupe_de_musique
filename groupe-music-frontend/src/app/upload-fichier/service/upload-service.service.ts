// service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  constructor(private httpClient: HttpClient) {}

  // Méthode pour envoyer des données au backend
  sendDatatobackend(excelData: any): Observable<any> {
    // Envoyer les données Excel au backend via POST
    return this.httpClient.post('http://localhost:8000/api/savegroupemusic', excelData).pipe(
      // Gérer les erreurs éventuelles
      catchError((error) => {
        console.error('Erreur dans la requête backend:', error);
        return throwError(() => new Error('Erreur dans la requête backend'));
      })
    );
  }
}

