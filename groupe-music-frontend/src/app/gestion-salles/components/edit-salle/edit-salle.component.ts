import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SalleServiceService } from '../../services/salle-service.service';
import { Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { Salle } from '../../models/Salle';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-salle',
  imports: [
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './edit-salle.component.html',
  styleUrls: ['./edit-salle.component.scss']  // Correction ici
})
export class EditSalleComponent implements OnInit {
  sale$!: Observable<Salle>;
  allSalle$!: Observable<Salle[]>;
  loading$!: Observable<boolean>;
  salleForm!: FormGroup;
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private salleService: SalleServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initFormulaire();
    this.initObservables();
    this.loadSalleData();
  }

  private initObservables() {
    this.allSalle$ = this.salleService.salles$;
    this.loading$ = this.salleService.loading$;
  }

  private initFormulaire() {
    this.salleForm = this.formBuilder.group({
      numero: [null, [Validators.required, Validators.min(1)]],
      capacite: [null, [Validators.required, Validators.min(5)]],
      description: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  private loadSalleData() {
    this.sale$ = this.route.params.pipe(
      switchMap(params => {
        this.id = +params['id'];  // Convertit en nombre
        console.log("ID récupéré :", this.id);
        return this.salleService.getSalleById(this.id);
      }),
      tap(salle => {
        if (salle) {
          console.log("Salle chargée :", salle);
          this.salleForm.patchValue(salle);
        }
      }),
      take(1) // Prend une seule valeur et se désabonne automatiquement
    );
  }

  onEditSalle(): void {
    if (this.salleForm.valid) {
      const updatedSalle: Partial<Salle> = {
        numero: this.salleForm.get('numero')?.value,
        capacite: this.salleForm.get('capacite')?.value,
        description: this.salleForm.get('description')?.value
      };

      this.salleService.editSalle(this.id, updatedSalle);
      console.log("Salle mise à jour :", updatedSalle);
      this.goBack();
    }
  }

  goBack() {
    this.router.navigate(['/gestionsalle']);
  }
}
