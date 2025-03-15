// auth.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../shared/services/auth.service';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { RecoveryPasswordDialogComponent } from './recover-password-dialog/recover-password-dialog.component';
import { Router } from '@angular/router';
import { LocalStorageService } from '../shared/services/local-storage.service';


@Component({
  selector: 'app-auth',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, CheckboxModule, RegistrationDialogComponent, ToastComponent, RecoveryPasswordDialogComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent {

  @ViewChild(RegistrationDialogComponent) registrationDialog!: RegistrationDialogComponent;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  registrationDialogVisible: boolean = false;
  recoverPasswordDialogVisible: boolean = false;

  isLogged: boolean = false;

  loggingData: any = {
    email: '',
    password: '',
  };


  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }


  openRegistrationDialog() {
    setTimeout(() => {
      this.registrationDialogVisible = true;
    });
  }

  closeRegistrationDialog() {
    this.registrationDialogVisible = false;
  }

  openRecoverPasswordDialog() {
    this.recoverPasswordDialogVisible = true;
  }

  closeRecoverPasswordDialog() {
    this.recoverPasswordDialogVisible = false;
  }


  login() {
    const data = {
      email: this.loggingData.email,
      password: this.loggingData.password,
    };
    this.isLogged = true;
    this.authService.loginUser(data).subscribe({
      next: async (message) => {
        await this.toastComponent.showLoginSuccessfully(message);
        this.router.navigate(['/profile-selection']);
      },
      error: async (error) => {
        setTimeout(() => {
          this.isLogged = false;
        }, 2000);
        await this.toastComponent.showLoginError(error);
      }
    });
  }
}













