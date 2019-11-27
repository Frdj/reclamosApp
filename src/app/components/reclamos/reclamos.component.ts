import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { interval, timer } from 'rxjs';
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
import { ModificarReclamoComponent } from '../modificar-reclamo/modificar-reclamo.component';
import { UpdatingModalComponent } from '../updating-modal/updating-modal.component';

declare var swal: any;

export interface DialogData {
  message: string;
}

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
  globalFilter = '';
  cargandoTabla = false;
  dataSource: MatTableDataSource<Reclamo> = new MatTableDataSource<Reclamo>(
    this.reclamos
  );
  estados = ['Ingresado', 'Retiro Pendiente', 'Finalizado', 'Cancelado', 'No Retirado'];
  columnsToDisplay = ['id', 'nombre', 'descripcion', 'nroOrden', 'fecha', 'modificar', 'eliminar'];
  /* Para filtrar por columna */
  orderFilter = new FormControl();
  idFilter = new FormControl();
  nombreFilter = new FormControl();
  fechaFilter = new FormControl();
  estadoFilter = new FormControl();

  filteredValues = {
    nroOrden: '', id: '', nombre: '', fecha: '', estado: ''
  };

  expandedElement: Reclamo | null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    public reclamosService: ReclamosService,
    private authService: AuthService,
    public dialog: MatDialog) {
    SSO.saveUserToken();
    this.authService.setToken(true);
    const expiracion = JSON.parse(localStorage.getItem('lscache-sso_user')).exp;
    this.authService.autoLogout(expiracion * 1000 - new Date().getTime());
  }

  ngOnInit() {
    const contador = interval(30000);
    this.getReclamos();
    contador.subscribe((n) => {
      this.recargar();
    });
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

    // Filtros
    this.orderFilter.valueChanges.subscribe((orderFilterValue) => {
      this.filteredValues['nroOrden'] = orderFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.idFilter.valueChanges.subscribe((idFilterValue) => {
      this.filteredValues['id'] = idFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.nombreFilter.valueChanges.subscribe((nombreFilterValue) => {
      this.filteredValues['nombre'] = nombreFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.fechaFilter.valueChanges.subscribe((fechaFilterValue) => {
      this.filteredValues['fecha'] = fechaFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.estadoFilter.valueChanges.subscribe((estadoFilterValue) => {
      this.filteredValues['estado'] = estadoFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  applyFilter(filterValue: string) {
    this.globalFilter = filterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
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
          );
        }
      });
  }

  modificar(element: Reclamo) {
    const dialogRef = this.dialog.open(ModificarReclamoComponent, {
      width: '50%',
      data: element
    });
  }

  getReclamos() {
    console.log('Obteniendo reclamos...');
    this.cargandoTabla = true;
    const loadingModal = this.openDialog();
    this.reclamosService.getReclamos().subscribe(
      (res: Array<Reclamo>) => {
        console.log(res);
        loadingModal.close();
        // se cambia formato de fecha a dd/mm/yyyy
        this.cargandoTabla = false;
        res.map(reclamo => {
          reclamo.fecha = new Date(reclamo.fecha).toLocaleDateString();
        });
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          let globalMatch = !this.globalFilter;
          if (this.globalFilter) {
            // search all text fields
            globalMatch = data.id.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
          }
          if (!globalMatch) {
            return;
          }
          const searchString = JSON.parse(filter);
          return data.nroOrden.toString().trim().indexOf(searchString.nroOrden) !== -1 &&
            data.id.toString().trim().toLowerCase().indexOf(searchString.id.toLowerCase()) !== -1 &&
            data.usuario.nombre.toString().trim().toLowerCase().indexOf(searchString.nombre.toLowerCase()) !== -1 &&
            data.fecha.toString().trim().toLowerCase().indexOf(searchString.fecha.toLowerCase()) !== -1 &&
            data.estado.descripcion.toString().trim().toLowerCase().indexOf(searchString.estado.toLowerCase()) !== -1;
        };
        this.dataSource.sortingDataAccessor = (item, property): string | number => {
          switch (property) {
            case 'fecha':
              let fechaArray = item.fecha.split("/");
              let dia = parseInt(fechaArray[0]);
              let mes = parseInt(fechaArray[1]);
              let anio = parseInt(fechaArray[2]);
              return (anio * 10000) + (mes * 100) + dia
            default: return item[property];
          }
        };
      },
      (err: Error) => {
        this.cargandoTabla = false;
        swal('Error al obtener reclamos', err.message, 'error');
      }
    );
  }

  recargar() {
    this.reclamosService.recargar()
      .subscribe(() => {
        this.getReclamos();
      });
  }

  openDialog(): MatDialogRef<UpdatingModalComponent> {
    const dialogRef = this.dialog.open(UpdatingModalComponent, {
      disableClose: true,
      width: '250px',
      data: 'Actualizando reclamos'
    });
    return dialogRef;
  }
}
