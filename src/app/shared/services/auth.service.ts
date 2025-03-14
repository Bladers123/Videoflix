// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RestClientService } from '../rest-client/rest-client.service';
import { UserRegistration } from '../interfaces/register.interface';
import { map, catchError } from 'rxjs/operators';
import { UserLogin } from '../interfaces/login.interface';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private restClient: RestClientService) { }


  createUserAccount(data: UserRegistration): Observable<any> {
    return this.restClient.postRegistrationData(data).pipe(
      map(response => {
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

loginUser(data: UserLogin): Observable<any> {
  return this.restClient.postLoginData(data).pipe(
    map(response => {
      if (response.successfully) {
        return 'Login erfolgreich.';
      } else {
        return 'Login fehlgeschlagen.';
      }
    }),
    catchError(err => {
      let errorMsg = 'Login fehlgeschlagen.';
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
