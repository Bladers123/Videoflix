// rest-client.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistration } from '../interfaces/register.interface';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../interfaces/login.interface';
import { RequestRecoverPassword } from '../interfaces/request-recovery-password.interface';



@Injectable({
  providedIn: 'root'
})


export class RestClientService {

  constructor(private httpClient: HttpClient) { }



  postRegistrationData(data: UserRegistration): Observable<any> {
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_REGISTRATION, data);
  }

  postLoginData(data: UserLogin): Observable<any> {
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_LOGIN, data);
  }

  postRecoveryPasswordData(data: RequestRecoverPassword): Observable<any> {    
     return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_RECOVERY_PASSWORD, data);
  }

  getVerifyUserByToken(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + token
    });
    return this.httpClient.get(environment.BASE_URL + 'auth/verify/', { headers });
  }
  

}
