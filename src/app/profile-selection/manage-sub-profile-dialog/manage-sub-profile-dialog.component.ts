import { Component, EventEmitter, Output, viewChild, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';




@Component({
  selector: 'app-manage-sub-profile-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './manage-sub-profile-dialog.component.html',
  styleUrl: './manage-sub-profile-dialog.component.scss'
})


export class ManageSubProfileDialogComponent {
 @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @Output() close = new EventEmitter<void>();

  isSending: boolean = false;


  email: string = '';



  constructor(private authService: AuthService) { }



  requestRecoverPassword() {
    if (this.email !== '') {
      this.isSending = true;
      this.authService.requestRecoverPassword({ email: this.email }).subscribe({
        next: async (message) => {
          await this.toastComponent.showRequestRecoveryPasswordSuccessfully(message);
          this.closeDialog();
        },
        error: async (error) => {
          setTimeout(() => { 
            this.isSending = false;
          }, 2000);
          await this.toastComponent.showRequestRecoveryPasswordError(error);
        }
      });
    }
  }


  closeDialog() {
    this.close.emit();
  }

}
