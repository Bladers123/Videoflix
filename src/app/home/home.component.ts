import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";
import { SubProfileService } from '../shared/services/sub-profile.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import Hls from 'hls.js';
import { VideoComponent } from "../video/video.component";



@Component({
  selector: 'app-home',
  imports: [NavbarComponent, VideoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})


export class HomeComponent implements OnInit {

  constructor(private authService: AuthService, private subProfileService: SubProfileService, private router: Router) { }

  ngOnInit(): void {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        this.loadBoard();
      }
    });
  }

  loadBoard() {

  }


}



