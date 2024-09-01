import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSampletestComponent } from './component.sampletest.component';

describe('ComponentSampletestComponent', () => {
  let component: ComponentSampletestComponent;
  let fixture: ComponentFixture<ComponentSampletestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentSampletestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentSampletestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
