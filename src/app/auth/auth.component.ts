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


@Component({
  selector: 'app-auth',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, CheckboxModule, RegistrationDialogComponent, ToastComponent, RecoveryPasswordDialogComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent implements OnInit {

  @ViewChild(RegistrationDialogComponent) registrationDialog!: RegistrationDialogComponent;
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  registrationDialogVisible: boolean = false;
  recoverPasswordDialogVisible: boolean = false;

  isLogged: boolean = false;

  rememberUserData: any = {
    email: '',
    password: '',
    remember: false
  };


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loadRemeberDataFromLocalStorage();
  }


  loadRemeberDataFromLocalStorage() {
    const storedData = localStorage.getItem('rememberUserData');
    if (storedData)
      this.rememberUserData = JSON.parse(storedData);
  }

  saveRememberDataInLocalStorage(remeber: boolean) {
    this.rememberUserData.remember = remeber;
    if (this.rememberUserData.remember)
      localStorage.setItem('rememberUserData', JSON.stringify(this.rememberUserData));
    else
      localStorage.removeItem('rememberUserData');
  }


  openRegistrationDialog() {
    this.registrationDialogVisible = true;
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
      email: this.rememberUserData.email,
      password: this.rememberUserData.password,
    };

    this.isLogged = true;

    this.authService.loginUser(data).subscribe({
      next: async (message) => {
        await this.toastComponent.showLoginSuccessfully(message);
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













