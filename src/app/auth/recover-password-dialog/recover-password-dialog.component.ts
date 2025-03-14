import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';




@Component({
  selector: 'app-recover-password-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './recover-password-dialog.component.html',
  styleUrl: './recover-password-dialog.component.scss'
})



export class RecoverPasswordDialogComponent {

  @Output() close = new EventEmitter<void>();

  email: string = '';


  constructor(private authService: AuthService) { }



  sendMail() {

  }


  closeDialog() {
    this.close.emit();
  }


}
