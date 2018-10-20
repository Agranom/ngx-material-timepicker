import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    NgxMaterialTimepicker12HoursFaceComponent
} from './ngx-material-timepicker-12-hours-face.component';
import * as moment from 'moment';
import {NO_ERRORS_SCHEMA, SimpleChanges} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimepickerTime} from '../../timepicker-time.namespace';

describe('NgxMaterialTimepicker12HoursFaceComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepicker12HoursFaceComponent>;
    let component: NgxMaterialTimepicker12HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepicker12HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepicker12HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it('should call disabledHours once period changed', () => {
        const spy = spyOn(TimepickerTime, 'disableHours');
        const changes: SimpleChanges = {
            period: {
                currentValue: TimePeriod.PM,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };
        const time = moment();
        const format = 12;
        const period = TimePeriod.PM;
        const hours = TimepickerTime.getHours(format);
        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.period = period;
        component.hoursList = hours;

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledWith(hours, {min: time, max: time, format, period});
    });

    it('should not call disabledHours', () => {
        const spy = spyOn(TimepickerTime, 'disableHours');
        const changes: SimpleChanges = {
            minTime: {
                currentValue: null,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
