import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { SubProfileService } from '../shared/services/sub-profile.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import Hls from 'hls.js';
import {CustomLoader} from '../shared/services/video-loader.service';





@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})




export class HomeComponent implements OnInit, AfterViewInit {
  
  @ViewChild('videoPlayer', { static: true }) videoPlayer!: ElementRef<HTMLVideoElement>;
  // Ersetze die URL durch die deines HLS-Streams
  videoUrl = 'http://127.0.0.1:8000/api/video/index.m3u8';

  constructor(private authService: AuthService, private subProfileService: SubProfileService, private router: Router) { }

  ngOnInit(): void {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        this.loadBoard();
      }
    });
  }


  ngAfterViewInit() {
    if (Hls.isSupported()) {
      const hls = new Hls({
        loader: CustomLoader  // unseren benutzerdefinierten Loader verwenden
      });
      hls.loadSource(this.videoUrl);
      hls.attachMedia(this.videoPlayer.nativeElement);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.videoPlayer.nativeElement.play();
      });
    } else if (this.videoPlayer.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
      // Fallback für Safari, der HLS nativ unterstützt
      this.videoPlayer.nativeElement.src = this.videoUrl;
      this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
        this.videoPlayer.nativeElement.play();
      });
    }
  }
  


  loadBoard() {

  }


}


  
