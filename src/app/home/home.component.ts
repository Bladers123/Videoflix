import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { NavbarComponent } from "../shared/components/navbar/navbar.component";





@Component({
  selector: 'app-home',
  imports: [NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})




export class HomeComponent implements OnInit {


  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        loadBoard();
      }
    });
  }



}
function loadBoard() {
}

