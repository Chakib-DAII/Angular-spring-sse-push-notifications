import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearProcessDiagramComponent } from './linear-process-diagram.component';

describe('LinearProcessDiagramComponent', () => {
  let component: LinearProcessDiagramComponent;
  let fixture: ComponentFixture<LinearProcessDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearProcessDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearProcessDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
