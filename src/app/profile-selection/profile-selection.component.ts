// profile-Selection.component
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';
import { SubProfile } from '../shared/interfaces/sub-profile.interace';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../shared/components/toast/toast.component';
import { SubProfileService } from '../shared/services/sub-profile.service';
import { AddSubProfileDialogComponent } from "./add-sub-profile-dialog/add-sub-profile-dialog.component";
import { ManageSubProfileDialogComponent } from "./manage-sub-profile-dialog/manage-sub-profile-dialog.component";


@Component({
  selector: 'app-profile-selection',
  imports: [FormsModule, CommonModule, AddSubProfileDialogComponent, ManageSubProfileDialogComponent],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss'
})


export class ProfileSelectionComponent implements OnInit {

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;


  addSubProfileDialogVisible: boolean = false;
  manageSubProfileDialogVisible: boolean = false;


  subProfiles: SubProfile[] = [];

  constructor(private authService: AuthService, private profileService: ProfileService, private subProfileService: SubProfileService) { }

  ngOnInit() {
    this.authService.verifyUser();
    this.loadSubProfiles();
  }

  loadSubProfiles() {
    this.subProfileService.getSubProfileData().subscribe({
      next: (subProfiles: SubProfile[]) => {
        this.subProfiles = subProfiles;
      },
      error: err => {
        console.error('Fehler beim Laden der Subprofile', err);
      }
    });
  }

  getProfileData() {
    this.profileService.getProfileData().subscribe({
      next: (response: any) => {
        console.log('Geladene Profile:', response);
        // Hier kannst du die Profile in einer Komponente-Variable speichern
      },
      error: err => {
        console.error('Fehler beim Laden der Profile', err);
      }
    });
  }

  deleteProfile() {
    this.profileService.deleteProfile().subscribe({
      next: response => {
        console.log('Profil gelöscht:', response);
        // Hier kannst du die Logik nach dem Löschen des Profils implementieren
      },
      error: err => {
        console.error('Fehler beim Löschen des Profils', err);
      }
    });
  }

  updateProfileData() {
    const profileData = {
      // Hier die Daten für das Profil einfügen
    };

    this.profileService.updateProfile(profileData).subscribe({
      next: response => {
        console.log('Profil aktualisiert:', response);
        // Hier kannst du die Logik nach dem Aktualisieren des Profils implementieren
      },
      error: err => {
        console.error('Fehler beim Aktualisieren des Profils', err);
      }
    });
  }


  createSubProfile() {
    const subProfileData = {
      // Hier die Daten für das Subprofil einfügen
    };

    this.subProfileService.createSubProfile(subProfileData).subscribe({
      next: response => {
        console.log('Subprofil erstellt:', response);
        // Subprofile neu laden, falls erforderlich
        this.loadSubProfiles();
      },
      error: err => {
        console.error('Fehler beim Erstellen des Subprofils', err);
      }
    });

  }

  getSubProfileData() {
    this.subProfileService.getSubProfileData().subscribe({
      next: (response: any) => {
        console.log('Geladene Subprofile:', response);
        // Hier kannst du die Subprofile in einer Komponente-Variable speichern
      },
      error: err => {
        console.error('Fehler beim Laden der Subprofile', err);
      }
    });
  }

  deleteSubProfile(subProfileId: string) {
    this.subProfileService.deleteSubProfile(subProfileId).subscribe({
      next: response => {
        console.log('Subprofil gelöscht:', response);
        // Subprofile neu laden, falls erforderlich
        this.loadSubProfiles();
      },
      error: err => {
        console.error('Fehler beim Löschen des Subprofils', err);
      }
    });
  }

  updateSubProfileData(subProfileId: string) {
    const subProfileData = {
      // Hier die Daten für das Subprofil einfügen
    };

    this.subProfileService.updateSubProfile(subProfileId, subProfileData).subscribe({
      next: response => {
        console.log('Subprofil aktualisiert:', response);
        // Subprofile neu laden, falls erforderlich
        this.loadSubProfiles();
      },
      error: err => {
        console.error('Fehler beim Aktualisieren des Subprofils', err);
      }
    });
  }

  openAddSubProfileDialog() {
    this.addSubProfileDialogVisible = true;
  }

  closeAddSubProfileDialog() {
    this.addSubProfileDialogVisible = false;
  }

  openManageSubProfileDialog() {
    this.manageSubProfileDialogVisible = true;
  }

  closeManageSubProfileDialog() {
    this.manageSubProfileDialogVisible = false;
  }


}












