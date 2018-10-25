import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxMaterialTimepickerPeriodComponent} from './ngx-material-timepicker-period.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimePeriod} from '../../models/time-period.enum';
import * as moment from 'moment';
import {TimepickerTime} from '../../timepicker-time.namespace';

describe('NgxMaterialTimepickerPeriodComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerPeriodComponent>;
    let component: NgxMaterialTimepickerPeriodComponent;
    const minutes = TimepickerTime.getMinutes();

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerPeriodComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerPeriodComponent);

        component = fixture.componentInstance;
    });

    it('should change period for hour unit', () => {
        component.activeTimeUnit = TimeUnit.HOUR;
        component.format = 12;
        component.minTime = moment().hour(1);
        component.maxTime = moment().hour(15);
        component.hours = TimepickerTime.getHours(12);
        component.isPeriodAvailable = false;
        component.periodChanged.subscribe(p => component.selectedPeriod = p);
        component.changePeriod(TimePeriod.PM);

        expect(component.isPeriodAvailable).toBeTruthy();
        expect(component.selectedPeriod).toBe(TimePeriod.PM);
    });

    it('should change period for minute unit', () => {
        component.activeTimeUnit = TimeUnit.MINUTE;
        component.format = 12;
        component.minTime = moment().hour(1);
        component.maxTime = moment().hour(5);
        component.minutes = minutes;
        component.selectedHour = 4;
        component.periodChanged.subscribe(p => component.selectedPeriod = p);
        component.changePeriod(TimePeriod.AM);

        expect(component.selectedPeriod).toBe(TimePeriod.AM);
    });

    it('should not change period', () => {
        component.activeTimeUnit = TimeUnit.MINUTE;
        component.format = 12;
        component.minTime = moment().hour(1);
        component.maxTime = moment().hour(5);
        component.minutes = minutes;
        component.selectedHour = 4;
        component.selectedPeriod = TimePeriod.AM;
        component.periodChanged.subscribe(p => component.selectedPeriod = p);
        component.changePeriod(TimePeriod.PM);

        expect(component.selectedPeriod).toBe(TimePeriod.AM);
    });

    it('should throw an error', () => {
        component.format = 12;
        component.minTime = moment().hour(1);
        component.maxTime = moment().hour(5);
        component.minutes = minutes;
        component.selectedHour = 4;
        component.selectedPeriod = TimePeriod.AM;
        try {
            component.changePeriod(TimePeriod.PM);
        } catch (e) {
            expect(e.message).toBe('no such TimeUnit');
        }

    });
});
