import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-profile-selection',
  imports: [],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss'
})
export class ProfileSelectionComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.verifyUser();
  }





}












