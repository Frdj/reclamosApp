import { Routes } from '@angular/router';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { LoginComponent } from '../components/login/login.component';

export const routes: Routes = [
  { path: 'home', component: ReclamosComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
