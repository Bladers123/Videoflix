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
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';


@Component({
  selector: 'app-profile-selection',
  imports: [FormsModule, CommonModule, AddSubProfileDialogComponent, ManageSubProfileDialogComponent],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss'
})


export class ProfileSelectionComponent implements OnInit {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  subProfilePath: string | null = null;
  addSubProfileDialogVisible: boolean = false;
  manageSubProfileDialogVisible: boolean = false;


  subProfiles: SubProfile[] = [];

  profile: Profile = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  };

    colorPalette: string[] = [
    'bg-blue-700',
    'bg-red-600',
    'bg-purple-600',
    'bg-white',
  ];

  constructor(private authService: AuthService, private profileService: ProfileService, private subProfileService: SubProfileService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.authService.verifyUser().subscribe(isVerified => {
      if (isVerified) {
        this.loadProfile();
        this.loadSubProfiles();
      }
    });
  }

   getColor(index: number): string {
    return this.colorPalette[index % this.colorPalette.length];
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
    const user = this.authService.user;
    if (user) {
      this.subProfileService.getSubProfilesByProfileId(user.profile).subscribe({
        next: (subProfiles: SubProfile[]) => {
          this.subProfiles = subProfiles;
        },
        error: err => {
          this.toastComponent.showLoginError(err);
        }
      });
    }
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

  navigateToHome(id: string) {
    this.localStorageService.setItem('currentSubProfil', id);
    this.router.navigate(['/home', id]);
  }

}












