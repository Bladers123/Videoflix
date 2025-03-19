import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Profile } from "../interfaces/profile.interface";
import { SubProfile } from "../interfaces/sub-profile.interace";

@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  constructor(private restClientService: RestClientService) { }


  getProfileData(): Observable<any> {
    return this.restClientService.getProfile().pipe(
      map(response => {
        if (response)
          return response;
      }),
      catchError(err => {
        let errorMsg = '';
        errorMsg = this.extractErrorMessages(err.error);
        return throwError(errorMsg);
      })
    );
  }

  deleteProfile(): Observable<any> {
    return this.restClientService.postProfile();
  }

  updateProfile(data: any): Observable<any> {
    return this.restClientService.putProfile(data);
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