import { Component } from '@angular/core';

@Component({
  selector: 'app-registration-dialog',
  imports: [],
  templateUrl: './registration-dialog.component.html',
  styleUrl: './registration-dialog.component.scss'
})
export class RegistrationDialogComponent {
  visible: boolean = false;

  openDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }
}
