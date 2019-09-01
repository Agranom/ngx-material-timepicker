import { DateTime, DateTimeFormatOptions } from 'luxon';

import { TimeFormat } from '../models/time-format.enum';
import { TimePeriod } from '../models/time-period.enum';
import { isBetween, isSameOrAfter, isSameOrBefore } from '../utils/timepicker.utils';
import { TimeOptions } from '../models/time-options.interface';

// @dynamic
export class TimeAdapter {

    static DEFAULT_FORMAT = 12;
    static DEFAULT_LOCALE = 'en-US';

    static parseTime(time: string, format = 12): string {
        if (time.indexOf(':') === -1) {
            return 'Invalid time';
        }
        let period = time.trim().substr(time.length - 2).toUpperCase();

        const isPeriodValid = period === TimePeriod.AM || period === TimePeriod.PM;
        const [h, m] = time.split(':');


        if (format === 24) {
            const formattedHours = isPeriodValid ? this.formatHour(+h, 12, period as TimePeriod) : +h;
            return `${formattedHours}:${parseInt(m, 10)}`;
        }

        const isPM = +h > 12;
        const hours = isPM ? +h - 12 : +h;

        period = isPeriodValid ? period : isPM ? TimePeriod.PM : TimePeriod.AM;

        return `${hours}:${parseInt(m, 10)} ${period}`;
    }

    static formatTime(time: string, format = 12): string {
        const timeFormat = (format === 24) ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;


        return DateTime.fromFormat(this.parseTime(time, format), timeMask).toFormat(timeFormat).toLowerCase();
    }

    static toLocaleTimeString(time: string, opts: TimeOptions = {}): string {
        const {format = TimeAdapter.DEFAULT_FORMAT, locale = TimeAdapter.DEFAULT_LOCALE} = opts;
        const timeFormat: DateTimeFormatOptions = {...DateTime.TIME_SIMPLE, hour12: format !== 24};
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;

        return DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(timeFormat);
    }

    static convertTimeToDateTime(time: string, format = 12): DateTime {
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;
        return DateTime.fromFormat(this.parseTime(time, format), timeMask);
    }

    static isTimeAvailable(
        time: string,
        min?: DateTime,
        max?: DateTime,
        granularity?: 'hours' | 'minutes',
        minutesGap?: number,
        format?: number
    ): boolean {

        if (!time) {
            return;
        }

        const convertedTime = this.convertTimeToDateTime(time, format);
        const minutes = convertedTime.minute;

        if (minutesGap && (minutes % minutesGap !== 0)) {
            throw new Error(`Your minutes - ${minutes} doesn\'t match your minutesGap - ${minutesGap}`);
        }
        const isAfter = (min && !max)
            && isSameOrAfter(convertedTime, min, granularity);
        const isBefore = (max && !min)
            && isSameOrBefore(convertedTime, max, granularity);
        const between = (min && max)
            && isBetween(convertedTime, min, max, granularity);
        const isAvailable = !min && !max;

        return isAfter || isBefore || between || isAvailable;
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
