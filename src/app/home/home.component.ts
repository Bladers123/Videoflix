import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { VideoComponent } from "../video/video.component";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { VideoService } from '../shared/services/video.service';
import { Video } from '../shared/interfaces/video.interface';
import { LocalStorageService } from '../shared/services/local-storage.service';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, VideoComponent, CommonModule, CarouselModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  isVideoVisible: boolean = false;
  responsiveOptions: any[] | undefined;
  currentSubProfileId: string = '';
  selectedVideoFavorited = false;  


  videos: Video[] = [];
  movies: Video[] = [];
  clips: Video[] = [];
  favoriteVideos: Video[] = [];
  selectedVideo!: Video;

  constructor(private authService: AuthService, private videoService: VideoService, private localStorageService: LocalStorageService) { }


  ngOnInit(): void {
    const currentSubProfileId = this.localStorageService.getItem<string>('currentSubProfil');
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified && currentSubProfileId) {
        this.currentSubProfileId = currentSubProfileId;
        this.initVideos();
        this.initResponsiveOptions();
      }
    });
  }

  initVideos() {
    this.videoService.getVideos()
      .subscribe((videos: Video[]) => {
        this.videos = videos;
        this.movies = videos.filter(v => v.video_type === 'movie');
        this.clips = videos.filter(v => v.video_type === 'clip');
        this.initFavorites();
      });
  }


  initResponsiveOptions() {
    this.responsiveOptions = [
      { breakpoint: '1400px', numVisible: 4, numScroll: 2 },
      { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
      { breakpoint: '767px', numVisible: 2, numScroll: 1 },
      { breakpoint: '575px', numVisible: 1, numScroll: 1 }
    ];
  }

  capitalizeTitle(title: string): string {
    const replaced = title.replace(/-/g, ' ');
    return replaced.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }


  onPoster(video: Video) {
    this.selectedVideo = video;
    this.selectedVideoFavorited = this.favoriteVideos.some(v => v.id === video.id);
    this.isVideoVisible = true;
  }

  onClosePoster() {
    this.isVideoVisible = false;
  }

  initFavorites() {
    this.videoService.getFavoriteVideosBySubProfileId(this.currentSubProfileId).subscribe((favoriteIds: string[]) => {
      this.favoriteVideos = this.videos.filter(video => favoriteIds.includes(video.id))
    });
  }

  onFavoriteToggled(event: { videoId: number; favorited: boolean }) {
    this.initFavorites();
  }

}
