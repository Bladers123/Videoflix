import { Component, EventEmitter, Output, viewChild, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { SubProfileService } from '../../shared/services/sub-profile.service';



@Component({
  selector: 'app-add-sub-profile-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './add-sub-profile-dialog.component.html',
  styleUrl: './add-sub-profile-dialog.component.scss'
})
export class AddSubProfileDialogComponent {
 @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @Output() close = new EventEmitter<void>();

  isSending: boolean = false;


  name: string = '';



  constructor(private subProfileService: SubProfileService) { }



  createSubProfile() {
    if (this.name !== '') {
      this.isSending = true;
      this.subProfileService.createSubProfile(this.name).subscribe({
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
