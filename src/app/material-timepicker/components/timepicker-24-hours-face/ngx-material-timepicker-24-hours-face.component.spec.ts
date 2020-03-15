import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxMaterialTimepicker24HoursFaceComponent } from './ngx-material-timepicker-24-hours-face.component';
import { DateTime } from 'luxon';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';

describe('NgxMaterialTimepicker24HoursFaceComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepicker24HoursFaceComponent>;
    let component: NgxMaterialTimepicker24HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepicker24HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepicker24HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it('should call disableHours', () => {
        const spy = spyOn(TimepickerTimeUtils, 'disableHours');
        const time = DateTime.fromJSDate(new Date());
        const format = 24;
        const hours = TimepickerTimeUtils.getHours(format);

        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.hoursList = hours;

        component.ngAfterContentInit();
        expect(spy).toHaveBeenCalledWith(hours, {min: time, max: time, format});
    });
});
