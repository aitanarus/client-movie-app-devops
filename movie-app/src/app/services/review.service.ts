import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8080/api/reviews';

  constructor(private http: HttpClient) {}

  createReview(review: Review): Observable<Review> {
    return this.http.post(this.apiUrl, review).pipe(
      map((response: any) => {
        const createdReview: Review = {
          ReviewId: response.ReviewId,
          ImdbID: response.imdbID,
          Author: response.AuthorName,
          MovieTitle: response.MovieTitle,
          ReviewTitle: response.ReviewTitle,
          ReviewText: response.Review,
          Rating: response.Rating,
          PublishedOn: response.PublishedOn,
          RProfileId: response.ProfileId
        };
        return createdReview;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error creating review:', error);
        return throwError(() => error);
      })
    );
  }

  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(this.apiUrl, review).pipe(
      map((response: any) => {
        const updatedReview: Review = {
          ReviewId: response.ReviewId,
          ImdbID: response.ImdbID,
          Author: response.Author,
          MovieTitle: response.MovieTitle,
          ReviewTitle: response.ReviewTitle,
          ReviewText: response.ReviewText,
          Rating: response.Rating,
          PublishedOn: response.PublishedOn,
          RProfileId: response.RProfileId
        };
        return updatedReview;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating review:', error);
        return throwError(() => error);
      })
    );
  }

  removeReview(reviewId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reviewId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting review:', error);
        return throwError(() => error);
      })
    );
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving all reviews:', error);
        return throwError(() => error);
      })
    );
  }

  getReviewByProfileId(profileId: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/profile/${profileId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving review by profile ID:', error);
        return throwError(() => error);
      })
    );
  }

  getReviewById(reviewId: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${reviewId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving review by ID:', error);
        return throwError(() => error);
      })
    );
  }

  getReviewsByMovieId(imdbId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/movie/${imdbId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving reviews by movie ID:', error);
        return throwError(() => error);
      })
    );
  }

  getTopReviews(topReviewsCount: string, imdbId: string): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/top/${topReviewsCount}/movie/${imdbId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving top reviews:', error);
        return throwError(() => error);
      })
    );
  }

  getMostReviewedMovies(topMoviesCount: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.apiUrl}/most-reviewed/${topMoviesCount}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving most reviewed movies:', error);
        return throwError(() => error);
      })
    );
  }

  getAverageRatingForMovie(imdbId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/average-rating/movie/${imdbId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving average rating for movie:', error);
        return throwError(() => error);
      })
    );
  }
}

