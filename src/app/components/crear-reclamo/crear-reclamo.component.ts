import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { ReclamosService } from 'src/app/services/reclamos.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-crear-reclamo',
  templateUrl: './crear-reclamo.component.html',
  styleUrls: ['./crear-reclamo.component.scss']
})
export class CrearReclamoComponent implements OnInit {
  formulario: FormGroup;
  @Output() reclamoCreado: EventEmitter<any> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<CrearReclamoComponent>,
    private reclamoService: ReclamosService
  ) {}

  ngOnInit() {
    // Inicializo el formulario
    this.formulario = new FormGroup({
      email: new FormControl(),
      descripcion: new FormControl(),
      nroOrden: new FormControl()
    });
  }

  crearReclamo() {
    console.log(this.formulario.value);
    this.reclamoService
      .saveReclamo(this.formulario.value)
      .subscribe((res: any) => {
        console.log(res);
        swal('Reclamo creado', res.usuario.nombre, 'success');
        this.reclamoCreado.emit(res);
      });
  }
}
