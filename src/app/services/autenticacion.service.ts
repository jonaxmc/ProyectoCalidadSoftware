import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AutenticacionService implements CanActivate{
  token:any;
  constructor(private router:Router) { }

  canActivate(nect: ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
    try{
      this.token = localStorage.getItem('token');
      this.token = atob(this.token.split('.')[1]);
      this.token = JSON.parse(this.token);
      if(this.token.exp > Date.now()/1000){
        return true;
      }
    }catch(e){
      this.router.navigateByUrl('login');
      return false;
    }

  }

}
