import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Video } from "../interfaces/video.interface";


@Injectable({
  providedIn: 'root'
})


export class VideoService {

  constructor(private restClientService: RestClientService) { }


  toggleFavoriteVideo(subprofileId: string, videoId: number): Observable<any> {
    return this.restClientService.postToggleFavoriteVideo(subprofileId, videoId).pipe(
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
      })
    );
  }

  getVideos(): Observable<Video[]> {
    return this.restClientService.getVideos().pipe(
      map((response: Video[]) => response || []),
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
      })
    );
  }

  getFavoriteVideosBySubProfileId(currentSubProfileId: string): Observable<any>{
    return this.restClientService.getFavoriteVideosBySubProfileId(currentSubProfileId).pipe(
      catchError(err => {
        const errorMessages = this.extractErrorMessages(err.error);
        return throwError(() => new Error(errorMessages));
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