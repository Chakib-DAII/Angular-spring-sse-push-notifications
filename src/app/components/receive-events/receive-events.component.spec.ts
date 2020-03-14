import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveEventsComponent } from './receive-events.component';

describe('ReceiveEventsComponent', () => {
  let component: ReceiveEventsComponent;
  let fixture: ComponentFixture<ReceiveEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
