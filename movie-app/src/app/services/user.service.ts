import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  public signup(
    email: string,
    username: string,
    password: string
  ): Observable<any> {
    const signupData = { email, username, password };
    return this.http.post(`${this.apiUrl}/users/signup`, signupData).pipe(
      map((response: any) => {
        console.log(response);
        const user: User = {
          UserId: response.userId,
          Username: response.username,
          Password: response.password,
          Email: response.email
        };
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Signup failed:', error);
        return throwError(() => error);
      })
    );
  }

  public getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(`Error retrieving user with id ${userId}:`, error);
        return throwError(() => error);
      })
    );
  }

  public updateUser(user: User): Observable<User> {
    const userId = user.UserId;
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, user).pipe(
      map((updatedUser: User) => {
        return updatedUser;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating user:', error);
        return throwError(() => error);
      })
    );
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting user:', error);
        return throwError(() => error);
      })
    );
  }
}
