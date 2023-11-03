import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { MovieDetails } from 'src/app/models/movieDetails';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '4e052b36';
  private baseUrl = '  http://www.omdbapi.com/';

  constructor() {}

  getPopularMovies(): Observable<MovieDetails[]> {
    const url =
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA3NGM3YjgzNGU3N2UyZGUwMDkyNzQ1NmUyMjc0ZiIsInN1YiI6IjY1NDI3NzViNmJlYWVhMDEyYzhjM2MwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QwL7W5dlU3oLh4TatC4QCiQiA6KPXz3y2FxvpPZX7UU',
      },
    };

    return new Observable((observer) => {
      fetch(url, options)
        .then((response: any) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: any) => {
          if (Array.isArray(data.results)) {
            // Map the received JSON data to an array of MovieDetails
            const movieDetailsArray: MovieDetails[] = data.results.map(
              (result: any) => ({
                Poster:
                  'https://image.tmdb.org/t/p/original' + result.poster_path,
                imdbID: 'tt' + result.id,
                imdbRating: result.vote_average,
              })
            );
            observer.next(movieDetailsArray);
          } else {
            // Handle the case when the data is not an array
            observer.error('Data is not in the expected format');
          }
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  getUpcomingMovies(): Observable<MovieDetails[]> {
    const url =
    'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA3NGM3YjgzNGU3N2UyZGUwMDkyNzQ1NmUyMjc0ZiIsInN1YiI6IjY1NDI3NzViNmJlYWVhMDEyYzhjM2MwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QwL7W5dlU3oLh4TatC4QCiQiA6KPXz3y2FxvpPZX7UU',
      },
    };

    return new Observable((observer) => {
      fetch(url, options)
        .then((response: any) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data: any) => {
          if (Array.isArray(data.results)) {
            // Map the received JSON data to an array of MovieDetails
            const movieDetailsArray: MovieDetails[] = data.results.map(
              (result: any) => ({
                Poster:
                  'https://image.tmdb.org/t/p/original' + result.poster_path,
                imdbID: 'tt' + result.id,
                imdbRating: result.vote_average,
              })
            );
            observer.next(movieDetailsArray);
          } else {
            // Handle the case when the data is not an array
            observer.error('Data is not in the expected format');
          }
          observer.complete();
        })
        .catch((error: any) => {
          observer.error(error);
        });
    });
  }

  searchMovies(query: string): Observable<MovieDetails[]> {
    // const url =
    //   'https://api.themoviedb.org/3/search/movie?query=' +
    //   query +
    //   '&include_adult=false&language=en-US&page=1';
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     accept: 'application/json',
    //     Authorization:
    //       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjA3NGM3YjgzNGU3N2UyZGUwMDkyNzQ1NmUyMjc0ZiIsInN1YiI6IjY1NDI3NzViNmJlYWVhMDEyYzhjM2MwMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QwL7W5dlU3oLh4TatC4QCiQiA6KPXz3y2FxvpPZX7UU',
    //   },
    // };

    // return new Observable((observer) => {
    //   fetch(url, options)
    //     .then((response: any) => {
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       return response.json();
    //     })
    //     .then((data: any) => {
    //       if (Array.isArray(data.results)) {
    //         // Map the received JSON data to an array of MovieDetails
    //         const movieDetailsArray: MovieDetails[] = data.results.map(
    //           (result: any) => ({
    //             Poster:
    //               'https://image.tmdb.org/t/p/original' + result.poster_path,
    //             imdbID: result.id,
    //             imdbRating: result.vote_average,
    //           })
    //         );
    //         observer.next(movieDetailsArray);
    //       } else {
    //         // Handle the case when the data is not an array
    //         observer.error('Data is not in the expected format');
    //       }
    //       observer.complete();
    //     })
    //     .catch((error: any) => {
    //       observer.error(error);
    //     });
    // });

    const url = `${this.baseUrl}?apikey=${this.apiKey}&t=${query}`;

    return new Observable((observer) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            observer.next(data as MovieDetails[]);
          } else {
            observer.next([data as MovieDetails]);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  getMovieDetails(movieId: string) {
    const url = `${this.baseUrl}?apikey=${this.apiKey}&i=${movieId}`;

    return new Observable((observer) => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            observer.next(data as MovieDetails[]);
          } else {
            observer.next([data as MovieDetails]);
          }
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
