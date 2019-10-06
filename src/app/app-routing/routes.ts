import { Routes } from '@angular/router';
import { ReclamosComponent } from '../components/reclamos/reclamos.component';
import { LogoutComponent } from '../components/logout/logout.component';
import { LoginComponent } from '../components/login/login.component';
import { LoginGuard } from '../guards/login.guard';

export const routes: Routes = [
  { path: 'home', component: ReclamosComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
