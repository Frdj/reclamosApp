import { Routes } from '@angular/router';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';

export const routes: Routes = [
  { path: 'reclamos', component: ReclamosComponent },
  { path: '', redirectTo: '/reclamos', pathMatch: 'full' }
];
