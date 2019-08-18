import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor() { }

  public GetAll() : void {
    //return this.restangular.all('Home').getList();
  }
}
