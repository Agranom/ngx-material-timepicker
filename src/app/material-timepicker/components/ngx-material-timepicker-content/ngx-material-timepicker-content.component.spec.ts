import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMaterialTimepickerContentComponent } from './ngx-material-timepicker-content.component';

describe('NgxMaterialTimepickerContentComponent', () => {
  let component: NgxMaterialTimepickerContentComponent;
  let fixture: ComponentFixture<NgxMaterialTimepickerContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxMaterialTimepickerContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxMaterialTimepickerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
