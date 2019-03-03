import { TimeAdapter } from '../services/time-adapter';
import { TimepickerUtils } from './timepicker.utils';

describe('TimepickerUtils', () => {
    describe('isSameOrAfter', () => {

        it('should return true if time the same or more than min value', () => {
            const min = TimeAdapter.convertTimeToDateTime('11:11 am');
            let time = TimeAdapter.convertTimeToDateTime('11:12 am');
            let isSameOrAfter = TimepickerUtils.isSameOrAfter(time, min);
            expect(isSameOrAfter).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('11:11 am');
            isSameOrAfter = TimepickerUtils.isSameOrAfter(time, min);
            expect(isSameOrAfter).toBeTruthy();
        });

        it('should return false if hour less than min value', () => {
            const min = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('10:12 am');
            const isSameOrAfter = TimepickerUtils.isSameOrAfter(time, min, 'hours');
            expect(isSameOrAfter).toBeFalsy();
        });

        it('should return false', () => {
            const min = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('10:12 am');
            const isSameOrAfter = TimepickerUtils.isSameOrAfter(time, min, undefined);
            expect(isSameOrAfter).toBeFalsy();
        });
    });

    describe('isSameOrBefore', () => {

        it('should return true if time before or equal max value', () => {
            const max = TimeAdapter.convertTimeToDateTime('11:11 am');
            let time = TimeAdapter.convertTimeToDateTime('11:10 am');
            let isSameOrBefore = TimepickerUtils.isSameOrBefore(time, max);
            expect(isSameOrBefore).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('11:11 am');
            isSameOrBefore = TimepickerUtils.isSameOrBefore(time, max);
            expect(isSameOrBefore).toBeTruthy();
        });

        it('should return false if hour more than max', () => {
            const max = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('12:10 pm');
            const isSameOrBefore = TimepickerUtils.isSameOrBefore(time, max, 'hours');
            expect(isSameOrBefore).toBeFalsy();
        });

        it('should return false', () => {
            const max = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('12:10 pm');
            const isSameOrBefore = TimepickerUtils.isSameOrBefore(time, max, undefined);
            expect(isSameOrBefore).toBeFalsy();
        });
    });

    describe('isBetween', () => {

        it('should return true if time between min(inclusively) and max(inclusively) value', () => {
            const min = TimeAdapter.convertTimeToDateTime('09:00 am');
            const max = TimeAdapter.convertTimeToDateTime('03:00 pm');
            let time = TimeAdapter.convertTimeToDateTime('12:12 pm');
            let isBetween = TimepickerUtils.isBetween(time, min, max);
            expect(isBetween).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('09:00 am');
            isBetween = TimepickerUtils.isBetween(time, min, max);
            expect(isBetween).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('03:00 pm');
            isBetween = TimepickerUtils.isBetween(time, min, max);
            expect(isBetween).toBeTruthy();
        });

        it('should return false if hour is not between min(inclusively) and max(inclusively) value', () => {
            const min = TimeAdapter.convertTimeToDateTime('09:00 am');
            const max = TimeAdapter.convertTimeToDateTime('03:00 pm');
            const time = TimeAdapter.convertTimeToDateTime('04:05 pm');

            const isBetween = TimepickerUtils.isBetween(time, min, max, 'hours');
            expect(isBetween).toBeFalsy();
        });

        it('should return false', () => {
            const min = TimeAdapter.convertTimeToDateTime('09:00 am');
            const max = TimeAdapter.convertTimeToDateTime('03:00 pm');
            const time = TimeAdapter.convertTimeToDateTime('04:05 pm');

            const isBetween = TimepickerUtils.isBetween(time, min, max, undefined);
            expect(isBetween).toBeFalsy();
        });
    });
});
