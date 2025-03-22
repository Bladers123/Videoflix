import { Component, EventEmitter, Output, viewChild, ViewChild } from '@angular/core';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { SubProfileService } from '../../shared/services/sub-profile.service';
import { ProfileService } from '../../shared/services/profile.service';
import { SubProfile } from '../../shared/interfaces/sub-profile.interace';
import { Profile } from '../../shared/interfaces/profile.interface';



@Component({
  selector: 'app-add-sub-profile-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './add-sub-profile-dialog.component.html',
  styleUrl: './add-sub-profile-dialog.component.scss'
})


export class AddSubProfileDialogComponent {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @Output() close = new EventEmitter<void>();
  @Output() subProfileAdded = new EventEmitter<void>();


  isSending: boolean = false;
  name: string = '';
  currentProfile: Profile | null = null;


  constructor(private subProfileService: SubProfileService, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.profile$.subscribe(profile => {
      this.currentProfile = profile;
    });
  }


  addSubProfile() {   
    const profileId = this.currentProfile?.id;
    if (this.name !== '' && profileId) {
      const data: SubProfile = { name: this.name, profile: profileId };
      this.isSending = true;
      this.subProfileService.addSubProfile(data).subscribe({
        next: async (response) => {
          this.subProfileAdded.emit();
          await this.toastComponent.showCreateSubProfileSuccessfully(response.message);
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
