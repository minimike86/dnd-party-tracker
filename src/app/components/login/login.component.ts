import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  checkIsLoggedIn() {
    this.authService.afAuth.authState.subscribe(data => {
      if (data !== undefined && data !== null) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit() {
    this.checkIsLoggedIn();
  }

  login() {
    this.authService.login('google');
    this.checkIsLoggedIn();
  }

  showPrivacyPolicyModal() {
    //
  }

  showTermsOfServiceModal() {
    //
  }

}
