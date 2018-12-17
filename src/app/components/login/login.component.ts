import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { Router } from '@angular/router';
import { User } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private currentUser: User;

  constructor(private authService: AuthService,
              private router: Router) {

    this.authService.user$.subscribe(user => {
      console.log('LoginComponent', user);
      this.currentUser = user;
    });

    if (this.currentUser !== undefined && this.currentUser !== null) {
      console.log('logged in');
    } else if (this.currentUser === undefined || this.currentUser === null) {
      console.log('not logged in');
    }

  }

  ngOnInit() {
  }

  login() {
    this.authService.login('google');
  }

  showPrivacyPolicyModal() {
    //
  }

  showTermsOfServiceModal() {
    //
  }

}
