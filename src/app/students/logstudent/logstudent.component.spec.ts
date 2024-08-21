import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogstudentComponent } from './logstudent.component';

describe('LogstudentComponent', () => {
  let component: LogstudentComponent;
  let fixture: ComponentFixture<LogstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogstudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
