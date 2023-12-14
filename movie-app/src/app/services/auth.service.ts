import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://movie-app-backend-cloud-nbdw6ogija-ew.a.run.app/api/auth';

  private isUserLoggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  private loggedInUser: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  isLoggedIn$: Observable<boolean> = this.isUserLoggedIn.asObservable();
  loggedInUser$: Observable<User | undefined> =
    this.loggedInUser.asObservable();

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      map((response: any) => {
        const user: User = 
        {
          UserId: response.userId,
          Username: response.username,
          Password: response.password,
          Email: response.email
        };

        localStorage.setItem('user', JSON.stringify(user));

        this.isUserLoggedIn.next(true);
        this.loggedInUser.next(user);
        return user;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user');

    this.isUserLoggedIn.next(false);
    this.loggedInUser.next(undefined);
  }
}
