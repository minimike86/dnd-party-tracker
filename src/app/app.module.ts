// Modules
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CharacterComponent } from './components/character/character.component';
import { PartyComponent } from './components/party/party.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AbilityScoresComponent } from './components/character/ability-scores/ability-scores.component';
import { CombatOptionsComponent } from './components/character/combat-options/combat-options.component';
import { SavingThrowsComponent } from './components/character/saving-throws/saving-throws.component';
import { ArmorClassComponent } from './components/character/armor-class/armor-class.component';
import { HitPointsComponent } from './components/character/hit-points/hit-points.component';
import { WeaponsComponent } from './components/weapons/weapons.component';
import { NewCharacterComponent } from './components/character/new-character/new-character.component';
// Environment Variables
import { environment } from '../environments/environment';
// Routes
import { RouterModule, Routes } from '@angular/router';
const appRoutes: Routes = [
  { path: '',               component: HomeComponent },
  { path: 'party',          component: PartyComponent },
  { path: 'character',      component: CharacterComponent },
  { path: 'character/new',  component: NewCharacterComponent },
  { path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CharacterComponent,
    PartyComponent,
    PageNotFoundComponent,
    HomeComponent,
    AbilityScoresComponent,
    CombatOptionsComponent,
    SavingThrowsComponent,
    ArmorClassComponent,
    HitPointsComponent,
    WeaponsComponent,
    NewCharacterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase, 'dnd-party-tracker'),
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
