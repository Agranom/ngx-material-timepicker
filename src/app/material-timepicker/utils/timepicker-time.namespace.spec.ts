import { TimepickerTime } from './timepicker-time.namespace';
import { TimePeriod } from '../models/time-period.enum';
import { DateTime } from 'luxon';

describe('TimepickerTime', () => {
    describe('Hour', () => {
        const min = DateTime.fromObject({hour: 10});
        const max = DateTime.fromObject({hour: 15});

        it('should return 12 hours', () => {
            const hours = TimepickerTime.getHours(12);
            for (let i = 0; i < hours.length; i++) {
                const angleStep = 30;
                expect(hours[i]).toEqual({time: i + 1, angle: (i + 1) * angleStep});
            }
        });

        it('should return 24 hours', () => {
            const hours = TimepickerTime.getHours(24);
            for (let i = 0; i < hours.length; i++) {
                const angleStep = 30;
                const time = i + 1;

                expect(hours[i]).toEqual({time: time === 24 ? 0 : time, angle: time * angleStep});
            }
        });

        it('should disable hours if min time present (12 hours format)', () => {
            const hours = TimepickerTime.getHours(12);
            let disabledHours = TimepickerTime.disableHours(hours, {
                min,
                max: undefined,
                format: 12,
                period: TimePeriod.AM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(10);
            for (let i = 0; i < disabledHours.length; i++) {
                expect(disabledHours[i].time).toBe(disabledHours[i].time === 12 ? 12 : i + 1);
            }

            disabledHours = TimepickerTime.disableHours(hours, {
                min,
                max: undefined,
                format: 12,
                period: TimePeriod.PM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);
        });

        it('should disable hours if max time present (12 hours format)', () => {
            const hours = TimepickerTime.getHours(12);
            let disabledHours = TimepickerTime.disableHours(hours, {
                min: undefined,
                max,
                format: 12,
                period: TimePeriod.AM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);


            disabledHours = TimepickerTime.disableHours(hours, {
                min: undefined,
                max,
                format: 12,
                period: TimePeriod.PM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(8);
            for (let i = 0; i < disabledHours.length; i++) {
                expect(disabledHours[i].time).toBe(i + 4);
            }
        });

        it('should disable hours if min and max time present (24 hours format)', () => {
            const hours = TimepickerTime.getHours(24);
            const disabledHours = TimepickerTime.disableHours(hours, {
                min,
                max,
                format: 24,
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(18);
        });

        it('should return hours without disabling if nor min and max values were provided', () => {
            const hours = TimepickerTime.getHours(24);
            const disabledHours = TimepickerTime.disableHours(hours, {
                min: undefined,
                max: undefined,
                format: 24,
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);
        });
    });

    describe('Minute', () => {
        const min = DateTime.fromObject({hour: 1, minute: 10});
        const max = DateTime.fromObject({hour: 3, minute: 50});
        const minutes = TimepickerTime.getMinutes();


        it('should return array with 60 minutes by default', () => {
            const angleStep = 360 / 60;

            expect(minutes.length).toBe(60);

            for (let i = 0; i < minutes.length; i++) {
                const angle = i * angleStep;

                expect(minutes[i]).toEqual({time: i, angle: angle !== 0 ? angle : 360});
            }
        });

        it('should return minutes with gap in 5 minutes', () => {
            const gap = 5;
            const minutesWithGap = TimepickerTime.getMinutes(gap);
            const angleStep = 360 / 60;

            expect(minutesWithGap.length).toBe(12);

            for (let i = 0; i < minutesWithGap.length; i++) {
                const angle = i * angleStep * gap;

                expect(minutesWithGap[i]).toEqual({time: i * gap, angle: angle !== 0 ? angle : 360});
            }
        });

        it('should disable minutes with min time', () => {
            let disabledMinutes = TimepickerTime.disableMinutes(minutes, 1, {
                min,
                max: undefined,
                format: 12,
                period: TimePeriod.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(10);
            for (let i = 0; i < disabledMinutes.length; i++) {
                const time = disabledMinutes[i].time;
                expect(time).toBe(i);
            }

            disabledMinutes = TimepickerTime.disableMinutes(minutes, 2, {
                min,
                max: undefined,
                format: 12,
                period: TimePeriod.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(0);

            disabledMinutes = TimepickerTime.disableMinutes(minutes, 0, {
                min,
                max: undefined,
                format: 12,
                period: TimePeriod.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(60);
        });

        it('should disable minutes with max time', () => {
            let disabledMinutes = TimepickerTime.disableMinutes(minutes, 3, {
                min: undefined,
                max,
                format: 12,
                period: TimePeriod.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(9);
            for (let i = 0; i < disabledMinutes.length; i++) {
                const time = i + 51;
                expect(disabledMinutes[i].time).toBe(time);
            }

            disabledMinutes = TimepickerTime.disableMinutes(minutes, 2, {
                min: undefined,
                max,
                format: 12,
                period: TimePeriod.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(0);

            disabledMinutes = TimepickerTime.disableMinutes(minutes, 4, {
                min: undefined,
                max,
                format: 12,
                period: TimePeriod.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(60);
        });

        it('should return minutes without disabling if nor min and max values were provided', () => {
            const disabledHours = TimepickerTime.disableMinutes(minutes, 1, {
                min: undefined,
                max: undefined,
                format: 24,
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);
        });
    });
});
