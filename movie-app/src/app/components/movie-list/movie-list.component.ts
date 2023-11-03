import { Component } from '@angular/core';
import { MovieList } from 'src/app/models/movieList';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  movieLists: MovieList[] = [
    {
      ListName: 'Action Movies',
      ListDescription: 'Exciting action-packed films',
      MoviesId: ['tt123456', 'tt789012', 'tt345678'],
      UserId: 'user123',
    },
    {
      ListName: 'Comedy Films',
      ListDescription: 'Hilarious comedy movies',
      MoviesId: ['tt987654', 'tt654321'],
      UserId: 'user456',
    },
    {
      ListName: 'Drama Movies',
      ListDescription: 'Emotional and dramatic stories',
      MoviesId: ['tt333444', 'tt555666', 'tt777888', 'tt111222'],
      UserId: 'user789',
    },
    {
      ListName: 'Sci-Fi Collection',
      ListDescription: 'Science fiction adventures',
      MoviesId: ['tt999000', 'tt222333', 'tt444555', 'tt111222', 'tt777888','tt555666'],
      UserId: 'user111',
    },
    {
      ListName: 'Horror Flicks',
      ListDescription: 'Spine-chilling horror films',
      MoviesId: ['tt666777'],
      UserId: 'user222',
    },
  ];
}
