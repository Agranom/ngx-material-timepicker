import { TimeLocalizerPipe } from './time-localizer.pipe';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';

describe('TimeLocalizerPipe', () => {
    const defaultLocale = 'en-US';
    const pipe = new TimeLocalizerPipe(defaultLocale);

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should not localize time when provided invalid value', () => {
        const expected = '';

        expect(pipe.transform(undefined, TimeUnit.HOUR)).toBe(expected);
        expect(pipe.transform(null, TimeUnit.HOUR)).toBe(expected);
        expect(pipe.transform('', TimeUnit.HOUR)).toBe(expected);
    });

    it('should return hour in numeric format', () => {
        const hours = Array(23).fill(1).map((v, i) => v + i);

        hours.forEach(hour => {
            const expected = DateTime.fromObject({hour: hour}).setLocale(defaultLocale).toFormat('H');
            expect(pipe.transform(hour, TimeUnit.HOUR)).toBe(expected);
        });
    });

    it('should return hour in 2-digit format when 0 is provided', () => {
        const hour = 0;
        const expected = DateTime.fromObject({hour: hour}).setLocale(defaultLocale).toFormat('HH');

        expect(pipe.transform(hour, TimeUnit.HOUR)).toBe(expected);
    });

    it('should return minute in 2-digit format', () => {
        const minutes = Array(59).fill(0).map((v, i) => v + i);

        minutes.forEach(minute => {
            const expected = DateTime.fromObject({minute: minute}).setLocale(defaultLocale).toFormat('mm');
            expect(pipe.transform(minute, TimeUnit.MINUTE)).toBe(expected);
        });
    });

    it('should throw an error when unexpected TimeUnit is provided', () => {
        const timeUnit = undefined;
        try {
            pipe.transform(1, timeUnit);
        } catch (e) {
            expect(e instanceof Error).toBeTruthy();
            expect(e.message).toBe(`There is no Time Unit with type ${timeUnit}`);
        }
    });
});
