import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-selection',
  imports: [],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss'
})
export class ProfileSelectionComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService, private router: Router) { }


  // anfrage mit token an server, und falls es einen user mit dem token gibt , darf die seite betreten werden
  ngOnInit(): void {
    const user: any = this.localStorageService.getItem('user');
    if (!user)
      this.router.navigate(['/auth']);
  }
}
