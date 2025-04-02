import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoPosterComponent } from './video-poster.component';

describe('VideoPosterComponent', () => {
  let component: VideoPosterComponent;
  let fixture: ComponentFixture<VideoPosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoPosterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoPosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
