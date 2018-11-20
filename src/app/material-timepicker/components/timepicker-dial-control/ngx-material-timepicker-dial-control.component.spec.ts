import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NgxMaterialTimepickerDialControlComponent} from './ngx-material-timepicker-dial-control.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {TimeUnit} from '../../models/time-unit.enum';

describe('NgxMaterialTimepickerDialControlComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerDialControlComponent>;
    let component: NgxMaterialTimepickerDialControlComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerDialControlComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerDialControlComponent);

        component = fixture.componentInstance;
    });

    it('should set current time to previous time and change time unit', fakeAsync(() => {
        let timeUnit = null;
        component.timeUnitChanged.subscribe(unit => timeUnit = unit);

        component.time = 10;
        expect(component.previousTime).toBeUndefined();

        component.saveTimeAndChangeTimeUnit({preventDefault: () => null} as FocusEvent, TimeUnit.MINUTE);

        expect(component.previousTime).toBe(10);
        expect(timeUnit).toBe(TimeUnit.MINUTE);
    }));

    it('should emit changed time if it exists and available', fakeAsync(() => {
        const timeMock = {time: 1, angle: 30, disabled: false};
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = 1;
        component.updateTime();

        tick();
        expect(time).toEqual(timeMock);
        expect(component.previousTime).toBe(1);
    }));

    it('should not emit changed time if it exists and disabled', fakeAsync(() => {
        const timeMock = {time: 1, angle: 30, disabled: true};
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = 1;
        component.updateTime();

        tick();
        expect(time).toBeNull();
        expect(component.previousTime).toBeUndefined();
    }));

    it('should revert previous time if no time exists', () => {
        const timeMock = {time: 1, angle: 30, disabled: false};
        component.timeList = [timeMock];
        component.time = 2;
        component.previousTime = 1;
        component.timeUnit = TimeUnit.HOUR;
        component.revertTimeAndFormat();

        expect(component.time.toString()).toBe('01');
    });

    it('should revert previous time if time is disabled', () => {
        const timeMock = {time: 1, angle: 30, disabled: true};
        component.timeList = [timeMock];
        component.time = 1;
        component.previousTime = 2;
        component.timeUnit = TimeUnit.HOUR;
        component.revertTimeAndFormat();

        expect(component.time.toString()).toBe('02');
    });

    it(`should format time from '1' to '01'`, () => {
        const timeMock = {time: 1, angle: 30, disabled: false};
        component.timeList = [timeMock];
        component.time = 1;
        component.timeUnit = TimeUnit.HOUR;
        component.revertTimeAndFormat();

        expect(component.time.toString()).toBe('01');
    });
});
