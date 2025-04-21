import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { VideoComponent } from "../video/video.component";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { VideoService } from '../shared/services/video.service';
import { Video } from '../shared/interfaces/video.interface';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, VideoComponent, CommonModule, CarouselModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  isVideoVisible: boolean = false;
  movieTitles: string[] = [];
  clipTitles: string[] = [];
  responsiveOptions: any[] | undefined;
  // selectedTitle: string = '';
  //  videoType: string = '';
  favoriteTitles: string[] = [];

  videos: Video[] = [];
// statt movieTitles/clipTitles
movies: Video[] = [];
clips: Video[]  = [];
// selectedVideo statt selectedTitle + videoType
selectedVideo!: Video;

  constructor(
    private authService: AuthService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        // this.initFavorites();
        this.initVideos();
        this.initResponsiveOptions();
      }
    });
  }



  initVideos() {
    this.videoService.getVideos()
      .subscribe((videos: Video[]) => {
        this.videos = videos;
        console.log(videos);
      this.movies = videos.filter(v => v.video_type === 'movie');
      this.clips  = videos.filter(v => v.video_type === 'clip');
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
    this.isVideoVisible = true;
  }

  onClosePoster() {
    this.isVideoVisible = false;
  }

  // initFavorites() {
  //   // Falls dein GET-Aufruf über getFavoriteVideos() implementiert ist:
  //   this.videoService.getFavoriteVideos(this.currentSubProfileId).subscribe((response: any) => {
  //     // Angenommen, response ist ein Array von Videos, extrahiere die Titel:
  //     this.favoriteTitles = response.map((video: any) => video.title);
  //   });
  // }


}
