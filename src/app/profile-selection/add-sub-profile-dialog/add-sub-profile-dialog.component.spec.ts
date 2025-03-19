import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubProfileDialogComponent } from './add-sub-profile-dialog.component';

describe('AddSubProfileDialogComponent', () => {
  let component: AddSubProfileDialogComponent;
  let fixture: ComponentFixture<AddSubProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSubProfileDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
