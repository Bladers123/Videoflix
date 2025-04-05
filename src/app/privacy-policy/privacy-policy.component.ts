import { Component, EventEmitter, Output } from '@angular/core';




@Component({
  selector: 'app-privacy-policy',
  imports: [],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})



export class PrivacyPolicyComponent {

  @Output() close = new EventEmitter<void>();


  closeDialog() {
    this.close.emit();
  }
}
