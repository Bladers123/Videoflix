import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-video',
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],

})



export class VideoComponent {

  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @Output() close = new EventEmitter<void>();
  @Input() title!: string;
  @Input() type!: string;

  isVideoLoaded = false;
  availableLevels: any[] = [];
  hls: Hls | null = null;

  constructor() { }

  onVideoClick(): void {
    const videoUrl = environment.BASE_URL + environment.ENDPOINT_VIDEO + this.type + '/' + this.title;
    if (!this.isVideoLoaded) {
      if (Hls.isSupported()) {
        this.hls = new Hls({ autoStartLoad: false });
        this.hls.loadSource(videoUrl);
        this.hls.attachMedia(this.videoPlayer.nativeElement);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          this.hls?.startLoad();
          // Sicherheitshalber prüfen, ob nativeElement existiert
          if (this.videoPlayer && this.videoPlayer.nativeElement) {
            this.videoPlayer.nativeElement.play();
          }
          // Speichern der verfügbaren Qualitätsstufen für die UI
          this.availableLevels = this.hls?.levels || [];
          console.log('Verfügbare Qualitätsstufen:', this.availableLevels);
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

  // Methode zum manuellen Wechseln der Qualitätsstufe
  changeQuality(selectedIndex: string): void {
    const index = parseInt(selectedIndex, 10);
    if (this.hls) {
      // -1 = Automatische Auswahl
      this.hls.currentLevel = index;
      console.log('Geänderte Qualitätsstufe auf:', index);
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
}
