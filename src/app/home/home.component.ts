import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { VideoPosterComponent } from '../video-poster/video-poster.component';
import { VideoComponent } from "../video/video.component";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { VideoService } from '../shared/services/video.service';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, VideoPosterComponent, VideoComponent, CommonModule, CarouselModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  isVideoVisible: boolean = false;
  videoTitles: string[] = [];
  responsiveOptions: any[] | undefined;
  selectedTitle: string = '';


  constructor(
    private authService: AuthService,
    private videoService: VideoService
  ) { }

  ngOnInit(): void {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        this.initVideoNames();
        this.initResponsiveOptions();
      }
    });
  }

  initVideoNames() {
    this.videoService.getVideoNames().subscribe((response: any) => {
      this.videoTitles = response.video_names;
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
  

  onPoster(title: string) {
    this.selectedTitle = title;
    this.isVideoVisible = true;
  }

  onClosePoster() {
    this.isVideoVisible = false;
  }
}
