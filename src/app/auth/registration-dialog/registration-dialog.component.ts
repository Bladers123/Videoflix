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

    this.authService.createUserAccount(data).subscribe({
      next: async (message) => {
        this.isRegistered = true;
        await this.toastComponent.showRegisterSuccessfully(message);
        this.closeDialog();
      },
      error: async (error) => {
        this.isRegistered = true;
        setTimeout(() => {
          this.isRegistered = false;
        }, 2000);
        await this.toastComponent.showRegisterError(error);
      }
    });

  }

  closeDialog() {
    this.close.emit();
  }


}
