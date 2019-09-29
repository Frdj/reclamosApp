import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { ReclamosService } from 'src/app/services/reclamos/reclamos.service';
import { Reclamo } from 'src/app/models/reclamo';
import { SSO } from 'src/app/global/sso';
import { AuthService } from 'src/app/services/auth/auth.service';

declare var swal: any;

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class ReclamosComponent implements OnInit {
  reclamos: Array<Reclamo> = [];
  message: string;

  dataSource: MatTableDataSource<Reclamo> = new MatTableDataSource<Reclamo>(
    this.reclamos
  );
  columnsToDisplay = ['id', 'usuario', 'estado', 'nroOrden', 'fecha', 'modificar', 'eliminar'];
  expandedElement: Reclamo | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public reclamosService: ReclamosService, private authService: AuthService) {
    SSO.saveUserToken();
    this.authService.setToken(true);
    // console.log(SSO.getJWT());
  }

  ngOnInit() {
    this.getReclamos();
    // Me subscribo ante el agregado de un reclamo en la tabla
    this.reclamosService.currentReclamo.subscribe((reclamo: Reclamo) => {
      if (reclamo) {
        reclamo.fecha = new Date(reclamo.fecha).toLocaleDateString();
        this.dataSource.data.push(reclamo);
        this.dataSource.connect().next(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  eliminar(element: Reclamo) {
    swal({
      title: '¿Está seguro?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then(borrar => {
        if (borrar) {
          this.reclamosService.delete(element.id).subscribe(
            (res: Reclamo) => this.getReclamos()
          )
        }
      });
  }

  getReclamos() {
    this.reclamosService.getReclamos().subscribe(
      (res: Array<Reclamo>) => {
        // se cambia formato de fecha a dd/mm/yyyy
        res.map(reclamo => {
          reclamo.fecha = new Date(reclamo.fecha).toLocaleDateString();
        });
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err: Error) => {
        swal('Error al obtener reclamos', err.message, 'error');
      }
    );
  }
}
