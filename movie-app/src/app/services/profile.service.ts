import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  public getProfile(userId: string | undefined): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profiles/${userId}`).pipe(
      map((response: any) => {
        const profile: Profile = response.profile;
        return profile;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error retrieving profile:', error);
        return throwError(() => error);
      })
    );
  }

  public updateProfile(profile: Profile): Observable<Profile> {
    const profileId = profile.ProfileId;
    return this.http.post<Profile>(`${this.apiUrl}/profiles/${profileId}`, profile).pipe(
      map((response: any) => {
        const updatedProfile: Profile = response.profile;
        return updatedProfile;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error updating profile:', error);
        return throwError(() => error);
      })
    );
  }

  public deleteProfile(profileId: string | undefined): Observable<any> {
    return this.http.delete(`${this.apiUrl}/profiles/${profileId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Error deleting profile:', error);
        return throwError(() => error);
      })
    );
  }
}
