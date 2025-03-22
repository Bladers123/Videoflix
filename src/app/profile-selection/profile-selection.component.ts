// profile-Selection.component
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';
import { SubProfile } from '../shared/interfaces/sub-profile.interace';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { SubProfileService } from '../shared/services/sub-profile.service';
import { AddSubProfileDialogComponent } from "./add-sub-profile-dialog/add-sub-profile-dialog.component";
import { ManageSubProfileDialogComponent } from "./manage-sub-profile-dialog/manage-sub-profile-dialog.component";
import { Profile } from '../shared/interfaces/profile.interface';
import { filter, take } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile-selection',
  imports: [FormsModule, CommonModule, AddSubProfileDialogComponent, ManageSubProfileDialogComponent],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss'
})


export class ProfileSelectionComponent implements OnInit {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;


  addSubProfileDialogVisible: boolean = false;
  manageSubProfileDialogVisible: boolean = false;


  subProfiles: SubProfile[] = [];

  profile: Profile = {
    id: '',
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  };

  constructor(private authService: AuthService, private profileService: ProfileService, private subProfileService: SubProfileService, private router: Router) { }

  ngOnInit() {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        this.loadProfile();
        this.loadSubProfiles();
      }
    });
  }


  loadProfile() {
    const user = this.authService.user;
    if (user) {
      this.profileService.getProfileById(user.profile)
        .pipe(take(1))
        .subscribe({
          next: (profile: Profile | null) => {
            if (profile) {
              this.profile = profile;
            }
          },
          error: err => {
            this.toastComponent.showLoginError(err);
          }
        });
    }
  }

  loadSubProfiles() {
    this.subProfileService.getSubProfileData().subscribe({
      next: (subProfiles: SubProfile[]) => {
        this.subProfiles = subProfiles;
      },
      error: err => {
        this.toastComponent.showLoginError(err);
      }
    });
  }

  onSubProfileAdded() {
    this.loadProfile();
    this.loadSubProfiles();
  }

  onSubProfileChanged() {
    this.loadProfile();
    this.loadSubProfiles();
  }

  openAddSubProfileDialog() {
    this.addSubProfileDialogVisible = true;
  }

  closeAddSubProfileDialog() {
    this.addSubProfileDialogVisible = false;
  }

  openManageSubProfileDialog() {
    this.manageSubProfileDialogVisible = true;
  }

  closeManageSubProfileDialog() {
    this.manageSubProfileDialogVisible = false;
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}












