import { Component, EventEmitter, OnInit, Output, viewChild, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../services/profile.service';
import { AuthService } from '../../../services/auth.service';
import { Profile } from '../../../interfaces/profile.interface';
import { take } from 'rxjs';
import { ToastComponent } from '../../toast/toast.component';
import { LocalStorageService } from '../../../services/local-storage.service';


@Component({
  selector: 'app-change-user-data-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './change-user-data-dialog.component.html',
  styleUrl: './change-user-data-dialog.component.scss'
})


export class ChangeUserDataDialogComponent implements OnInit {


  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  confirmPassword: string = '';

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


  constructor(private profileService: ProfileService, private authService: AuthService, localStorageService: LocalStorageService) { }

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
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

  onAdoptChanges() {
    if (this.validateInputs()) {
      this.profileService.updateProfile(this.profile).subscribe({
        next: (response) => {
          console.log(response);
          this.authService.loadUserFromDB().subscribe(message => {
            this.toastComponent.showAdoptProfileSuccessfully(message);
          });

          // this.closeDialog();
        },
        error: err => {
          this.toastComponent.showAdoptProfileError(err);
        }
      });
    }
  }

  validateInputs(): boolean {
    if (this.profile.password !== this.confirmPassword) {
      this.toastComponent.showAdoptProfileError('Passwörter stimmen nicht überein');
      return false;
    }
    else if (this.profile.password.length < 8) {
      this.toastComponent.showAdoptProfileError('Passwort muss mindestens 8 Zeichen lang sein');
      return false;
    }

    else if (!this.profile.email.includes('@')) {
      this.toastComponent.showAdoptProfileError('Ungültige E-Mail-Adresse');
      return false;
    }

    else if (this.profile.phone.length < 10) {
      this.toastComponent.showAdoptProfileError('Ungültige Telefonnummer');
      return false;
    }

    else if (this.profile.address.length < 5) {
      this.toastComponent.showAdoptProfileError('Ungültige Adresse');
      return false;
    }

    else if (this.profile.first_name.length < 2) {
      this.toastComponent.showAdoptProfileError('Ungültiger Vorname');
      return false;
    }

    else if (this.profile.last_name.length < 2) {
      this.toastComponent.showAdoptProfileError('Ungültiger Nachname');
      return false;
    }

    else if (this.profile.username.length < 2) {
      this.toastComponent.showAdoptProfileError('Ungültiger Benutzername');
      return false;
    }

    return true;
  }

  closeDialog() {
    this.close.emit();
  }
}
