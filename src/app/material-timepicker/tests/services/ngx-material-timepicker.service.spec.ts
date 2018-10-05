import {TestBed} from '@angular/core/testing';
import {NgxMaterialTimepickerService} from '../../services/ngx-material-timepicker.service';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimePeriod} from '../../models/time-period.enum';

describe('NgxMaterialTimepickerService', () => {
    const DEFAULT_HOUR: ClockFaceTime = {
        time: 12,
        angle: 360
    };
    const DEFAULT_MINUTE: ClockFaceTime = {
        time: '00',
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

    afterEach(() => {
        // subscriptions.forEach(s => s.unsubscribe());
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

    it('should return full time as string (hh:mm a or HH:mm)', () => {
        expect(timepickerService.getFullTime(12)).toBe('12:00 am');
        expect(timepickerService.getFullTime(24)).toBe('00:00');
        expect(typeof timepickerService.getFullTime(24) === 'string').toBeTruthy();
    });

    it('should change default time', () => {
        timepickerService.defaultTime = '11:15 pm';

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 11});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 15});
        expect(selectedPeriod).toBe(TimePeriod.PM);

        timepickerService.defaultTime = '00:00';

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: '00'});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: '00'});
    });

    it('should reset time if default time is invalid', () => {
        timepickerService.defaultTime = 'invalid Time';

        expect(selectedHour).toEqual(DEFAULT_HOUR);
        expect(selectedMinute).toEqual(DEFAULT_MINUTE);
        expect(selectedPeriod).toBe(TimePeriod.AM);
    });
});
