import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdsignupComponent } from './stdsignup.component';

describe('StdsignupComponent', () => {
  let component: StdsignupComponent;
  let fixture: ComponentFixture<StdsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StdsignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StdsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
