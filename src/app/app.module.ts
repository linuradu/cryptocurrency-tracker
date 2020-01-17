import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {HomepageComponent} from './components/homepage/homepage.component';
import {FavoritesComponent} from './components/favorites/favorites.component';
import {MatButtonModule} from "@angular/material/button";
import {AppComponent} from './components/app/app.component';
import {StoreModule} from "@ngrx/store";
import {MarketReducer} from "./store/reducers/market.reducer";
import {HttpClientModule} from "@angular/common/http";
import {MatTableModule} from "@angular/material/table";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";
import {OnboardComponent} from "./components/onboard/onboard.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    HttpClientModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    StoreModule.forRoot({assets: MarketReducer})
  ],
  declarations: [
    AppComponent,
    OnboardComponent,
    HomepageComponent,
    FavoritesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
