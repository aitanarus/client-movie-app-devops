import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, map } from 'rxjs';
import { MovieList } from '../models/movieList';

@Injectable({
  providedIn: 'root',
})
export class MovieListService {
  private apiUrl = 'https://movie-app-backend-cloud-nbdw6ogija-ew.a.run.app/api/movielist';

  constructor(private http: HttpClient) {}

  getMovieListByProfileId(profileId: string): Observable<MovieList[]> {
    return this.http.get<MovieList[]>(`${this.apiUrl}/${profileId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving movie list by profile ID:', error);
        return throwError(() => error);
      })
    );
  }

  createMovieList(movieList: MovieList): Observable<MovieList> {
    return this.http.post<MovieList>(this.apiUrl, movieList).pipe(
      map((response:MovieList) => {
        const createdMovieList : MovieList = {
          MovieListId : response.MovieListId,
          ListName : response.ListName,
          ListDescription : response.ListDescription,
          MProfileId : response.MProfileId,
          ImbdIds : response.ImbdIds
        };
        return createdMovieList;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating movie list:', error);
        return throwError(() => error);
      })
    );
  }

  updateMovieList(movieList: MovieList): Observable<MovieList> {
    return this.http.put<MovieList>(this.apiUrl, movieList).pipe(
      map((response:MovieList) => {
        const updatedMovieList : MovieList = {
          MovieListId : response.MovieListId,
          ListName : response.ListName,
          ListDescription : response.ListDescription,
          MProfileId : response.MProfileId,
          ImbdIds : response.ImbdIds
        };
        return updatedMovieList;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating movie list:', error);
        return throwError(() => error);
      })
    );
  }

  deleteMovieList(movieListId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${movieListId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting movie list:', error);
        return throwError(() => error);
      })
    );
  }

  addMovieToMovieList(movieListId: string, imdbId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${movieListId}/movies/${imdbId}`, {}).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error adding movie to movie list:', error);
        return throwError(() => error);
      })
    );
  }

  removeMovieFromMovieList(movieListId: string, imdbId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${movieListId}/movies/${imdbId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error removing movie from movie list:', error);
        return throwError(() => error);
      })
    );
  }
}