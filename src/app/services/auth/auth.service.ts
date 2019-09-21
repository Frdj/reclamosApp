import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SSO } from '../../global/sso';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSource = new BehaviorSubject(false);
  currentToken = this.tokenSource.asObservable();

  constructor() {}

  setToken(isToken: boolean) {
    this.tokenSource.next(isToken);
  }
}
