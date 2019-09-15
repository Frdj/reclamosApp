import { Routes } from '@angular/router';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';

export const routes: Routes = [
  { path: 'home', component: ReclamosComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
