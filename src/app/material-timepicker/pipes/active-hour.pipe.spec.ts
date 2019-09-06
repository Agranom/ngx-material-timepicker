import { ActiveHourPipe } from './active-hour.pipe';

describe('ActiveHourPipe', () => {
    const pipe = new ActiveHourPipe();

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return false when hour null or undefined', () => {
        const currentHour = 10;
        const clockFaceDisabled = false;

        expect(pipe.transform(undefined, currentHour, clockFaceDisabled)).toBeFalsy();
        expect(pipe.transform(null, currentHour, clockFaceDisabled)).toBeFalsy();
    });

    it('should return false when clockFaceDisabled is true', () => {
        const currentHour = 10;
        const hour = currentHour;
        const clockFaceDisabled = true;

        expect(pipe.transform(hour, currentHour, clockFaceDisabled)).toBeFalsy();
    });

    it('should return true when current hour the same as provided hour', () => {
        const currentHour = 10;
        const hour = currentHour;
        const clockFaceDisabled = false;

        expect(pipe.transform(hour, currentHour, clockFaceDisabled)).toBeTruthy();
    });
});
