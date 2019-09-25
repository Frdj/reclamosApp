import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

declare var SSOAuth: any;

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let SSO = new SSOAuth({
      tenantId: "08a94e5c-76ac-4025-99eb-e76f9dc47f6b",
      loginCallback: "http://localhost:4200/home",
      logoutCallback: "http://localhost:4200/"
    });
    console.log(SSO);
    if (!sessionStorage.getItem('token')) {
      SSO.login();
      return false;
    } else {
      SSO.saveUserToken();
      sessionStorage.setItem('token', SSO.getJWT());
      return true;
    }
  }
}
