import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Reclamo } from '../../models/reclamo';
import { environment } from '../../../environments/environment';
import { SSO } from 'src/app/global/sso';

@Injectable({
  providedIn: 'root'
})
export class ReclamosService {
  url: string = environment.url;

  reclamo: Reclamo;
  private reclamoSource = new BehaviorSubject(this.reclamo);
  currentReclamo = this.reclamoSource.asObservable();

  public httpHeaders = new HttpHeaders();

  constructor(private httpClient: HttpClient) { }

  getReclamos() {
    return this.httpClient.get(this.url, { headers: this.httpHeaders.append('Authorization', SSO.getJWT()) });
  }

  saveReclamo(reclamo) {
    return this.httpClient.post(this.url, reclamo, {
      headers: this.httpHeaders.append('Authorization', SSO.getJWT())
    });
  }

  changeReclamo(reclamo: Reclamo) {
    this.reclamoSource.next(reclamo);
  }

  update(id: number, reclamo: Reclamo) {
    return this.httpClient.put(`${this.url}/${id}`, reclamo, {
      headers: this.httpHeaders.append('Authorization', SSO.getJWT())
    });
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`, {
      headers: this.httpHeaders.append('Authorization', SSO.getJWT())
    });
  }
}
