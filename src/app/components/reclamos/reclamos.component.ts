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
    position: 1,
    name: 'Hydrogen',
    weight: 1.0079,
    symbol: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`
  },
];


@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.component.html',
  styleUrls: ['./reclamos.component.scss']
})
export class ReclamosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'cliente', 'estado', 'fecha'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
