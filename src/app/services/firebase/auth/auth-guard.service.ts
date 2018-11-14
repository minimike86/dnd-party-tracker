import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private activate: boolean;

  constructor(private authService: AuthService,
              private router: Router) {
    this.activate = false;
    this.authService.afAuth.authState.subscribe(data => {
      this.activate = false;
      if (data !== undefined && data !== null && data.email !== undefined) {
        this.activate = true;
      }
    });
  }

  canActivate(): boolean {
    if (!this.activate) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
