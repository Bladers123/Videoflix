import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @Output() close = new EventEmitter<void>();
  @Input() title!: string;


  videoUrl = 'http://127.0.0.1:8000/api/video/';
  isVideoLoaded = false;


  constructor() { }

  onVideoClick(): void {
    const videoUrl = this.videoUrl + this.title;
    console.log(videoUrl);
    
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
