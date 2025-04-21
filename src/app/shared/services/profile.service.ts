import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from "rxjs";
import { Profile } from "../interfaces/profile.interface";
import { SubProfile } from "../interfaces/sub-profile.interace";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root',
})


export class ProfileService {

  private profileSubject = new BehaviorSubject<Profile | null>(null);
  profile$ = this.profileSubject.asObservable();


  constructor(private restClientService: RestClientService, private router: Router, private localStorageService: LocalStorageService) { }


  getProfileById(id: string): Observable<Profile | null> {
    return this.restClientService.getProfileById(id).pipe(
      tap(profile => this.profileSubject.next(profile)),
      catchError(err => {
        console.error('Fehler beim Laden des Profils', err);
        return throwError(err);
      })
    );
  }

  updateProfile(formData: FormData, id: string): Observable<any> {
    return this.restClientService.putProfileFormData(formData, id).pipe(
      tap(() => this.profileSubject.next(null)),
      catchError(err => {
        console.error('Fehler beim Aktualisieren des Profils', err);
        return throwError(err);
      })
    );
  }

  changeProfile() {
    this.localStorageService.removeItem('currentSubProfil');
    this.router.navigate(['/profile-selection']);
  }




  private extractErrorMessages(errorResponse: any): string {
    let errorMessages: string[] = [];
    for (const field in errorResponse) {
      if (errorResponse.hasOwnProperty(field)) {
        const fieldErrors = Array.isArray(errorResponse[field])
          ? errorResponse[field]
          : [errorResponse[field]];
        errorMessages.push(...fieldErrors);
      }
    }
    return errorMessages.join('\n');
  }
}