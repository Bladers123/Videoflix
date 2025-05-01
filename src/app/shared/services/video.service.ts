import { Injectable } from "@angular/core";
import { RestClientService } from "./rest-client.service";
import { catchError, map, Observable, throwError } from "rxjs";
import { Video } from "../interfaces/video.interface";
import { HttpHeaders } from "@angular/common/http";
import Hls, { Level as HlsLevel } from 'hls.js';


@Injectable({
  providedIn: 'root'
})


export class VideoService {

  private hlsInstance?: Hls;

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

  getFavoriteVideosBySubProfileId(currentSubProfileId: string): Observable<any> {
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

  playVideo(videoElement: HTMLVideoElement, videoType: string, title: string): Promise<{ hls?: Hls; levels: HlsLevel[] }> {
    const { url, headers } = this.restClientService.getVideoUrlAndHeader(videoType, title);

    if (Hls.isSupported()) {
      return this.playWithHls(videoElement, url, headers);
    }

    if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      return this.playWithFallback(videoElement, url, headers);
    }

    return Promise.reject('Browser unterstützt kein HLS');
  }

  private playWithHls(videoElement: HTMLVideoElement, url: string, headers: HttpHeaders): Promise<{ hls: Hls; levels: HlsLevel[] }> {
    this.hlsInstance = new Hls({
      autoStartLoad: false,
      xhrSetup: (xhr: XMLHttpRequest) => this.injectHeaders(xhr, headers)
    });

    this.hlsInstance.attachMedia(videoElement);
    this.hlsInstance.loadSource(url);

    return new Promise((resolve, reject) => {
      this.hlsInstance!.on(Hls.Events.MANIFEST_PARSED, () => {
        this.hlsInstance!.startLoad();
        videoElement.play().then(() => resolve({ hls: this.hlsInstance!, levels: this.hlsInstance!.levels as HlsLevel[] })).catch(reject);
      });
      this.hlsInstance!.on(Hls.Events.ERROR, (_evt, data) => reject(data));
    });
  }

  private playWithFallback(videoElement: HTMLVideoElement, url: string, headers: HttpHeaders): Promise<{ hls?: Hls; levels: HlsLevel[] }> {
    return fetch(url, { headers: this.toPlain(headers) })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.blob();
      }).then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        videoElement.src = blobUrl;
        return new Promise<{ hls?: Hls; levels: HlsLevel[] }>(resolve => {
          videoElement.addEventListener('loadedmetadata', () => {
              videoElement.play();
              resolve({ hls: this.hlsInstance, levels: [] });
            },
            { once: true }
          );
        });
      });
  }

  private toPlain(headers: HttpHeaders): Record<string, string> {
    const obj: Record<string, string> = {};
    headers.keys().forEach(key => {
      const value = headers.get(key);
      if (value) obj[key] = value;
    });
    return obj;
  }

  private injectHeaders(xhr: XMLHttpRequest, headers: HttpHeaders): void {
    headers.keys().forEach(key => {
      const value = headers.get(key);
      if (value) xhr.setRequestHeader(key, value);
    });
  }

  destroy(): void {
    this.hlsInstance?.destroy();
    this.hlsInstance = undefined;
  }






}