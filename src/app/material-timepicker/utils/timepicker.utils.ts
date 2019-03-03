import { DateTime } from 'luxon';

export namespace TimepickerUtils {

    export function isSameOrAfter(time: DateTime, compareWith: DateTime, unit: 'hours' | 'minutes' = 'minutes'): boolean {
        if (unit === 'hours') {
            return time.hour >= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() > compareWith.valueOf();
        }
    }

    export function isSameOrBefore(time: DateTime, compareWith: DateTime, unit: 'hours' | 'minutes' = 'minutes'): boolean {
        if (unit === 'hours') {
            return time.hour <= compareWith.hour;
        }
        if (unit === 'minutes') {
            return time.hasSame(compareWith, unit) || time.valueOf() <= compareWith.valueOf();
        }
    }

    export function isBetween(time: DateTime, before: DateTime, after: DateTime, unit: 'hours' | 'minutes' = 'minutes'): boolean {
        if (unit === 'hours') {
            return isSameOrBefore(time, after, unit) && isSameOrAfter(time, before, unit);
        }
        if (unit === 'minutes') {
            return isSameOrBefore(time, after) && isSameOrAfter(time, before);
        }
    }
}
