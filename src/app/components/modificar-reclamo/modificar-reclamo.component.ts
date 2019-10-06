import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Reclamo } from 'src/app/models/reclamo';
import { ReclamosService } from 'src/app/services/reclamos/reclamos.service';

declare var swal: any;

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

  constructor(
    public dialogRef: MatDialogRef<ModificarReclamoComponent>,
    @Inject(MAT_DIALOG_DATA) public reclamo: Reclamo,
    private reclamoService: ReclamosService
  ) { }

  ngOnInit() {
  }

  compare(o1: any, o2: any): boolean {
    return o1.descripcion === o2.descripcion && o1.id === o2.id;
  }

  modificar() {
    this.reclamo.fecha = new Date().toLocaleDateString();
    console.log(this.reclamo.fecha);
    this.reclamoService.update(this.reclamo.id, this.reclamo)
      .subscribe(res => {
        swal('Reclamo modificado con éxito', '', 'success');
        this.dialogRef.close();
      });
  }

}
