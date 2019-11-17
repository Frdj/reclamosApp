import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

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
  columnsToDisplay = ['id', 'nombre', 'descripcion', 'nroOrden', 'fecha', 'modificar', 'eliminar'];
  /* Para filtrar por columna */
  orderFilter = new FormControl();
  idFilter = new FormControl();
  nombreFilter = new FormControl();
  fechaFilter = new FormControl();
  globalFilter = '';

  filteredValues = {
    nroOrden: '', id: '', nombre:'', fecha: ''
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
    this.authService.autoLogout(expiracion *1000 - new Date().getTime());
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

    //Filtros
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

  }

  applyFilter(filterValue: string) {
    /*filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;*/

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
          )
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
    this.reclamosService.getReclamos().subscribe(
      (res: Array<Reclamo>) => {
        // se cambia formato de fecha a dd/mm/yyyy
        res.map(reclamo => {
          reclamo.fecha = new Date(reclamo.fecha).toLocaleDateString();
        });
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        this.dataSource.filterPredicate = function(data, filter: string): boolean {
          //return data.id.toString().startsWith(filter) || data.nroOrden.toString().startsWith(filter);     
          var globalMatch = !this.globalFilter;

          if (this.globalFilter) {
            // search all text fields
            globalMatch = data.id.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
          }

          if (!globalMatch) {
            return;
          }

          let searchString = JSON.parse(filter);
          return data.nroOrden.toString().trim().indexOf(searchString.nroOrden) !== -1 &&
            data.id.toString().trim().toLowerCase().indexOf(searchString.id.toLowerCase()) !== -1 &&
            data.usuario.nombre.toString().trim().toLowerCase().indexOf(searchString.nombre.toLowerCase()) !== -1 &&
            data.fecha.toString().trim().toLowerCase().indexOf(searchString.fecha.toLowerCase()) !== -1;

            
          };
//        this.dataSource.filterPredicate = this.customFilterPredicate();
      },
      (err: Error) => {
        swal('Error al obtener reclamos', err.message, 'error');
      }
    );
  }

  customFilterPredicate() {
    const myFilterPredicate = (data, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.name.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.position.toString().trim().indexOf(searchString.position) !== -1 &&
        data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
}
