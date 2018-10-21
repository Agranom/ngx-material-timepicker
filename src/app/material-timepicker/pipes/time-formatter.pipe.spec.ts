import {TimeFormatterPipe} from './time-formatter.pipe';
import {TimeUnit} from '../models/time-unit.enum';

describe('TimeFormatterPipe', () => {
    let pipe: TimeFormatterPipe;

    beforeEach(() => {
        pipe = new TimeFormatterPipe();
    });

    it('should do nothing if time undefined', () => {
        expect(pipe.transform(undefined, TimeUnit.HOUR)).toBeUndefined();
    });

    it('should transform hour \'5\' to \'05\'', () => {
        expect(pipe.transform(5, TimeUnit.HOUR)).toBe('05');
    });

    it('should transform minute \'9\' to \'09\'', () => {
        expect(pipe.transform(9, TimeUnit.MINUTE)).toBe('09');
    });

    it('should throw error if unknown TimeUnit', () => {
        expect(() => pipe.transform(20, 2)).toThrowError('no such time unit');
    });
});
