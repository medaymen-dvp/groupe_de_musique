import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Salle } from '../../models/Salle';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { SalleServiceService } from '../../services/salle-service.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-salles',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,  // Reactive Forms module importé ici
  ],
  templateUrl: './list-salles.component.html',
  styleUrls: ['./list-salles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Optimisation des performances avec OnPush
})
export class ListSallesComponent implements OnInit {
  // Déclaration des observables
  allSalle$!: Observable<Salle[]>;
  loading$!: Observable<boolean>;

  salleForm!: FormGroup; // Formulaire pour ajouter/éditer une salle

  constructor(
    private salleservice: SalleServiceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charge les salles au démarrage
    this.salleservice.getSallesFromServer();

    // Initialisation des observables et du formulaire
    this.initObservables();
    this.initFormulaire();
  }

  private initObservables() {
    this.allSalle$ = this.salleservice.salles$; // Observable des salles
    this.loading$ = this.salleservice.loading$; // Observable de l'état de chargement
  }

  // Méthode pour supprimer une salle
  deleteSalle(id: number): void {
    this.salleservice.deleteSalle(id); // Appel du service pour supprimer une salle
  }

  // Méthode pour ajouter une salle
  addSalle(): void {
    if (this.salleForm.valid) {
      console.log('Formulaire ajouté:', this.salleForm.value);
      this.salleservice.addSalle(this.salleForm.value);

      // Réinitialisation du formulaire après ajout
      this.salleForm.reset();
    } else {
      console.log('Formulaire invalide !');
    }
  }

  // Méthode pour éditer une salle
  editSalle(id: number): void {
    const updatedSalle: Partial<Salle> = {
      numero: this.salleForm.value.numero,
      capacite: this.salleForm.value.capacite,
      description: this.salleForm.value.description,
    };

    console.log('Salle mise à jour:', updatedSalle);
    this.salleservice.editSalle(id, updatedSalle);
  }

  // Initialisation du formulaire réactif
  initFormulaire() {
    this.salleForm = this.formBuilder.group({
      numero: [0, [Validators.required, Validators.min(1)]],
      capacite: [0, [Validators.required, Validators.min(5)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  // Réinitialisation du formulaire
  resetForm() {
    this.salleForm.reset();
  }

  // Navigation vers l'édition d'une salle
  goToSalleEdit(id: number) {
    this.router.navigate(['/gestionsalle', id]); // Redirection vers la page d'édition
  }
}
