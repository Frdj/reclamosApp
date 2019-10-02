import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Reclamo } from '../../models/reclamo';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {

  url: string = environment.url;

  reclamo: Reclamo;
  private reclamoSource = new BehaviorSubject(this.reclamo);
  currentReclamo = this.reclamoSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getReclamos() {
    return this.httpClient.get(this.url);
  }

  saveReclamo(reclamo) {
    return this.httpClient.post(this.url, reclamo);
  }

  changeReclamo(reclamo: Reclamo) {
    this.reclamoSource.next(reclamo);
  }

  update(id: number, reclamo: Reclamo) {
    return this.httpClient.put(`${this.url}/${id}`, reclamo);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
