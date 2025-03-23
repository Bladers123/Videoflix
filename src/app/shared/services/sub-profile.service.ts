import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { SubProfile } from "../interfaces/sub-profile.interace";

@Injectable({
  providedIn: 'root'
})


export class SubProfileService {

  constructor(private restClientService: RestClientService) { }


  addSubProfile(data: SubProfile): Observable<any> {
    return this.restClientService.postSubProfile(data).pipe(
      map((response: any) => {
        if (response)          
          return response;
      }),
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
      })
    )
  }

  getSubProfilesByProfileId(id: string): Observable<SubProfile[]> {
    return this.restClientService.getSubProfilesByProfileId(id).pipe(
      map((response: any) => {
        if (response)
          return response;
      }),
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
      })
    );
  }

  updateSubProfile(subProfile: SubProfile): Observable<any> {
    return this.restClientService.putSubProfile(subProfile).pipe(
      map((response: any) => {
        if (response)
          return response;
      }),
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
      })
    );
  }

  deleteSubProfile(subProfile: SubProfile){
    return this.restClientService.deleteSubProfile(subProfile).pipe(
      map((response: any) => {
        if (response)
          return response;
      }),
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
      })
    );
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