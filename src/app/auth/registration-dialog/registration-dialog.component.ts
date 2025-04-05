// registration-dialog.component.ts
import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { UserRegistration } from '../../shared/interfaces/register.interface';
import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';


@Component({
  selector: 'app-registration-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss',
})


export class RegistrationDialogComponent {

  @Output() close = new EventEmitter<void>();
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  isRegistered: boolean = false;

  password: string = '';
  email: string = '';
  username: string = '';
  repeatedPassword: string = '';
  first_name: string = '';
  last_name: string = '';
  address: string = '';
  phone: string = '';


  constructor(private authService: AuthService) { }

  registerUser() {
    const data: UserRegistration = {
      email: this.email,
      username: this.username,
      password: this.password,
      repeated_password: this.repeatedPassword,
      first_name: this.first_name,
      last_name: this.last_name,
      address: this.address,
      phone: this.phone,
    };

    if (this.validateInputs()) {
      this.isRegistered = true;
      this.authService.createUserAccount(data).subscribe({
        next: async (message) => {
          await this.toastComponent.showRegisterSuccessfully(message);
          this.closeDialog();
        },
        error: async (error) => {
          setTimeout(() => {
            this.isRegistered = false;
          }, 2000);
          await this.toastComponent.showRegisterError(error);
        }
      });
    }

  }

  validateInputs(): boolean {
    const password: string = this.password || '';
    const confirmPassword: string = this.repeatedPassword|| '';
    const email: string = this.email || '';
    const phone: string = this.phone || '';
    const address: string = this.address || '';
    const firstName: string = this.first_name || '';
    const lastName: string = this.last_name || '';
    const username: string = this.username || '';

    if (password !== confirmPassword) {
      this.toastComponent.showAdoptProfileError('Passwörter stimmen nicht überein.');
      return false;
    }

    if (password.length < 8 && password.length > 0) {
      this.toastComponent.showAdoptProfileError('Passwort muss mindestens 8 Zeichen lang sein.');
      return false;
    }

    if (!email.includes('@')) {
      this.toastComponent.showAdoptProfileError('Ungültige E-Mail-Adresse.');
      return false;
    }

    if (phone.length < 5) {
      this.toastComponent.showAdoptProfileError('Die Telefonnummer muss mindestens 5 Zahlen besitzen.');
      return false;
    }

    if (address.length < 5) {
      this.toastComponent.showAdoptProfileError('Die Adresse muss mindestens 5 Zeichen besitzen.');
      return false;
    }

    if (firstName.length < 2) {
      this.toastComponent.showAdoptProfileError('Der Vorname muss mindestens 2 Zeichen lang sein.');
      return false;
    }

    if (lastName.length < 2) {
      this.toastComponent.showAdoptProfileError('Der Nachname muss mindestens 2 Zeichen lang sein.');
      return false;
    }

    if (username.length < 2) {
      this.toastComponent.showAdoptProfileError('Der Benutzername muss mindestens 2 Zeichen lang sein.');
      return false;
    }

    return true;
  }


  closeDialog() {
    this.close.emit();
  }


}
