import { Routes } from '@angular/router';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';
import { LoginGuard } from '../guards/login.guard';

export const routes: Routes = [
  { path: 'home', component: ReclamosComponent, canActivate: [LoginGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
