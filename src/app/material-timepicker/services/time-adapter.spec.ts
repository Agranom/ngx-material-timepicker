import {TimeAdapter} from './time-adapter';
import {TimePeriod} from '../models/time-period.enum';


describe('TimeAdapter', () => {

    describe('convertTimeToMoment', () => {


        it('shout convert string time  into Moment type time', () => {
            const stringTime = '11:20 am';
            const momentTime = TimeAdapter.convertTimeToMoment(stringTime);

            expect(momentTime.isValid()).toBeTruthy();
            expect(momentTime.hour()).toBe(11, 'wrong hours');
            expect(momentTime.minute()).toBe(20, 'wrong hours');
        });

        it('should be invalid if pass incorrect value', () => {
            const time = 'time';
            expect(TimeAdapter.convertTimeToMoment(time).isValid()).toBeFalsy();
        });

        it('should return time in am/pm format', () => {
            expect(TimeAdapter.formatTime('23:00')).toEqual('11:00 pm');
            expect(TimeAdapter.formatTime('12:20 am')).toEqual('12:20 am');
            expect(TimeAdapter.formatTime('12:20 am', 33)).toEqual('12:20 am');
        });
    });

    describe('formatTime', () => {
        it('should return time in 24-hours format', () => {
            expect(TimeAdapter.formatTime('11:00 pm', 24)).toEqual('23:00');
            expect(TimeAdapter.formatTime('18:10', 24)).toEqual('18:10');
        });
    });

    describe('isTimeAvailable', () => {


        it('should return false if no time provided', () => {
            expect(TimeAdapter.isTimeAvailable('')).toBeFalsy();
            expect(TimeAdapter.isTimeAvailable(null)).toBeFalsy();
            expect(TimeAdapter.isTimeAvailable(undefined)).toBeFalsy();
        });

        it('should return true if time after min value', () => {
            const min = TimeAdapter.convertTimeToMoment('11:11 am');
            let isAvailable = TimeAdapter.isTimeAvailable('11:12 am', min);
            expect(isAvailable).toBeTruthy();

            isAvailable = TimeAdapter.isTimeAvailable('11:11 am', min);
            expect(isAvailable).toBeTruthy();
        });

        it('should return false  if time less than min', () => {
            const min = TimeAdapter.convertTimeToMoment('11:11 am');
            const isAvailable = TimeAdapter.isTimeAvailable('11:10 am', min);
            expect(isAvailable).toBeFalsy();
        });

        it('should return true if time before or equal max value', () => {
            const max = TimeAdapter.convertTimeToMoment('11:11 am');
            let isAvailable = TimeAdapter.isTimeAvailable('11:10 am', null, max);
            expect(isAvailable).toBeTruthy();

            isAvailable = TimeAdapter.isTimeAvailable('11:11 am', null, max);
            expect(isAvailable).toBeTruthy();
        });

        it('should return false if time more than max', () => {
            const max = TimeAdapter.convertTimeToMoment('11:11 am');
            const isAvailable = TimeAdapter.isTimeAvailable('11:12 am', null, max);
            expect(isAvailable).toBeFalsy();
        });

        it('should return true if time between min(inclusively) and max(inclusively) value', () => {
            const min = TimeAdapter.convertTimeToMoment('09:00 am');
            const max = TimeAdapter.convertTimeToMoment('03:00 pm');
            let isAvailable = TimeAdapter.isTimeAvailable('12:12 pm', min, max);
            expect(isAvailable).toBeTruthy();

            isAvailable = TimeAdapter.isTimeAvailable('09:00 am', min, max);
            expect(isAvailable).toBeTruthy();
        });

        it('should return false if time is not between min(inclusively) and max(inclusively) value', () => {
            const min = TimeAdapter.convertTimeToMoment('09:00 am');
            const max = TimeAdapter.convertTimeToMoment('03:00 pm');

            const isAvailable = TimeAdapter.isTimeAvailable('12:00 am', min, max);
            expect(isAvailable).toBeFalsy();
        });

        it('should throw an Error', function () {
            const minutesGap = 5;
            const min = TimeAdapter.convertTimeToMoment('11:00 pm');
            const max = TimeAdapter.convertTimeToMoment('11:50 pm');
            try {
                TimeAdapter.isTimeAvailable('11:43 pm', min, max, 'minutes', minutesGap);
            } catch (e) {
                expect(e.message).toBe(`Your minutes - 43 doesn\'t match your minutesGap - ${minutesGap}`);
            }
        });
    });

    describe('formatHour', () => {
        it('should return hour without changes', () => {
            const hour = 23;
            expect(TimeAdapter.formatHour(hour, 24, TimePeriod.AM)).toBe(hour);
        });

        it('should return 10', () => {
            expect(TimeAdapter.formatHour(10, 12, TimePeriod.AM)).toBe(10);
        });

        it('should return 22', () => {
            expect(TimeAdapter.formatHour(10, 12, TimePeriod.PM)).toBe(22);
        });

        it('should return 0', () => {
            expect(TimeAdapter.formatHour(12, 12, TimePeriod.AM)).toBe(0);
        });

        it('should return 12', () => {
            expect(TimeAdapter.formatHour(12, 12, TimePeriod.PM)).toBe(12);
        });
    });
});
