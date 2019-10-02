import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Reclamo } from 'src/app/models/reclamo';
import { FormGroup, FormControl } from '@angular/forms';
import { ReclamosService } from 'src/app/services/reclamos/reclamos.service';

@Component({
  selector: 'app-modificar-reclamo',
  templateUrl: './modificar-reclamo.component.html',
  styleUrls: ['./modificar-reclamo.component.scss']
})
export class ModificarReclamoComponent implements OnInit {

  estados = [
    {
      id: 1,
      descripcion: 'Ingresado'
    },
    {
      id: 2,
      descripcion: 'Retiro Pendiente'
    },
    {
      id: 3,
      descripcion: 'Finalizado'
    },
    {
      id: 4,
      descripcion: 'Cancelado'
    },
    {
      id: 5,
      descripcion: 'No Retirado'
    }
  ];

  formulario: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModificarReclamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Reclamo,
    private reclamoService: ReclamosService
  ) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      usuario: new FormControl(this.data.usuario),
      estado: new FormControl(this.data.estado.descripcion),
      nroOrden: new FormControl(this.data.nroOrden),
      descripcion: new FormControl(this.data.descripcion),
      fuente: new FormControl(this.data.fuente),
      fecha: new FormControl(this.data.fecha),
      id: new FormControl(this.data.id)
    });
  }

  compare(o1: any, o2: any): boolean {
    return o1.descripcion === o2.descripcion && o1.id === o2.id;
  }

  modificar() {
    console.log(this.formulario.value);
    // this.reclamoService.update(this.data.id, this.formulario.value)
    //   .subscribe(res => console.log(res));
  }

}
