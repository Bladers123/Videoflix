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

  // URL des HLS-Streams
  videoUrl = 'http://127.0.0.1:8000/api/video/index.m3u8';
  // Flag, um zu verhindern, dass der Stream mehrfach geladen wird
  isVideoLoaded = false;

  // Innere, statische Klasse als CustomLoader
  private static CustomLoader = class extends Hls.DefaultConfig.loader {
    override load(context: any, config: any, callbacks: any): void {
      // Falls die URL fälschlicherweise den "index.m3u8/"-Pfad enthält, entfernen
      if (context.url.includes("index.m3u8/")) {
        context.url = context.url.replace("index.m3u8/", "");
      }
      super.load(context, config, callbacks);
    }
  };

  constructor() { }

  // Diese Methode wird beim Klick auf das Video aufgerufen
  onVideoClick(): void {
    if (!this.isVideoLoaded) {
      if (Hls.isSupported()) {
        const hls = new Hls({
          autoStartLoad: false, // Stream wird erst beim Klick geladen
          loader: VideoComponent.CustomLoader // Verwendung des inneren CustomLoaders
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
