// auth.component.ts
import { Component } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../shared/services/auth.service';
import { finalize } from 'rxjs/operators';



@Component({
  selector: 'app-auth',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, CheckboxModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent {
  // Bindings für die Eingabefelder
  email: string = 'tristan@tristan.de'; // E-Mail-Adresse
  password: string = 'Test1234!'; // Passwort

  // Fehlertext für die Anzeige von Login-Fehlern
  errorMessage: string = '';

  // Optional: Statusindikator, ob gerade eingeloggt wird
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  register(): void {
    // Prüfen, ob beide Felder ausgefüllt sind
    if (!this.email || !this.password) {
      this.errorMessage = 'Bitte E-Mail und Passwort eingeben.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Aufruf des Authentifizierungsservices
    this.authService.register(this.email, this.password )
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
}
