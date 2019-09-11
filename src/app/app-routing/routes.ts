import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'reclamos', component: ReclamosComponent},
];
