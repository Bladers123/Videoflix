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
import { Profile } from '../interfaces/profile.interface';



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

  getUser(): Observable<any>{
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_USER, { headers });
  }

  getProfileById(id: string): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_PROFILE + id, { headers });
  }

  getSubProfilesByProfileId(id: string): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + environment.QUERY_PARAM_PROFILE + id, { headers });
  }

  getSubProfileById(id: string): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + environment.QUERY_PARAM_ID + id, { headers });
  }

  postSubProfile(subProfile: SubProfile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.post(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE, subProfile, { headers });
  }

  putSubProfile(subProfile: SubProfile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.put(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + subProfile.id + '/', subProfile, { headers });
  }

  deleteSubProfile(subProfile: SubProfile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.delete(environment.BASE_URL + environment.ENDPOINT_SUBPROFILE + subProfile.id + '/', { headers });
  }

  putProfile(profile: Profile): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.put(environment.BASE_URL + environment.ENDPOINT_PROFILE + profile.id + '/', profile, { headers });
  }

  putProfileFormData(formData: FormData, id: string): Observable<any> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.patch(environment.BASE_URL + environment.ENDPOINT_PROFILE + id + '/', formData, { headers });
  }



  getVideoNames(): Observable<string[]> {
    const headers = this.getAuthorizationTokenHeader();
    return this.httpClient.get<string[]>(environment.BASE_URL + environment.ENDPOINT_VIDEONAME, { headers });
  }
  
}
