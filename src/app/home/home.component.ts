import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { SubProfileService } from '../shared/services/sub-profile.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import Hls from 'hls.js';
import { VideoPosterComponent } from '../video-poster/video-poster.component';
import { VideoComponent } from "../video/video.component";
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-home',
  imports: [NavbarComponent, VideoPosterComponent, VideoComponent, CommonModule, CarouselModule, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {

  isVideoVisible: boolean = false;

  posters: any[] = [];

  responsiveOptions: any[] | undefined;
  

  constructor(private authService: AuthService, private subProfileService: SubProfileService, private router: Router) { }

  ngOnInit(): void {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        this.loadBoard();
        this.initPoster();
      }
    });
  }

  loadBoard() {
    
  }

  onPoster(poster: any){
    this.isVideoVisible = true;
  }

  onClosePoster(){
    this.isVideoVisible = false;
  }


  initPoster() {
    this.posters = Array.from({ length: 10 }); // z.B. 10 Poster – später ersetzt du das durch echte Daten

    this.responsiveOptions = [
      { breakpoint: '1400px', numVisible: 4, numScroll: 2 },
      { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
      { breakpoint: '767px', numVisible: 2, numScroll: 1 },
      { breakpoint: '575px', numVisible: 1, numScroll: 1 }
    ];
  }
}



