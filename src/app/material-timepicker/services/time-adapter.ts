import { DateTime } from 'luxon';

import { TimeFormat } from '../models/time-format.enum';
import { TimePeriod } from '../models/time-period.enum';
import { TimepickerUtils } from '../utils/timepicker.utils';

// @dynamic
export class TimeAdapter {

    static parseTime(time: string): string {
        if (time.indexOf(':') === -1) {
            return 'Invalid time';
        }
        let period = time.trim().substr(time.length - 2).toUpperCase();

        const [h, m] = time.split(':');
        const isPM = +h > 12;
        const isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM;
        const hours = isPM ? +h - 12 : +h;

        period = isPeriodValid ? period : isPM ? TimePeriod.PM : TimePeriod.AM;

        return `${hours}:${parseInt(m, 10)} ${period}`;
    }

    static formatTime(time: string, format = 12): string {
        const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        return DateTime.fromFormat(this.parseTime(time), 'h:m a').toFormat(timeFormat).toLowerCase();
    }

    static convertTimeToDateTime(time: string): DateTime {
        return DateTime.fromFormat(this.parseTime(time), 'h:m a');
    }

    static isTimeAvailable(time: string, min?: DateTime, max?: DateTime, granularity?: 'hours' | 'minutes', minutesGap?: number): boolean {
        if (!time) {
            return;
        }

        const convertedTime = this.convertTimeToDateTime(time);
        const minutes = convertedTime.minute;

        if (minutesGap && (minutes % minutesGap !== 0)) {
            throw new Error(`Your minutes - ${minutes} doesn\'t match your minutesGap - ${minutesGap}`);
        }
        const isAfter = (min && !max)
            && TimepickerUtils.isSameOrAfter(convertedTime, min, granularity);
        const isBefore = (max && !min)
            && TimepickerUtils.isSameOrBefore(convertedTime, max, granularity);
        const isBetween = (min && max)
            && TimepickerUtils.isBetween(convertedTime, min, max, granularity);
        const isAvailable = !min && !max;

        return isAfter || isBefore || isBetween || isAvailable;
    }

    /***
     *  Format hour according to time format (12 or 24)
     */
    static formatHour(currentHour: number, format: number, period: TimePeriod): number {
        if (format === 24) {
            return currentHour;
        }
        const hour = period === TimePeriod.AM ? currentHour : currentHour + 12;

        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        } else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    }
}
