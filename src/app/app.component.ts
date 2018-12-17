import { Component } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loading$: Observable<boolean> = observableOf(false);
  public loading = false;

  constructor(private router: Router) {

    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading$ = observableOf(true);
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading$ = observableOf(false);
          break;
        }
        default: {
          break;
        }
      }
    });

  }

}
