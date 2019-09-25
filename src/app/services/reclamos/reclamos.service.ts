import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Reclamo } from '../../models/reclamo';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  reclamo: Reclamo;
  private reclamoSource = new BehaviorSubject(this.reclamo);
  currentReclamo = this.reclamoSource.asObservable();

  constructor(private httpClient: HttpClient) {}

  getReclamos() {
    return this.httpClient.get('http://localhost:3000/reclamo');
  }

  saveReclamo(reclamo) {
    return this.httpClient.post('http://localhost:3000/reclamo', reclamo);
  }

  changeReclamo(reclamo: Reclamo) {
    this.reclamoSource.next(reclamo);
  }
}
