import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface PeriodicElement {
  id: number;
  cliente: string;
  estado: string;
  fecha: string;
  descripcion: string;
  nroOrden: number;
  operador: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    id: 1,
    cliente: 'nico',
    estado: 'Ingresado',
    fecha:'15/11/1997',
    descripcion: 'producto lacteo en mal estado',
    nroOrden: 123,
    operador: 'alex'
  },
  {
    id: 2,
    cliente: 'santi',
    estado: 'Pendiente',
    fecha:'19/12/1996',
    descripcion: 'producto plastico roto',
    nroOrden: 456,
    operador: 'alex'
  },
];


@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReclamosComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['id', 'cliente', 'estado', 'fecha'];
  expandedElement: PeriodicElement | null;

  constructor() { }

  ngOnInit() {
  }

}
