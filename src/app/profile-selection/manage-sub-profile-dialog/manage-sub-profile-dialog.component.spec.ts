import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSubProfileDialogComponent } from './manage-sub-profile-dialog.component';

describe('ManageSubProfileDialogComponent', () => {
  let component: ManageSubProfileDialogComponent;
  let fixture: ComponentFixture<ManageSubProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSubProfileDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSubProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
