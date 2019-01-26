import {MinutesFormatterPipe} from './minutes-formatter.pipe';

describe('MinutesFormatterPipe', () => {
    let pipe: MinutesFormatterPipe;

    beforeEach(() => {
        pipe = new MinutesFormatterPipe();
    });

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return undefined or null without formatting', () => {
        expect(pipe.transform(undefined)).toBeUndefined();
        expect(pipe.transform(null)).toBeNull();
    });

    it('should return minute', () => {
        expect(pipe.transform(3, 3)).toBe(3);
    });

    it('should return empty string', () => {
        expect(pipe.transform(3)).toBe('');
    });
});
