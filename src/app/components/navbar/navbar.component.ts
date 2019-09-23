import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CrearReclamoComponent } from '../crear-reclamo/crear-reclamo.component';
import { SSO } from 'src/app/global/sso';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  estaLogueado: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    console.log('Constructor del Navbar');
    this.authService.currentToken.subscribe(estaLogueado => {
      this.estaLogueado = estaLogueado;
      console.log(this.estaLogueado);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearReclamoComponent, {
      width: '50%',
      data: { name: '', animal: '' }
    });

    dialogRef.componentInstance.reclamoCreado.subscribe(isClosed => {
      if (isClosed) {
        dialogRef.close();
      }
    });
  }

  logout() {
    SSO.logout();
    // this.estaLogueado = false;
    // this.authService.setToken(false);
  }

  login() {
    SSO.login();
    // this.estaLogueado = true;
    // this.authService.setToken(true);
  }
}
