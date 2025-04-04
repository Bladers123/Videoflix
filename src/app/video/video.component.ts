import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import Hls from 'hls.js';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @Output() close = new EventEmitter<void>();


  videoName: string = "autofahrt";

  // URL des HLS-Streams
  videoUrl = 'http://127.0.0.1:8000/api/video/' + this.videoName;
  // Flag, um zu verhindern, dass der Stream mehrfach geladen wird
  isVideoLoaded = false;


  constructor() { }

  // Diese Methode wird beim Klick auf das Video aufgerufen
  onVideoClick(): void {
    console.log(this.videoUrl);

    if (!this.isVideoLoaded) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: false, 
        });
        hls.loadSource(this.videoUrl);
        hls.attachMedia(this.videoPlayer.nativeElement);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          hls.startLoad(); // Startet das Laden des Streams
          this.videoPlayer.nativeElement.play();
        });
      } else if (this.videoPlayer.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Fallback für Browser wie Safari, die HLS nativ unterstützen
        this.videoPlayer.nativeElement.src = this.videoUrl;
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
