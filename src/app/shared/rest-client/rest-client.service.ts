// rest-client.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})


export class RestClientService {

  constructor(private httpClient: HttpClient) { }

  postRegistrationData (url:string, body:any): Observable<any> {
    return this.httpClient.post(url, body);
  }
}
