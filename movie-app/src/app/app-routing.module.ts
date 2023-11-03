import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInPageComponent } from './pages/log-in-page/log-in-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

const routes: Routes = [

  { path: 'login', component: LogInPageComponent },
  { path: 'signup', component: SignUpPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'movie/:id', component: MovieDetailsPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
