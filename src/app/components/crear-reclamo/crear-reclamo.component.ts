import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-crear-reclamo',
  templateUrl: './crear-reclamo.component.html',
  styleUrls: ['./crear-reclamo.component.scss']
})
export class CrearReclamoComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearReclamoComponent>
  ) { }

  ngOnInit() {
    // Inicializo el formulario
    this.formulario = new FormGroup({
      cliente: new FormControl(),
      descripcion: new FormControl(),
      nroOrden: new FormControl()
    });
  }

  crearReclamo() {
    console.log(this.formulario.value);
  }

}
