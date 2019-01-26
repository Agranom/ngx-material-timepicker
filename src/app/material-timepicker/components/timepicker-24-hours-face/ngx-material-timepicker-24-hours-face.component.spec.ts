import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxMaterialTimepicker24HoursFaceComponent} from './ngx-material-timepicker-24-hours-face.component';
import {TimepickerTime} from '../../timepicker-time.namespace';
import * as moment from 'moment';

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
        const spy = spyOn(TimepickerTime, 'disableHours');
        const time = moment();
        const format = 24;
        const hours = TimepickerTime.getHours(format);

        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.hoursList = hours;

        component.ngAfterContentInit();
        expect(spy).toHaveBeenCalledWith(hours, {min: time, max: time, format});
    });
});
