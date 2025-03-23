import { Component, EventEmitter, OnInit, Output, viewChild, ViewChild } from '@angular/core';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { IftaLabelModule } from 'primeng/iftalabel';
import { FormsModule, NgModel } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { SubProfileService } from '../../shared/services/sub-profile.service';
import { SubProfile } from '../../shared/interfaces/sub-profile.interace';
import { ProfileService } from '../../shared/services/profile.service';




@Component({
  selector: 'app-manage-sub-profile-dialog',
  imports: [AutoCompleteModule, IftaLabelModule, FormsModule, FloatLabelModule, CommonModule, ToastComponent],
  templateUrl: './manage-sub-profile-dialog.component.html',
  styleUrl: './manage-sub-profile-dialog.component.scss'
})


export class ManageSubProfileDialogComponent implements OnInit {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;
  @Output() close = new EventEmitter<void>();
  @Output() subProfileAdded = new EventEmitter<void>();


  isSending: boolean = false;
  name: string = '';

  subProfiles: SubProfile[] = [];
  selectedProfile: SubProfile | null = null;




  constructor(private authService: AuthService, private subProfileService: SubProfileService) { }

  ngOnInit() {
    const user = this.authService.user;
    if(user){    
    this.subProfileService.getSubProfilesByProfileId(user.profile).subscribe({
      next: (subProfiles) => {
        this.subProfiles = subProfiles;
      },
      error: (error) => {
        this.toastComponent.showLoadingError(error);
      }
    });
  }
  }


  saveSubProfileChanges() {
    this.isSending = true;
    const selectedSubProfile: SubProfile = {
      id: this.selectedProfile?.id,
      profile: this.authService.user!.profile,
      name: this.name
    }

    if (selectedSubProfile) {
      this.subProfileService.updateSubProfile(selectedSubProfile).subscribe({
        next: async (response) => {
          this.subProfileAdded.emit();
          await this.toastComponent.showUpdateSubProfileSuccessfully(response.message);
          this.closeDialog();
        },
        error: async (error) => {
          setTimeout(() => {
            this.isSending = false;
          }, 2000);
          await this.toastComponent.showUpdateSubProfileError(error);
        }
      });
    }
  }

  deleteSubProfileChanges() {
    this.isSending = true;
    const selectedSubProfile: SubProfile = {
      id: this.selectedProfile?.id,
      profile: this.authService.user!.profile,
      name: this.name
    }

    if (selectedSubProfile) {
      this.subProfileService.deleteSubProfile(selectedSubProfile).subscribe({
        next: async (response) => {
          this.subProfileAdded.emit();
          await this.toastComponent.showDeleteSubProfileSuccessfully(response);
          this.closeDialog();
        },
        error: async (error) => {
          setTimeout(() => {
            this.isSending = false;
          }, 2000);
          await this.toastComponent.showDeleteSubProfileError(error);
        }
      });
    }
  }

  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.subProfiles = this.subProfiles.filter(profile =>
      profile.name.toLowerCase().includes(query)
    );
  }

  onSelectProfile(event: any) {
    if (this.selectedProfile && this.selectedProfile.name) {
      this.name = this.selectedProfile.name;
    }
  }



  closeDialog() {
    this.close.emit();
  }

}
