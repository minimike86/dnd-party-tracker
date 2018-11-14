import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { User } from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: User;

  constructor(public authService: AuthService) {
    authService.afAuth.user.subscribe(data => {
      this.user = data;
    });
  }

  ngOnInit() {
  }

  login() {
    this.authService.login('google');
  }

  logout() {
    this.authService.logout();
  }

}
