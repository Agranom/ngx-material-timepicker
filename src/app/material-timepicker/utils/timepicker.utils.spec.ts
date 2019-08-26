import { TimeAdapter } from '../services/time-adapter';
import { isBetween, isDigit, isSameOrAfter, isSameOrBefore } from './timepicker.utils';

describe('TimepickerUtils', () => {
    describe('isSameOrAfter', () => {

        it('should return true if time the same or more than min value', () => {
            const min = TimeAdapter.convertTimeToDateTime('11:11 am');
            let time = TimeAdapter.convertTimeToDateTime('11:12 am');
            let isSameOrAfterVar = isSameOrAfter(time, min);
            expect(isSameOrAfterVar).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('11:11 am');
            isSameOrAfterVar = isSameOrAfter(time, min);
            expect(isSameOrAfterVar).toBeTruthy();
        });

        it('should return false if hour less than min value', () => {
            const min = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('10:12 am');
            expect(isSameOrAfter(time, min, 'hours')).toBeFalsy();
        });

        it('should return false', () => {
            const min = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('10:12 am');
            expect(isSameOrAfter(time, min, undefined)).toBeFalsy();
        });
    });

    describe('isSameOrBefore', () => {

        it('should return true if time before or equal max value', () => {
            const max = TimeAdapter.convertTimeToDateTime('11:11 am');
            let time = TimeAdapter.convertTimeToDateTime('11:10 am');
            let isSameOrBeforeVar = isSameOrBefore(time, max);
            expect(isSameOrBeforeVar).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('11:11 am');
            isSameOrBeforeVar = isSameOrBefore(time, max);
            expect(isSameOrBeforeVar).toBeTruthy();
        });

        it('should return false if hour more than max', () => {
            const max = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('12:10 pm');
            expect(isSameOrBefore(time, max, 'hours')).toBeFalsy();
        });

        it('should return false', () => {
            const max = TimeAdapter.convertTimeToDateTime('11:11 am');
            const time = TimeAdapter.convertTimeToDateTime('12:10 pm');
            expect(isSameOrBefore(time, max, undefined)).toBeFalsy();
        });
    });

    describe('isBetween', () => {

        it('should return true if time between min(inclusively) and max(inclusively) value', () => {
            const min = TimeAdapter.convertTimeToDateTime('09:00 am');
            const max = TimeAdapter.convertTimeToDateTime('03:00 pm');
            let time = TimeAdapter.convertTimeToDateTime('12:12 pm');
            let isBetweenVar = isBetween(time, min, max);
            expect(isBetweenVar).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('09:00 am');
            isBetweenVar = isBetween(time, min, max);
            expect(isBetweenVar).toBeTruthy();

            time = TimeAdapter.convertTimeToDateTime('03:00 pm');
            isBetweenVar = isBetween(time, min, max);
            expect(isBetweenVar).toBeTruthy();
        });

        it('should return false if hour is not between min(inclusively) and max(inclusively) value', () => {
            const min = TimeAdapter.convertTimeToDateTime('09:00 am');
            const max = TimeAdapter.convertTimeToDateTime('03:00 pm');
            const time = TimeAdapter.convertTimeToDateTime('04:05 pm');

            expect(isBetween(time, min, max, 'hours')).toBeFalsy();
        });

        it('should return false', () => {
            const min = TimeAdapter.convertTimeToDateTime('09:00 am');
            const max = TimeAdapter.convertTimeToDateTime('03:00 pm');
            const time = TimeAdapter.convertTimeToDateTime('04:05 pm');

            expect(isBetween(time, min, max, undefined)).toBeFalsy();
        });
    });

    describe('isDigit', () => {
        const numbers = Array(10).fill(48).map((v, i) => v + i);
        const numpadNumbers = Array(10).fill(96).map((v, i) => v + i);
        const arrows = Array(6).fill(35).map((v, i) => v + i); // home, end, left, right, up, down
        const specialKeys = [46, 8, 9, 27, 13]; // backspace, delete, tab, escape, enter


        it('should allow numbers', () => {

            const keyCodes = numbers.concat(numpadNumbers);

            keyCodes.forEach(code => {
                expect(isDigit({keyCode: code} as KeyboardEvent)).toBeTruthy();
            });
        });

        it('should allow backspace, delete, tab, escape, enter', () => {
            specialKeys.forEach(code => {
                expect(isDigit({keyCode: code} as KeyboardEvent)).toBeTruthy();
            });
        });

        it('should allow home, end, left, right, up, down', () => {
            arrows.forEach(code => {
                expect(isDigit({keyCode: code} as KeyboardEvent)).toBeTruthy();
            });
        });

        it('should allow ctrl/cmd+a, ctrl/cmd+c, ctrl/cmd+x', () => {
            const chars = [65, 67, 88];

            chars.forEach(code => {
                expect(isDigit({keyCode: code, ctrlKey: true} as KeyboardEvent)).toBeTruthy();
            });

            chars.forEach(code => {
                expect(isDigit({keyCode: code, metaKey: true} as KeyboardEvent)).toBeTruthy();
            });
        });

        it('should not allow chars but numbers, backspace, delete, tab, escape, enter, home, end, left, right, up, down', () => {
            const allKeyCodes = Array(114).fill(8).map((v, i) => v + i);
            const allowedCodes = [...numbers, ...numpadNumbers, ...specialKeys, ...arrows];
            const restrictedCodes = allKeyCodes.filter(code => !allowedCodes.includes(code));

            restrictedCodes.forEach((code) => {
                expect(isDigit({keyCode: code} as KeyboardEvent)).toBeFalsy();
            });
        });
    });
});
