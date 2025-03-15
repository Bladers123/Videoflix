// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { RestClientService } from './rest-client.service';
import { UserRegistration } from '../interfaces/register.interface';
import { map, catchError } from 'rxjs/operators';
import { UserLogin } from '../interfaces/login.interface';
import { RequestRecoverPassword } from '../interfaces/request-recovery-password.interface';
import { LocalStorageService } from './local-storage.service';



@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private restClient: RestClientService, private localStorageService: LocalStorageService) { }


  createUserAccount(data: UserRegistration): Observable<any> {
    return this.restClient.postRegistrationData(data).pipe(
      map(response => {
        if (response.successfully)
          return response.message;
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

  loginUser(data: UserLogin): Observable<any> {
    return this.restClient.postLoginData(data).pipe(
      map(response => {
        if (response.successfully) {
          this.localStorageService.setItem('user', response);
          return response.message;
        }
        else
          return 'Login fehlgeschlagen.';
      }),
      catchError(err => {
        let errorMsg = 'Login fehlgeschlagen.';
        if (err.error)
          errorMsg = this.extractErrorMessages(err.error);

        return throwError(errorMsg);
      })
    );
  }


  requestRecoverPassword(data: RequestRecoverPassword) {
    return this.restClient.postRecoveryPasswordData(data).pipe(
      map(response => {
        if (response.successfully)
          return response.message;
        else
          return 'E-Mail konnte nicht gesendet werden.';
      }),
      catchError(err => {
        let errorMsg = 'E-Mail konnte nicht gesendet werden.';
        if (err.error)
          errorMsg = this.extractErrorMessages(err.error);
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


async saveDataInLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}




}
