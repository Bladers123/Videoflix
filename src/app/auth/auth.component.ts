// auth.component.ts
import { Component, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../shared/services/auth.service';
import { finalize } from 'rxjs/operators';
import { UserRegistration  } from '../shared/interfaces/register.interface';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';



@Component({
  selector: 'app-auth',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, CheckboxModule, RegistrationDialogComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent {
  // Bindings für die Eingabefelder
  @ViewChild(RegistrationDialogComponent) registrationDialog!: RegistrationDialogComponent;

  email: string = '';
  password: string = '';
  
  data: UserRegistration  = {
    email: 'triewrewrsdfdsfstan@tristan.de',
    username: 'tristwsssserwrewrweran',
    password: 'Test1234!',
    repeated_password: 'Test1234!'
  };



  // Fehlertext für die Anzeige von Login-Fehlern
  errorMessage: string = '';

  // Optional: Statusindikator, ob gerade eingeloggt wird
  isLoading: boolean = false;

  constructor(private authService: AuthService) { }


  openRegistrationDialog() {
    this.registrationDialog.openDialog();
  }


speaterRegistrierung(){
  this.isLoading = true;
    this.errorMessage = '';

    // Aufruf des Authentifizierungsservices
    this.authService.register(this.data)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          // Login erfolgreich – hier kannst du z. B. Navigation, Token-Speicherung etc. durchführen.
          console.log('Login erfolgreich:', response);
        },
        error: (err) => {
          // Fehlerbehandlung
          console.error('Login-Fehler:', err);
          this.errorMessage = 'Fehler beim Einloggen. Bitte überprüfen Sie Ihre Eingaben.';
        }
      });
}





  login(): void {
    // Logik für die Login-Funktion
     // Prüfen, ob beide Felder ausgefüllt sind
     if (false) {
      this.errorMessage = 'Bitte E-Mail und Passwort eingeben.';
      return;
    }
  }
}
