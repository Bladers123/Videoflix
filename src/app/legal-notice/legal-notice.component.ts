import { Component, EventEmitter, Output } from '@angular/core';



@Component({
  selector: 'app-legal-notice',
  imports: [],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})


export class LegalNoticeComponent {

  @Output() close = new EventEmitter<void>();


  closeDialog() {
    this.close.emit();
  }
}
