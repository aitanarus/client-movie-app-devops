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
      MovieListId: '1',
      ListName: 'Action Movies',
      ListDescription: 'A collection of action-packed movies',
      MoviesId: ['1', '2', '3'], // Assuming movie IDs are strings
      ProfileId: 'user1',
    },
    {
      MovieListId: '2',
      ListName: 'Comedy Movies',
      ListDescription: 'A selection of funny and entertaining movies',
      MoviesId: ['4', '5', '6'], // Assuming movie IDs are strings
      ProfileId: 'user2',
    },
  ];
}