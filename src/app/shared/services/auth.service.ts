// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RestClientService } from '../rest-client/rest-client.service';
import { UserRegistration } from '../interfaces/register.interface';
import { map, catchError } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl: string = 'http://127.0.0.1:8000/api/auth/';
  private endpointRegistration: string = 'registration/';


  constructor(private restClient: RestClientService) { }


  createUserAccount(data: UserRegistration): Observable<any> {
    const url: string = this.baseUrl + this.endpointRegistration;
    return this.restClient.postRegistrationData(url, data).pipe(
      map(response => {
        console.log(response.data);
        
        if (response.successfully) {
          return 'Registrierung erfolgreich.';
        } else {
          return 'Registrierung fehlgeschlagen.';
        }
      }),
      catchError(err => {
        let errorMsg = 'Registrierung fehlgeschlagen.';
        if (err.error) {
          errorMsg = this.extractErrorMessages(err.error);
        }
        return throwError(errorMsg);
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
