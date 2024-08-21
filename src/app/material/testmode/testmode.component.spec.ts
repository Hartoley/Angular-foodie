import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestmodeComponent } from './testmode.component';

describe('TestmodeComponent', () => {
  let component: TestmodeComponent;
  let fixture: ComponentFixture<TestmodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestmodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestmodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
