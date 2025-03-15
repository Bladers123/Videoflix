import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash-screen',
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss'
})


export class SplashScreenComponent {


  constructor(private router: Router) { }

  navigateToAuth() {
    this.router.navigate(['/auth']);
  }


}