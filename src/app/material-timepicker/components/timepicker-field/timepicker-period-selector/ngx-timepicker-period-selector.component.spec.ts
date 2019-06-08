import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTimepickerPeriodSelectorComponent } from './ngx-timepicker-period-selector.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimePeriod } from '../../../models/time-period.enum';

describe('NgxTimepickerPeriodSelectorComponent', () => {
    let fixture: ComponentFixture<NgxTimepickerPeriodSelectorComponent>;
    let component: NgxTimepickerPeriodSelectorComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxTimepickerPeriodSelectorComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(NgxTimepickerPeriodSelectorComponent);
        component = fixture.componentInstance;
    });

    it('should open selector', () => {
        component.disabled = false;
        component.isOpened = false;
        component.open();

        expect(component.isOpened).toBeTruthy();
    });

    it('should not open selector if disabled', () => {
        component.disabled = true;
        component.isOpened = false;
        component.open();

        expect(component.isOpened).toBeFalsy();
    });

    it('should emit selected period and close selector', async(() => {
        component.isOpened = true;
        component.periodSelected.subscribe(p => expect(p).toBe(TimePeriod.PM));

        component.select(TimePeriod.PM);
        expect(component.isOpened).toBeFalsy();
    }));

    it('should set isOpened to false when overlay click', () => {
        component.isOpened = true;
        component.backdropClick();

        expect(component.isOpened).toBeFalsy();
    });
});
