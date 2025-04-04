import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";


@Injectable({
  providedIn: 'root'
})


export class VideoService {

  constructor(private restClientService: RestClientService) { }


  getVideoNames(): Observable<string[]> {
    return this.restClientService.getVideoNames().pipe(
      map((response: string[]) => response || []),
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