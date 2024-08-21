import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodstoreComponent } from './foodstore.component';

describe('FoodstoreComponent', () => {
  let component: FoodstoreComponent;
  let fixture: ComponentFixture<FoodstoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodstoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoodstoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
