// registration-dialog.component.ts
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { UserRegistration } from '../../shared/interfaces/register.interface';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-registration-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule],
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss'
})


export class RegistrationDialogComponent {
  @Output() close = new EventEmitter<void>();
  
  visible: boolean = false;

  data: UserRegistration = {
    email: 's@tristan.de',
    username: 'ss',
    password: 'Test1234!',
    repeated_password: 'Test1234!',
    first_name: 'd',
    last_name: 'f',
    address: 's',
    phone: 'ffff',
  };

  isLoading: boolean = false;

  password: string = '';
  email: string = '';
  username: string = '';
  repeatedPassword: string = '';
  first_name: string = '';
  last_name: string = '';
  address: string = '';
  phone: string = '';
  



  constructor(private authService: AuthService) { }

  register() {
    this.isLoading = true;

    // Aufruf des Authentifizierungsservices
    this.authService.register(this.data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          // Login erfolgreich – hier kannst du z. B. Navigation, Token-Speicherung etc. durchführen.
          console.log('registrierung erfolgreich:', response);
        },
        error: (err) => {
          // Fehlerbehandlung
          console.error('Login-Fehler:', err);
        }
      });
  }

  closeDialog() {
    this.visible = false;
    this.close.emit(); // Signalisiert der Elternkomponente, dass der Dialog geschlossen werden soll
  }
}
