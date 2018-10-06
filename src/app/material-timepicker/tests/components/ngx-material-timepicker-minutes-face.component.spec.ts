import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxMaterialTimepickerMinutesFaceComponent} from '../../components/timepicker-minutes-face/ngx-material-timepicker-minutes-face.component';
import {NO_ERRORS_SCHEMA, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import {TimePeriod} from '../../models/time-period.enum';

fdescribe('NgxMaterialTimepickerMinutesFaceComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerMinutesFaceComponent>;
    let component: NgxMaterialTimepickerMinutesFaceComponent;
    const changes: SimpleChanges = {
        period: {
            currentValue: TimePeriod.PM,
            previousValue: undefined,
            firstChange: true,
            isFirstChange: () => null
        }
    };

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerMinutesFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerMinutesFaceComponent);

        component = fixture.componentInstance;
    });

    it('should create array with 60 minutes', () => {
        const angleStep = 360 / 60;
        const minutes = component.minutesList;

        for (let i = 0; i < minutes.length; i++) {
            const angle = i * angleStep;

            expect(minutes[i]).toEqual({time: i === 0 ? '00' : i, angle: angle !== 0 ? angle : 360});
        }
    });

    it('should disable minutes on minTime', () => {
        component.period = TimePeriod.AM;
        component.selectedHour = 12;
        component.minTime = moment().hour(0).minute(35);
        component.ngOnChanges(changes);

        let disabledMinutes = component.minutesList.filter(m => m.disabled);

        for (let i = 0; i < disabledMinutes.length; i++) {
            expect(disabledMinutes[i].time).toBe(i === 0 ? '00' : i);
        }

        component.selectedHour = 1;
        component.ngOnChanges(changes);
        disabledMinutes = component.minutesList.filter(m => m.disabled);

        expect(disabledMinutes.length).toBe(0);
    });

    it('should disable minutes on maxTime', () => {
        const minute = 35;
        component.period = TimePeriod.PM;
        component.selectedHour = 24;
        component.maxTime = moment().hour(12).minute(minute);
        component.ngOnChanges(changes);

        let disabledMinutes = component.minutesList.filter(m => m.disabled);

        for (let i = 0; i < disabledMinutes.length; i++) {
            const disabledMinute = minute + i + 1;
            expect(disabledMinutes[i].time).toBe(disabledMinute);
        }

        component.selectedHour = 1;
        component.ngOnChanges(changes);
        disabledMinutes = component.minutesList.filter(m => m.disabled);

        expect(disabledMinutes.length).toBe(0);
    });

    it('should not have disabled minutes if min and max time are absent', () => {
        component.period = TimePeriod.AM;
        component.selectedHour = 12;
        component.ngOnChanges(changes);
        const disabledMinutes = component.minutesList.filter(m => m.disabled);
        expect(disabledMinutes.length).toBe(0)
    });

    it('should not call disableMinutes fn if changes are not have period', () => {
        const changes: SimpleChanges = {
            minTime: {
                currentValue: null,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };
        component.period = TimePeriod.AM;
        component.selectedHour = 12;
        component.minTime = moment().hour(0).minute(35);

        component.ngOnChanges(changes);
        const disabledMinutes = component.minutesList.filter(m => m.disabled);
        expect(disabledMinutes.length).toBe(0)
    });
});
