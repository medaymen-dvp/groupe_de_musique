import { Routes } from '@angular/router';

export const routes: Routes = [


  {path: 'upload',loadChildren: () => import('./upload-fichier/upload-fichier-routing.module').then(m =>m.UploadFichierRoutingModule ) }// Lazy loading



];
