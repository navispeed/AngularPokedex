import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {InputComponent} from './search/input/input.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {SearchService} from 'app/search/search.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PokemonService} from 'app/services/pokemon.service';
import {ResultsComponent} from './search/results/results.component';
import {SearchComponent} from './search/search.component';
import {RouterModule, Routes} from '@angular/router';
import {StoreService} from 'app/services/store.service';
import { DetailComponent } from './search/detail/detail.component';

const appRoutes: Routes = [
  {path: 'search', component: SearchComponent},
  {path: 'search/:query', component: SearchComponent},
  {path: 'detail/:id', component: DetailComponent},
  {
    path: '',
    redirectTo: '/search',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InputComponent,
    ResultsComponent,
    SearchComponent,
    DetailComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SearchService, PokemonService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
