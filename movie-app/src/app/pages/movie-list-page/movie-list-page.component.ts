import { MovieListService } from 'src/app/services/movielist.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/models/movieDetails';
import { MovieService } from 'src/app/services/movie.service';
import { User } from 'src/app/models/user';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthService } from 'src/app/services/auth.service';
import { MovieList } from 'src/app/models/movieList';

@Component({
  selector: 'app-movie-list-page',
  templateUrl: './movie-list-page.component.html',
  styleUrls: ['./movie-list-page.component.css'],
})
export class MovieListPageComponent {
  public movies: MovieDetails[] = [];
  private movieListId?: string;

  private user: User | undefined;
  private profile: Profile | undefined;
  private requestResponse: string | undefined;
  public movieLists: MovieList[] | undefined;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private profileService: ProfileService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {

    this.getLoggedInUser();
    this.getProfile();

    this.route.params.subscribe((params) => {
      this.movieListId = params['id'];
    });

    console.error("HI", this.profile?.MovieLists);

    let movielist = this.profile?.MovieLists.find((list) => list.MovieListId === this.movieListId);

    console.error(movielist);

    this.movieService.getMoviePictureById('726209').subscribe(
      (data: any) => {
        this.movies = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  public getLoggedInUser(): void {
    this.authService.loggedInUser$.subscribe((user) => {
      this.user = user;
    });
  }

  public getProfile(): void {
    this.profileService.getProfile(this.user?.UserId).subscribe(
      (profile) => {
        console.log('Profile retrieved successfully:', profile);
        this.profile = profile;
      },
      (error) => {
        console.error('Error retrieving profile:', error);
        this.requestResponse = error;
      }
    );
  }
}
