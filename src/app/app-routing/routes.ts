import { Routes } from '@angular/router';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';
import { LogoutComponent } from '../components/logout/logout.component';

export const routes: Routes = [
  { path: 'home', component: ReclamosComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
