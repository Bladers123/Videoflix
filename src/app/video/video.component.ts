import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';
import { VideoService } from '../shared/services/video.service';
import { AuthService } from '../shared/services/auth.service';
import { SubProfileService } from '../shared/services/sub-profile.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Video } from '../shared/interfaces/video.interface';




@Component({
  selector: 'app-video',
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],

})



export class VideoComponent {

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @Output() close = new EventEmitter<void>();
  @Input() video!: Video;

  isVideoLoaded = false;
  availableLevels: any[] = [];
  hls: Hls | null = null;

  constructor(private videoService: VideoService, private localStorageService: LocalStorageService) { }

  onVideoClick(): void {
    const videoUrl = environment.BASE_URL + environment.ENDPOINT_VIDEO + this.video.video_type + '/' + this.video.title;
    if (!this.isVideoLoaded) {
      if (Hls.isSupported()) {
        this.hls = new Hls({ autoStartLoad: false });
        this.hls.loadSource(videoUrl);
        this.hls.attachMedia(this.videoPlayer.nativeElement);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.hls?.startLoad();
          if (this.videoPlayer && this.videoPlayer.nativeElement) {
            this.videoPlayer.nativeElement.play();
          }
          this.availableLevels = this.hls?.levels || [];
        });
      } else if (this.videoPlayer.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
        this.videoPlayer.nativeElement.src = videoUrl;
        this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
          this.videoPlayer.nativeElement.play();
        });
      }
      this.isVideoLoaded = true;
    }
  }

  changeQuality(selectedIndex: string): void {
    const index = parseInt(selectedIndex, 10);
    if (this.hls) {
      this.hls.currentLevel = index;
    }
  }

  capitalizeTitle(title: string): string {
    const replaced = title.replace(/-/g, ' ');
    return replaced
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  closeDialog(): void {
    this.close.emit();
  }

  onFavourite() {
    const currentSubProfileId = this.localStorageService.getItem('currentSubProfil');
    console.log("Sub Profil: ", currentSubProfileId);


    // this.videoService.addFavoriteVideo(currentSubProfileId, this.title).subscribe((response: any) => {
    //   console.log(response);
    // });
  }
}
