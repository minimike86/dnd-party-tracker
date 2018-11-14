import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/firebase/auth/auth-guard.service';

// Components
import { CharacterComponent } from './components/character/character.component';
import { PartyComponent } from './components/party/party.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NewCharacterComponent } from './components/character/new-character/new-character.component';
import { NewCharacterClassComponent } from './components/character/new-character-class/new-character-class.component';

const appRoutes: Routes = [
  { path: '',                     component: HomeComponent, },
  { path: '',                     redirectTo: '/', pathMatch: 'full', },
  { path: 'parties',              component: PartyComponent, },
  { path: 'parties/:id',          component: PartyComponent },
  { path: 'parties/owned/',       component: PartyComponent,                  canActivate: [AuthGuard] },
  { path: 'character',            component: CharacterComponent },
  { path: 'character/new',        component: NewCharacterComponent,           canActivate: [AuthGuard] },
  { path: 'character/new/class',  component: NewCharacterClassComponent,      canActivate: [AuthGuard] },
  { path: '**',                   component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
