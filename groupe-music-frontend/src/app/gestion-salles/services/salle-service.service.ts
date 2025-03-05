import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap, delay, switchMap, take } from 'rxjs/operators';
import { Salle } from '../models/Salle';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SalleServiceService {
  _loading$ = new BehaviorSubject<boolean>(false);
  _salle$ = new BehaviorSubject<Salle[]>([]);

  lastCandidatesLoad = 0;

  constructor(private http: HttpClient) {}

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  get salles$(): Observable<Salle[]> {
    return this._salle$.asObservable();
  }

  private setLoadingStatus(loading: boolean): void {
    this._loading$.next(loading);
  }

  getSallesFromServer(): void {
    this.setLoadingStatus(true);

    const headers = new HttpHeaders().set('Accept', 'application/json'); // Demander la réponse en JSON classique

    this.http.get<any>('http://127.0.0.1:8000/apip/salles', { headers }).pipe(
      tap(response => {
        // Vérifier si la réponse contient un tableau dans "member" ou utiliser directement la réponse
        const salles = response.member || response;

        // Filtrer les données pour ne conserver que ce dont on a besoin
        const filteredSalles = salles.map((salle: { id: any; numero: any; capacite: any; description: any }) => ({
          id: salle.id,
          numero: salle.numero,
          capacite: salle.capacite,
          description: salle.description,
        }));

        // Mettre à jour l'état avec les salles filtrées
        this._salle$.next(filteredSalles);

        // Mettre à jour le statut de chargement
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  deleteSalle(id: number): void {
    this.setLoadingStatus(true);
    this.http.delete(`http://127.0.0.1:8000/apip/salles/${id}`).pipe(
      delay(1000),
      switchMap(() => this.salles$),
      take(1),
      map(salles => salles.filter(salle => salle.id !== id)), // Correction de l'erreur dans map()
      tap(updatedSalles => {
        this._salle$.next(updatedSalles);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  addSalle(newSalle: Omit<Salle, 'id'>): void {
    this.setLoadingStatus(true);
    this.http.post<Salle>('http://127.0.0.1:8000/apip/salles', newSalle).pipe(
      take(1),
      switchMap((salleAjoutee) =>
        this.salles$.pipe(
          take(1),
          map(salles => [...salles, salleAjoutee]) // Utilisation de salleAjoutee
        )
      ),
      tap(updatedSalles => {
        this._salle$.next(updatedSalles);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  editSalle(id: number, updatedSalle: Partial<Salle>): void {
    this.setLoadingStatus(true);  // Démarre l'animation de chargement

    const url = `http://127.0.0.1:8000/apip/salles/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/merge-patch+json');

    this.http.patch<Salle>(url, updatedSalle, { headers }).pipe(
      delay(1000),  // Simule un délai de traitement
      switchMap((updatedSalleResponse) =>
        this.salles$.pipe(
          take(1),
          map(salles => {
            // Remplace la salle modifiée par sa nouvelle version
            return salles.map(salle =>
              salle.id === id ? { ...salle, ...updatedSalleResponse } : salle
            );
          })
        )
      ),
      tap(updatedSalles => {
        this._salle$.next(updatedSalles);  // Mets à jour l'état de la liste
        this.setLoadingStatus(false);  // Arrête l'animation de chargement
      })
    ).subscribe();
  }

  editSalle2(id: number, updatedSalle: Partial<Salle>): void {
    this.setLoadingStatus(true);
    this.salles$.pipe(
      take(1),
      map(salles => salles.map(salle =>
        salle.id === id ? { ...salle, ...updatedSalle } : salle
      )),
      tap(updatedSalles => this._salle$.next(updatedSalles)), // Met à jour la liste locale
      switchMap(updatedSalles =>
        this.http.patch<Salle>(`http://127.0.0.1:8000/apip/salles/${id}`,
          updatedSalles.find(salle => salle.id === id),
          { headers: new HttpHeaders().set('Content-Type', 'application/merge-patch+json') }
        )
      ),
    ).subscribe();
  }

  getSalleById(id: number): Observable<Salle> {
    if (!this.lastCandidatesLoad) {
      this.getSallesFromServer();
    }

    return this.salles$.pipe(
      map(salles => salles.filter(salle => salle.id === id)[0])
    );
  }
}
