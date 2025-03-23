import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SubProfileService } from '../shared/services/sub-profile.service';

@Injectable({
  providedIn: 'root'
})
export class SubProfileGuard implements CanActivate {

  constructor(private subProfileService: SubProfileService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.paramMap.get('id');
    return this.subProfileService.getSubProfileById(id!).pipe(
      map((response: any) => {
        if (Array.isArray(response) && response.length === 0) {
          this.router.navigate(['/not-found']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    );
  }
}
