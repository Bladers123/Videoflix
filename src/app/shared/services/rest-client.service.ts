// rest-client.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRegistration } from '../interfaces/register.interface';
import { environment } from '../../../environments/environment';
import { UserLogin } from '../interfaces/login.interface';
import { RequestRecoverPassword } from '../interfaces/request-recovery-password.interface';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';
import { User } from '../interfaces/user.interface';
import { SubProfile } from '../interfaces/sub-profile.interace';



@Injectable({
  providedIn: 'root'
})


export class RestClientService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  private getAuthorizationTokenHeader(): HttpHeaders {
    const user: User | null = this.localStorage.getItem('user');
    if (user) {
      return new HttpHeaders({
        'Authorization': 'Token ' + user.token
      });
    }
    return new HttpHeaders();
  }



  postRegistrationData(data: UserRegistration): Observable<any> {
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_REGISTRATION, data);
  }

  postLoginData(data: UserLogin): Observable<any> {
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_LOGIN, data);
  }

  postRecoveryPasswordData(data: RequestRecoverPassword): Observable<any> {
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_RECOVERY_PASSWORD, data);
  }

  getVerifyUser(): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_VERIFY, { headers });
  }





  getProfileById(id: string): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_PROFILE + id, { headers });
  }

  getSubProfilesByProfileId(id: string): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();    
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + environment.QUERY_PARAM_SUBPROFILE + id, { headers });
  }

  postSubProfile(data: SubProfile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE, data, { headers });
  }

  putSubProfile(subProfile: SubProfile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.put(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + subProfile.id + '/', subProfile, { headers });
  }

  deleteSubProfile(subProfile: SubProfile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();    
    return this.httpClient.delete(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + subProfile.id + '/', { headers });
  }




  

  putProfile(data: any): Observable<any> {
    return this.httpClient.put(environment.BASE_URL + environment.ENDPOINT_PROFILE, data);
  }





}
