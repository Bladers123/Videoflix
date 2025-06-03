import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import Hls from 'hls.js';
import { CommonModule } from '@angular/common';
import { VideoService } from '../shared/services/video.service';
import { Video } from '../shared/interfaces/video.interface';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { RestClientService } from '../shared/services/rest-client.service';


@Component({
  selector: 'app-video',
  imports: [CommonModule, ToastComponent],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss'],

})


export class VideoComponent {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @Output() close = new EventEmitter<void>();
  @Input() video!: Video;
  @Input() currentSubProfileId: string = '';

  @Output() favoriteToggled = new EventEmitter<{ videoId: number; favorited: boolean }>();

  isLoadingFav = false;
  @Input() isFavorited = false;

  isVideoLoaded = false;
  availableLevels: any[] = [];
  hls?: Hls;

  constructor(private videoService: VideoService, private restclientService: RestClientService) { }

  onVideoClick(): void {
    if (this.isVideoLoaded)
      return;

    const baseName = this.getVideoFileName();

    this.videoService.playVideo(this.videoPlayer.nativeElement, this.video.video_type, baseName).then(({ hls, levels }) => {
      this.hls = hls;
      this.availableLevels = levels;
      this.isVideoLoaded = true;
    }).catch(err => this.toastComponent.showLoadingError(err));
  }

  private getVideoFileName(): string {
    const videoFile = this.video.video_file;

    if (!videoFile) {
      return '';
    }

    const fileName = videoFile;
    const lastSlash = fileName.lastIndexOf('/');
    const lastDot = fileName.lastIndexOf('.');
    if (lastSlash >= 0 && lastDot > lastSlash) {
      return fileName.substring(lastSlash + 1, lastDot);
    }

    return fileName;
  }

  changeQuality(selectedIndex: string): void {
    const index = parseInt(selectedIndex, 10);
    if (this.hls) {
      this.hls.currentLevel = index;
      this.toastComponent.showChangeQualitySuccessfully();
    }
    else
      this.toastComponent.showChangeQualityError();
  }



  capitalizeTitle(title: string): string {
    const replaced = title.replace(/-/g, ' ');
    return replaced.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  closeDialog(): void {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.videoService.destroy();
    this.close.emit();
  }

  onFavourite() {
    if (this.isLoadingFav)
      return;
    this.isLoadingFav = true;
    this.videoService.toggleFavoriteVideo(this.currentSubProfileId, parseInt(this.video.id)).subscribe({
      next: res => {
        this.isFavorited = res.favorited;
        this.favoriteToggled.emit({ videoId: res.video_id, favorited: res.favorited });
        this.isLoadingFav = false;
      },
      error: () => {
        this.isLoadingFav = false;
      }
    });
  }
}
