import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NgxTimepickerComponent } from './ngx-timepicker.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';

describe('TimepickerComponent', () => {
    let component: NgxTimepickerComponent;
    let fixture: ComponentFixture<NgxTimepickerComponent>;
    let timer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxTimepickerComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxTimepickerComponent);
        component = fixture.componentInstance;

        component.registerOnChange(function (time: number) {
            timer = time;
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set format', () => {
        component.format = 24;
        expect(component.format).toBe(24);

        component.format = 14;
        expect(component.format).toBe(12);
    });

    it('should change minHour and maxHour when setting format', () => {
        expect(component.minHour).toBe(1);
        expect(component.maxHour).toBe(12);

        component.format = 24;
        expect(component.minHour).toBe(0);
        expect(component.maxHour).toBe(23);
    });

    it('should change default time', fakeAsync(() => {
        const time = '11:15 am';
        component.defaultTime = time;

        expect(component.defaultTime).toBe(time);

        tick();

        component.hour$.subscribe(h => expect(h.time).toBe(11));
        component.minute$.subscribe(m => expect(m.time).toBe(15));
        component.period$.subscribe(p => expect(p).toBe(TimePeriod.AM));
    }));

    it('should change default time when writeValue called ', fakeAsync(() => {
        const time = '10:13 pm';
        component.writeValue(time);

        expect(component.defaultTime).toBe(time);

        tick();

        component.hour$.subscribe(h => expect(h.time).toBe(10));
        component.minute$.subscribe(m => expect(m.time).toBe(13));
        component.period$.subscribe(p => expect(p).toBe(TimePeriod.PM));
    }));

    it('should not change default time when writeValue called with undefined', fakeAsync(() => {
        component.writeValue(undefined);

        expect(component.defaultTime).toBeUndefined();

        tick();

        component.hour$.subscribe(h => expect(h.time).toBe(12));
        component.minute$.subscribe(m => expect(m.time).toBe(0));
        component.period$.subscribe(p => expect(p).toBe(TimePeriod.AM));
    }));

    it('should change disabled prop', () => {
        expect(component.disabled).toBeFalsy();

        component.setDisabledState(true);

        expect(component.disabled).toBeTruthy();
    });

    it('should change hour', fakeAsync(() => {
        const hour: ClockFaceTime = {
            time: 1,
            angle: 30
        };
        component.changeHour(1);

        tick();
        component.hour$.subscribe(h => expect(h).toEqual(hour));
        expect(timer).toBe('01:00 am');
    }));

    it('should change minute', fakeAsync(() => {
        const minute: ClockFaceTime = {
            time: 15,
            angle: 90
        };
        component.changeMinute(15);

        tick();
        component.minute$.subscribe(m => expect(m).toEqual(minute));
        expect(timer).toBe('12:15 am');
    }));

    it('should change period', fakeAsync(() => {
        component.changePeriod(TimePeriod.PM);

        tick();
        component.period$.subscribe(p => expect(p).toEqual(TimePeriod.PM));
        expect(timer).toBe('12:00 pm');
    }));

    it('should call touch method', () => {
        component.registerOnTouched(function () {
            console.log();
        });
    });
});
