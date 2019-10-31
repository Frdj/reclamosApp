import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ReclamosService } from 'src/app/services/reclamos/reclamos.service';
import swal from 'sweetalert';
import { Reclamo } from 'src/app/models/reclamo';

@Component({
  selector: 'app-crear-reclamo',
  templateUrl: './crear-reclamo.component.html',
  styleUrls: ['./crear-reclamo.component.scss']
})
export class CrearReclamoComponent implements OnInit {
  loading: boolean;
  message: string;
  reclamo: Reclamo;
  formulario: FormGroup;
  ordenes = [1,2,3,4,5,6];
  mostrarModal = false;

  @Output() reclamoCreado: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<CrearReclamoComponent>,
    private reclamoService: ReclamosService
  ) {
    this.reclamoService.currentReclamo.subscribe(reclamo => this.reclamo = reclamo);
  }

  ngOnInit() {
    // Inicializo el formulario
    this.formulario = new FormGroup({
      email: new FormControl(),
      descripcion: new FormControl(),
      nroOrden: new FormControl()
    });
    this.loading = false;
  }

  crearReclamo() {
    this.loading = true;
    this.reclamoService.saveReclamo(this.formulario.value).subscribe(
      (res: Reclamo) => {
        swal('Reclamo creado', res.usuario.nombre, 'success');
        this.reclamoCreado.emit(true);
        this.reclamoService.changeReclamo(res);
        this.loading = false;
      },
      err => {
        swal('Error al crear reclamo', err.error.message, 'error');
        this.loading = false;
      }
    );
  }

  mostrar(){
    this.mostrarModal=true;
  }
}
