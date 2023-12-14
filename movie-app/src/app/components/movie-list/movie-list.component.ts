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
      MProfileId: 'user1',
      ImbdIds: ['1', '2', '3'], // Assuming IMDb IDs are strings
    },
    {
      MovieListId: '2',
      ListName: 'Comedy Movies',
      ListDescription: 'A selection of funny and entertaining movies',
      MProfileId: 'user2',
      ImbdIds: ['4', '5', '6'], // Assuming IMDb IDs are strings
    },
  ];
}