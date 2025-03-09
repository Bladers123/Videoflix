// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RestClientService } from '../rest-client/rest-client.service'; 

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl: string = 'http://127.0.0.1:8000/api/auth/';
  private endpointRegistration: string = 'registration/'; 

  constructor(private restClient: RestClientService) {}

  register(username: string, password: string): Observable<any> {
    const url:string = this.baseUrl + this.endpointRegistration;
    const body = { username, password };
    return this.restClient.register(url, body);
  }
}
