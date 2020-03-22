import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { NgxTimepickerFieldComponent } from './ngx-timepicker-field.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { DateTime } from 'luxon';

describe('NgxTimepickerFieldComponent', () => {
    let component: NgxTimepickerFieldComponent;
    let fixture: ComponentFixture<NgxTimepickerFieldComponent>;
    let timer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgxTimepickerFieldComponent],
            providers: [
                {provide: TIME_LOCALE, useValue: 'en-US'},
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgxTimepickerFieldComponent);
        component = fixture.componentInstance;

        component.registerOnChange(function (time: number) {
            timer = time;
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Format', () => {

        it('should set 24-hours format', () => {
            component.format = 24;
            expect(component.format).toBe(24);
        });

        it('should set 12-hours format', () => {
            component.format = 14;
            expect(component.format).toBe(12);
        });

        it('should set defaultTime when change format dynamically', () => {
            const spy = spyOnProperty(component, 'defaultTime', 'set');
            component.timepickerTime = '23:00';
            component.format = 24;

            expect(spy).toHaveBeenCalledTimes(0);

            component.format = 12;
            expect(spy).toHaveBeenCalledWith('23:00');
        });
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

        expect(component.defaultTime.toLowerCase()).toBe(time);

        tick();

        component.hour$.subscribe(hour => expect(hour.time).toBe(11));
        component.minute$.subscribe(minute => expect(minute.time).toBe(15));
        expect(component.period).toBe(TimePeriod.AM);
    }));

    describe('writeValue', () => {

        it('should change default time when writeValue called ', fakeAsync(() => {
            const time = '10:13 pm';
            component.writeValue(time);

            expect(component.defaultTime.toLowerCase()).toBe(time);

            tick();

            component.hour$.subscribe(hour => expect(hour.time).toBe(10));
            component.minute$.subscribe(minute => expect(minute.time).toBe(13));
            expect(component.period).toBe(TimePeriod.PM);
        }));

        it('should set hour and minute value to null', fakeAsync(() => {
            component.writeValue(null);

            expect(component.defaultTime).toBeUndefined();

            tick();

            component.hour$.subscribe(hour => expect(hour.time).toBeNull());
            component.minute$.subscribe(minute => expect(minute.time).toBeNull());
        }));
    });

    it('should change disabled prop', () => {
        expect(component.disabled).toBeFalsy();

        component.setDisabledState(true);

        expect(component.disabled).toBeTruthy();
    });

    it('should change hour and emit timeChanged event', fakeAsync(() => {
        const hour: ClockFaceTime = {
            time: 1,
            angle: 30
        };
        const expected = '1:00 AM';
        component.timeChanged.subscribe(time => expect(time).toBe(expected));
        component.changeHour(1);

        tick();
        component.hour$.subscribe(selectedHour => expect(selectedHour.time).toBe(hour.time));
        expect(timer).toBe(expected);
    }));

    it('should change minute and emit timeChanged event', fakeAsync(() => {
        const minute: ClockFaceTime = {
            time: 15,
            angle: 90
        };
        const expected = '12:15 AM';
        component.timeChanged.subscribe(time => expect(time).toBe(expected));
        component.changeMinute(15);

        tick();
        component.minute$.subscribe(selectedMinute => expect(selectedMinute.time).toBe(minute.time));
        expect(timer).toBe(expected);
    }));

    it('should change period end emit timeChanged event', fakeAsync(() => {
        const expected = '12:00 PM';
        component.timeChanged.subscribe(time => expect(time).toBe(expected));
        component.changePeriod(TimePeriod.PM);

        tick();
        expect(component.period).toEqual(TimePeriod.PM);
        expect(timer).toBe(expected);
    }));

    it('should call touch method', () => {
        component.registerOnTouched(function () {
            console.log();
        });
    });

    it('should update time and emit timeChanged event when timeSet called', async(() => {
        let time: string | null = null;
        const timeMock = '2:5 am';
        const expectedTime = '2:05 am';
        const onChange = (val: string) => time = val;
        component.timeChanged.subscribe(changedTime => expect(changedTime.toLowerCase()).toBe(expectedTime));
        component.registerOnChange(onChange);

        component.onTimeSet(timeMock);

        expect(component.defaultTime.toLowerCase()).toBe(expectedTime);
        expect(time.toLowerCase()).toBe(expectedTime);
        component.hour$.subscribe(hour => expect(hour.time).toBe(2));
        component.minute$.subscribe(minute => expect(minute.time).toBe(5));
    }));

    describe('Time range', () => {

        beforeEach(() => {
            component.format = 12;
        });

        describe('min', () => {

            it('should convert time from string to DateTime', () => {
                component.min = '11:20 am';
                const min: DateTime = component.min as  unknown as DateTime;
                expect(min.hour).toBe(11);
                expect(min.minute).toBe(20);
            });

            it('should return time in DateTime format', () => {
                component.min = DateTime.fromObject({hour: 11, minute: 20});
                expect(component.min instanceof DateTime).toBeTruthy();
            });
        });

        describe('max', () => {

            it('should convert time from string to DateTime', () => {
                component.max = '11:20 am';
                const max: DateTime = component.max as  unknown as DateTime;
                expect(max.hour).toBe(11);
                expect(max.minute).toBe(20);
            });

            it('should return time in DateTime format', () => {
                component.max = DateTime.fromObject({hour: 11, minute: 20});
                expect(component.max instanceof DateTime).toBeTruthy();
            });
        });
    });
});
