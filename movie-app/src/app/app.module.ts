import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MovieCardListComponent } from 'src/app/components/movie-card-list/movie-card-list.component';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ModalPopupComponent } from './components/modal-popup/modal-popup.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';


@NgModule({
  declarations: [
    AppComponent,
    MovieCardListComponent,
    LogInPageComponent,
    HomePageComponent,
    MovieDetailsPageComponent,
    StarRatingComponent,
    ProfilePageComponent,
    ModalPopupComponent,
    MovieListComponent,
    SignUpPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
