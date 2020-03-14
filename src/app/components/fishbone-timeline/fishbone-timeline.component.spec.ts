import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FishboneTimelineComponent } from './fishbone-timeline.component';

describe('FishboneTimelineComponent', () => {
  let component: FishboneTimelineComponent;
  let fixture: ComponentFixture<FishboneTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FishboneTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FishboneTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
