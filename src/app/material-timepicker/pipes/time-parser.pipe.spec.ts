import { TimeParserPipe } from './time-parser.pipe';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';

fdescribe('TimeParserPipe', () => {
    const locale = 'ar-AE';
    const pipe = new TimeParserPipe(locale);

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return Invalid Time when provide invalid time value', () => {
        const expected = 'Invalid Time';

        expect(pipe.transform(undefined)).toBe(expected);
        expect(pipe.transform(null)).toBe(expected);
        expect(pipe.transform('')).toBe(expected);
    });

    it('should parse arabian hour to latin', () => {
        const unparsedHours = Array(24).fill(0).map((v, i) => v + i);

        unparsedHours.forEach(hour => {
            const unparsedHour = DateTime.fromObject({hour, numberingSystem: 'arab'}).toFormat('H');

            expect(pipe.transform(unparsedHour, TimeUnit.HOUR)).toBe(hour);
        });

    });
});
