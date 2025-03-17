import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Profile } from "../interfaces/profile.interface";

@Injectable({
    providedIn: 'root'
})


export class ProfileService {
    constructor(private restClientService: RestClientService) { }


    getProfileData(): Observable<any> {
        return this.restClientService.getProfile().pipe(
              map(response => {
                if (response.successfully)
                  return response;
                else
                  return 'Registrierung fehlgeschlagen.';
              }),
              catchError(err => {
                let errorMsg = 'Registrierung fehlgeschlagen.';
                if (err.error)
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
    
      createSubProfile(data: any): Observable<any> {
        return this.restClientService.postSubProfile(data);
      }
    
      getSubProfileData(): Observable<any> {
        return this.restClientService.getSubProfile();
      }
    
      deleteSubProfile(subProfileId: string): Observable<any> {
        return this.restClientService.postSubProfile(subProfileId);
      }
    
      updateSubProfile(subProfileId: string, data: any): Observable<any> {
        return this.restClientService.putSubProfile(subProfileId, data);
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