import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './router/guards/auth-guard.service';

// Components
import { AdminComponent } from './components/admin/admin.component';
import { AddRaceComponent } from './components/admin/add-race/add-race.component';
import { AddClassComponent } from './components/admin/add-class/add-class.component';
import { AddDeityComponent } from './components/admin/add-deity/add-deity.component';
import { LoginComponent } from './components/login/login.component';
import { CharacterComponent } from './components/character/character.component';
import { CharacterListComponent } from './components/character/character-list/character-list.component';
import { PartyComponent } from './components/party/party.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { NewCharacterComponent } from './components/character/new-character/new-character.component';
import { NewCharacterClassComponent } from './components/character/new-character-class/new-character-class.component';
import { NewCharacterSkillComponent } from './components/character/new-character-skill/new-character-skill.component';
import { NewCharacterFeatComponent } from './components/character/new-character-feat/new-character-feat.component';
import { AddSkillComponent } from './components/admin/add-skill/add-skill.component';
import { AddFeatComponent } from './components/admin/add-feat/add-feat.component';

const appRoutes: Routes = [
  { path: '',                     component: HomeComponent },
  { path: '',                     redirectTo: '/', pathMatch: 'full', },
  { path: 'admin',                component: AdminComponent,                  canActivate: [AuthGuard] },
  { path: 'admin/add-race',       component: AddRaceComponent,                canActivate: [AuthGuard] },
  { path: 'admin/add-deity',      component: AddDeityComponent,               canActivate: [AuthGuard] },
  { path: 'admin/add-skill',      component: AddSkillComponent,               canActivate: [AuthGuard] },
  { path: 'admin/add-class',      component: AddClassComponent,               canActivate: [AuthGuard] },
  { path: 'admin/add-feat',       component: AddFeatComponent,                canActivate: [AuthGuard] },
  { path: 'login',                component: LoginComponent },
  { path: 'parties',              component: PartyComponent,                  canActivate: [AuthGuard] },
  { path: 'parties/id/:id',       component: PartyComponent,                  canActivate: [AuthGuard] },
  { path: 'parties/owned/',       component: PartyComponent,                  canActivate: [AuthGuard] },
  { path: 'characters',           component: CharacterListComponent,          canActivate: [AuthGuard] },
  { path: 'character/id/:id',     component: CharacterComponent,              canActivate: [AuthGuard] },
  { path: 'character/new',        component: NewCharacterComponent,           canActivate: [AuthGuard] },
  { path: 'character/new/class',  component: NewCharacterClassComponent,      canActivate: [AuthGuard] },
  { path: 'character/new/skill',  component: NewCharacterSkillComponent,      canActivate: [AuthGuard] },
  { path: 'character/new/feats',  component: NewCharacterFeatComponent,       canActivate: [AuthGuard] },
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
