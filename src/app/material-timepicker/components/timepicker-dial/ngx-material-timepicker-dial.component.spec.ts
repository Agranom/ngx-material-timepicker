import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxMaterialTimepickerDialComponent } from './ngx-material-timepicker-dial.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimeAdapter } from '../../services/time-adapter';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';

describe('NgxMaterialTimepickerDialComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerDialComponent>;
    let component: NgxMaterialTimepickerDialComponent;
    beforeEach(() => {

        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerDialComponent],
            providers: [
                {provide: TIME_LOCALE, useValue: TimeAdapter.DEFAULT_LOCALE}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerDialComponent);

        component = fixture.componentInstance;
    });

    it('should call disableHours and disableMinutes on period change', () => {
        const spyOnFunctionHours = spyOn(TimepickerTimeUtils, 'disableHours');
        const spyOnFunctionMinutes = spyOn(TimepickerTimeUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            period: {
                currentValue: TimePeriod.AM,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spyOnFunctionHours).toHaveBeenCalled();
        expect(spyOnFunctionMinutes).toHaveBeenCalled();
    });

    it('should call disableHours on format change', () => {
        const spyOnFunctionHours = spyOn(TimepickerTimeUtils, 'disableHours');
        const changes: SimpleChanges = {
            format: {
                currentValue: 24,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spyOnFunctionHours).toHaveBeenCalled();
    });

    it('should call disableMinutes on hour change', () => {
        const spy = spyOn(TimepickerTimeUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            hour: {
                currentValue: 24,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalled();
    });

    it('should not call disableHours and disableMinutes', () => {
        const spyOnFunctionHours = spyOn(TimepickerTimeUtils, 'disableHours');
        const spyOnFunctionMinutes = spyOn(TimepickerTimeUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            minTime: {
                currentValue: null,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spyOnFunctionHours).toHaveBeenCalledTimes(0);
        expect(spyOnFunctionMinutes).toHaveBeenCalledTimes(0);
    });

    it('should emit changed time unit', fakeAsync(() => {
        let timeUnit = null;

        component.timeUnitChanged.subscribe(unit => timeUnit = unit);
        component.changeTimeUnit(TimeUnit.MINUTE);

        expect(timeUnit).toBe(TimeUnit.MINUTE);
    }));

    it('should emit changed period', fakeAsync(() => {
        let period = TimePeriod.AM;

        component.periodChanged.subscribe(p => period = p);
        component.changePeriod(TimePeriod.PM);

        tick();
        expect(period).toBe(TimePeriod.PM);
    }));

    it('should emit changed hour', fakeAsync(() => {
        let hour = {time: 1, angle: 30};

        component.hourChanged.subscribe(h => hour = h);
        component.changeHour({time: 2, angle: 60});

        tick();
        expect(hour).toEqual({time: 2, angle: 60});
    }));

    it('should emit changed minute', fakeAsync(() => {
        let minute = {time: 10, angle: 30};

        component.minuteChanged.subscribe(m => minute = m);
        component.changeMinute({time: 20, angle: 60});

        tick();
        expect(minute).toEqual({time: 20, angle: 60});
    }));

    it('should set isHintVisible true', () => {
        expect(component.isHintVisible).toBeFalsy();

        component.showHint();

        expect(component.isHintVisible).toBeTruthy();
    });

    it('should set isHintVisible false', () => {
        component.isHintVisible = true;

        component.hideHint();

        expect(component.isHintVisible).toBeFalsy();
    });

});
