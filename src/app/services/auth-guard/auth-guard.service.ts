import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouteReuseStrategy, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  service? : AuthService;
  constructor(private router: Router, authService: AuthService) {
    this.service = authService
   }

  canActivate(){
    if(this.service?.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
