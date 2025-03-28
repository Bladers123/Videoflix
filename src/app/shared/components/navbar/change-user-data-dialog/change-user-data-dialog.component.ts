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
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-change-user-data-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent, FileUploadModule],
  templateUrl: './change-user-data-dialog.component.html',
  styleUrl: './change-user-data-dialog.component.scss'
})


export class ChangeUserDataDialogComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  imageSrc: string = '';
  confirmPassword: string = '';
  selectedFile: File | null = null;


  profile: Profile = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    img: '',
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
              this.imageSrc = profile.img || 'img/blank-profile.png';
            }
          },
          error: err => {
            this.toastComponent.showLoginError(err);
          }
        });
    }
  }

  onSelectImage(event: any) {
    if (event.files && event.files.length > 0) {
      const file: File = event.files[0];
      this.selectedFile = file; // Datei speichern
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageSrc = e.target.result; // Vorschau als Base64-String
      };

      reader.readAsDataURL(file);
    }
  }

  onAdoptChanges() {
    if (this.validateInputs()) {
      const formData = new FormData();
      // ID nicht anhängen, da diese in der URL enthalten ist
      formData.append('username', this.profile.username);
      formData.append('first_name', this.profile.first_name);
      formData.append('last_name', this.profile.last_name);
      formData.append('email', this.profile.email);
      formData.append('password', this.profile.password);
      formData.append('address', this.profile.address);
      formData.append('phone', this.profile.phone);
      if (this.selectedFile) {
        formData.append('img', this.selectedFile, this.selectedFile.name);
      }
      
      // updateProfile erwartet jetzt FormData sowie die Profil-ID
      this.profileService.updateProfile(formData, this.profile.id).subscribe({
        next: (response) => {
          this.authService.loadUserFromDB().subscribe(message => {
            this.toastComponent.showAdoptProfileSuccessfully(response.message);
          });
          this.closeDialog();
        },
        error: err => {
          this.toastComponent.showAdoptProfileError(err);
        }
      });
    }
  }
  
  

  validateInputs(): boolean {
    // Sicherstellen, dass undefinierte Werte in leere Strings umgewandelt werden, um Fehler zu vermeiden.
    const password: string = this.profile.password || '';
    const confirmPassword: string = this.confirmPassword || '';
    const email: string = this.profile.email || '';
    const phone: string = this.profile.phone || '';
    const address: string = this.profile.address || '';
    const firstName: string = this.profile.first_name || '';
    const lastName: string = this.profile.last_name || '';
    const username: string = this.profile.username || '';
  
    // Überprüfung, ob die Passwörter übereinstimmen.
    if (password !== confirmPassword) {
      this.toastComponent.showAdoptProfileError('Passwörter stimmen nicht überein');
      return false;
    }
  
    // Überprüfung, ob das Passwort mindestens 8 Zeichen lang ist.
    if (password.length < 8 && password.length > 0) {
      this.toastComponent.showAdoptProfileError('Passwort muss mindestens 8 Zeichen lang sein');
      return false;
    }
  
    // Überprüfung der E-Mail-Adresse auf ein '@'-Zeichen.
    if (!email.includes('@')) {
      this.toastComponent.showAdoptProfileError('Ungültige E-Mail-Adresse');
      return false;
    }
  
    // Überprüfung der Telefonnummer (z. B. Mindestlänge 10 Zeichen)
    if (phone.length < 10) {
      this.toastComponent.showAdoptProfileError('Ungültige Telefonnummer');
      return false;
    }
  
    // Überprüfung der Adresse (Mindestlänge 5 Zeichen)
    if (address.length < 5) {
      this.toastComponent.showAdoptProfileError('Ungültige Adresse');
      return false;
    }
  
    // Überprüfung des Vornamens (Mindestlänge 2 Zeichen)
    if (firstName.length < 2) {
      this.toastComponent.showAdoptProfileError('Ungültiger Vorname');
      return false;
    }
  
    // Überprüfung des Nachnamens (Mindestlänge 2 Zeichen)
    if (lastName.length < 2) {
      this.toastComponent.showAdoptProfileError('Ungültiger Nachname');
      return false;
    }
  
    // Überprüfung des Benutzernamens (Mindestlänge 2 Zeichen)
    if (username.length < 2) {
      this.toastComponent.showAdoptProfileError('Ungültiger Benutzername');
      return false;
    }
  
    // Wenn alle Prüfungen erfolgreich waren, gebe true zurück.
    return true;
  }
  

  closeDialog() {
    this.close.emit();
  }
}
