import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getReclamos() {
    return this.httpClient.get('http://localhost:3000/reclamo');
  }
}
