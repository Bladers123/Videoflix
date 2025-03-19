import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { SubProfile } from "../interfaces/sub-profile.interace";

@Injectable({
  providedIn: 'root'
})


export class SubProfileService {

  constructor(private restClientService: RestClientService) { }


  createSubProfile(data: any): Observable<any> {
    return this.restClientService.postSubProfile(data);
  }

  getSubProfileData(): Observable<SubProfile[]> {
    return this.restClientService.getSubProfile().pipe(
      map((response: any) => {
        if (response)
          return response; 
      }),
      catchError(err => {
        return throwError(() => new Error('Fehler beim Abrufen der Subprofile.'));
      })
    );
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