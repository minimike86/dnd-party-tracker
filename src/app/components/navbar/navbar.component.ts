import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/firebase/auth/auth.service';
import { User } from 'firebase';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public currentUser: User;
  public isCollapsed = true;

  constructor(private authService: AuthService) {
    authService.user$.subscribe(user => {
      this.currentUser = user;
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
