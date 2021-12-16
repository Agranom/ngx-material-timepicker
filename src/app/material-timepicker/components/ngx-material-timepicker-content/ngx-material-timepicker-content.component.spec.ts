import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxMaterialTimepickerContentComponent } from './ngx-material-timepicker-content.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('NgxMaterialTimepickerContentComponent', () => {
    let component: NgxMaterialTimepickerContentComponent;
    let fixture: ComponentFixture<NgxMaterialTimepickerContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerContentComponent],
            schemas: [NO_ERRORS_SCHEMA]
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
