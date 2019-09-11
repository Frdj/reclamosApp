import { Component, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CrearReclamoComponent } from '../crear-reclamo/crear-reclamo.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CrearReclamoComponent, {
      width: '50%',
      data: { name: '', animal: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
