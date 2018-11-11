import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CharacterComponent } from './components/character/character.component';
import { PartyComponent } from './components/party/party.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NewCharacterComponent } from './components/character/new-character/new-character.component';

const appRoutes: Routes = [
  { path: '',                     component: HomeComponent },
  { path: '',                     redirectTo: '/', pathMatch: 'full' },
  { path: 'party',                component: PartyComponent },
  { path: 'character',            component: CharacterComponent },
  { path: 'character/new',        component: NewCharacterComponent },
  { path: 'character/new/class',  component: NewCharacterComponent },
  { path: '**',                   component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
