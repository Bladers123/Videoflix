// profile-Selection.component
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { ProfileService } from '../shared/services/profile.service';


@Component({
  selector: 'app-profile-selection',
  imports: [],
  templateUrl: './profile-selection.component.html',
  styleUrl: './profile-selection.component.scss'
})
export class ProfileSelectionComponent implements OnInit {


  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    this.authService.verifyUser();
    // this.loadSubProfiles();
  }

  loadSubProfiles() {
    this.profileService.getSubProfileData().subscribe({
      next: (response: any) => {
        console.log('Geladene Subprofile:', response);
        // Hier kannst du die Subprofile in einer Komponente-Variable speichern
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

    this.profileService.createSubProfile(subProfileData).subscribe({
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
    this.profileService.getSubProfileData().subscribe({
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
    this.profileService.deleteSubProfile(subProfileId).subscribe({
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

    this.profileService.updateSubProfile(subProfileId, subProfileData).subscribe({
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


}












