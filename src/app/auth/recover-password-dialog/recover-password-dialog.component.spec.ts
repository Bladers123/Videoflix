import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryPasswordDialogComponent } from './recover-password-dialog.component';

describe('RecoverPasswordDialogComponent', () => {
  let component: RecoveryPasswordDialogComponent;
  let fixture: ComponentFixture<RecoveryPasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryPasswordDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoveryPasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
