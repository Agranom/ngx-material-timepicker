import { TestBed } from '@angular/core/testing';
import { ClockFaceTime } from '../models/clock-face-time.interface';
import { NgxMaterialTimepickerService } from './ngx-material-timepicker.service';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';
import { DateTime } from 'luxon';

describe('NgxMaterialTimepickerService', () => {
    const DEFAULT_HOUR: ClockFaceTime = {
        time: 12,
        angle: 360
    };
    const DEFAULT_MINUTE: ClockFaceTime = {
        time: 0,
        angle: 360
    };

    let timepickerService: NgxMaterialTimepickerService;
    let selectedHour: ClockFaceTime;
    let selectedMinute: ClockFaceTime;
    let selectedPeriod: TimePeriod;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgxMaterialTimepickerService]
        });

        timepickerService = TestBed.get(NgxMaterialTimepickerService);
        timepickerService.selectedHour.subscribe(hour => selectedHour = hour);
        timepickerService.selectedMinute.subscribe(minute => selectedMinute = minute);
        timepickerService.selectedPeriod.subscribe(period => selectedPeriod = period);
    });

    it('should set default hour on startup', () => {
        expect(selectedHour).toEqual(DEFAULT_HOUR);
    });

    it('should set default minute on startup', () => {
        expect(selectedMinute).toEqual(DEFAULT_MINUTE);
    });

    it('should set default period on startup', () => {
        expect(selectedPeriod).toEqual(TimePeriod.AM);
    });

    it('should change hour, minute and period', () => {
        const changedHour: ClockFaceTime = {time: 11, angle: 20};
        const changedMinute: ClockFaceTime = {time: 40, angle: 50};

        timepickerService.hour = changedHour;
        timepickerService.minute = changedMinute;
        timepickerService.period = TimePeriod.PM;

        expect(selectedHour).toEqual(changedHour);
        expect(selectedMinute).toEqual(changedMinute);
        expect(selectedPeriod).toEqual(TimePeriod.PM);
    });

    it('should return default full time as string (hh:mm a or HH:mm)', () => {
        expect(timepickerService.getFullTime(12)).toBe('12:00 am');
        expect(timepickerService.getFullTime(24)).toBe('12:00');
    });

    it('should change default time', () => {
        let time = '11:15 am';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 11});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 15});
        expect(selectedPeriod).toBe(TimePeriod.AM);

        time = '11:12 pm';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
        expect(selectedHour.time).toBe(11);
        expect(selectedMinute.time).toBe(12);
        expect(selectedPeriod).toBe(TimePeriod.PM);

        time = '12:00 pm';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
        expect(selectedHour.time).toBe(12);
        expect(selectedMinute.time).toBe(0);
        expect(selectedPeriod).toBe(TimePeriod.PM);

        time = '12:00 am';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
        expect(selectedHour.time).toBe(12);
        expect(selectedMinute.time).toBe(0);
        expect(selectedPeriod).toBe(TimePeriod.AM);

        time = '00:00';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 0});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 0});
        expect(selectedPeriod).toBe(TimePeriod.AM);

        time = '15:00';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 15});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 0});
        expect(selectedPeriod).toBe(TimePeriod.AM);
    });

    it('should reset time if default time is invalid', () => {
        timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 10});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 10});
        expect(selectedPeriod).toBe(TimePeriod.AM);

        timepickerService.setDefaultTimeIfAvailable('invalid time', null, null, 12);

        expect(selectedHour).toEqual(DEFAULT_HOUR);
        expect(selectedMinute).toEqual(DEFAULT_MINUTE);
        expect(selectedPeriod).toBe(TimePeriod.AM);
    });

    it('should not change time if it is not available', () => {
        const min = DateTime.fromObject({hour: 11});

        timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 10});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 10});
        expect(selectedPeriod).toBe(TimePeriod.AM);

        timepickerService.setDefaultTimeIfAvailable('09:15 am', min, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 10});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 10});
        expect(selectedPeriod).toBe(TimePeriod.AM);
    });

    it('should call console error', () => {
        const minutesGap = 5;
        const min = TimeAdapter.convertTimeToDateTime('11:00 pm');
        const max = TimeAdapter.convertTimeToDateTime('11:50 pm');
        const spy = spyOn(console, 'error');

        timepickerService.setDefaultTimeIfAvailable('11:43 pm', min, max, 12, minutesGap);
        expect(spy).toHaveBeenCalled();
    });
});
