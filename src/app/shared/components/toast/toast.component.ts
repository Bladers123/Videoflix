// toast.component.ts
import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-toast',
  imports: [ToastModule, ButtonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  providers: [MessageService]
})



export class ToastComponent {

  constructor(private messageService: MessageService) { }

  // Severities 'success', 'info', 'warn' und 'error'.

  private waitOfPromise() {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  async showRegisterSuccessfully(message: string = 'Erfolgreich!') {
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolgreich',
      detail: message,
    });
    await this.waitOfPromise();
  }


  async showRegisterError(message: string = 'Fehlgeschlagen!') {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehlgeschlagen',
      detail: message,
    });
    await this.waitOfPromise();
  }


  async showLoginSuccessfully(message: string = 'Erfolgreich!') {
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolgreich',
      detail: message,
    });
    await this.waitOfPromise();

  }


  async showLoginError(message: string = 'Fehlgeschlagen!') {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehlgeschlagen',
      detail: message,
    });
    await this.waitOfPromise();
  }



  async showRequestRecoveryPasswordSuccessfully(message: string = 'Erfolgreich!') {
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolgreich',
      detail: message,
    });
    await this.waitOfPromise();
  }


  async showRequestRecoveryPasswordError(message: string = 'Fehlgeschlagen!') {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehlgeschlagen',
      detail: message,
    });
    await this.waitOfPromise();
  }

  async showCreateSubProfileSuccessfully(message: string = 'Erfolgreich erstellt!') {
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolgreich',
      detail: message,
    });
    await this.waitOfPromise();
  }

  async showLoadingError(message: string = 'Laden fehlgeschlagen!') {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehlgeschlagen',
      detail: message,
    });
    await this.waitOfPromise();
  }

  async showUpdateSubProfileSuccessfully(message: string = 'Erfolgreich geändert!') {
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolgreich',
      detail: message,
    });
    await this.waitOfPromise();
  }

  async showUpdateSubProfileError(message: string = 'Ändern fehlgeschlagen!') {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehlgeschlagen',
      detail: message,
    });
    await this.waitOfPromise();
  }

  async showDeleteSubProfileSuccessfully(message: string = 'Erfolgreich gelöscht!') {
    this.messageService.add({
      severity: 'success',
      summary: 'Erfolgreich',
      detail: message,
    });
    await this.waitOfPromise();
  }

  
  async showDeleteSubProfileError(message: string = 'Löschen fehlgeschlagen !') {
    this.messageService.add({
      severity: 'error',
      summary: 'Fehlgeschlagen',
      detail: message,
    });
    await this.waitOfPromise();
  }
}