import { AfterViewInit, Component, ElementRef, EventEmitter, input, Input, Output, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})


export class VideoComponent {

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @Output() close = new EventEmitter<void>();
  @Input() title!: string;
  @Input() type!: string;


  isVideoLoaded = false;


  constructor() { }

  onVideoClick(): void {
    const videoUrl = environment.BASE_URL + environment.ENDPOINT_VIDEO + this.type + '/' + this.title;
    if (!this.isVideoLoaded) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: false,
        });
        hls.loadSource(videoUrl);
        hls.attachMedia(this.videoPlayer.nativeElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          hls.startLoad();
          this.videoPlayer.nativeElement.play();
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

  closeDialog() {
    this.close.emit();
  }
}
