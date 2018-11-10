import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) {
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
