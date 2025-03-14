// rest-client.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistration } from '../interfaces/register.interface';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})


export class RestClientService {

  constructor(private httpClient: HttpClient) { }

  postRegistrationData(data: UserRegistration): Observable<any> {
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_REGISTRATION, data);
  }
}
