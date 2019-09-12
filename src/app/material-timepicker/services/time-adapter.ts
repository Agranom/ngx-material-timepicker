import { DateTime, DateTimeFormatOptions, LocaleOptions, NumberingSystem } from 'luxon';

import { TimeFormat } from '../models/time-format.enum';
import { TimePeriod } from '../models/time-period.enum';
import { isBetween, isSameOrAfter, isSameOrBefore } from '../utils/timepicker.utils';
import { TimeOptions } from '../models/time-options.interface';

// @dynamic
export class TimeAdapter {
    static DEFAULT_FORMAT = 12;
    static DEFAULT_LOCALE = 'en-US';
    static DEFAULT_NUMBERING_SYSTEM: NumberingSystem = 'latn';

    static parseTime(time: string, opts: TimeOptions): DateTime {
        const {numberingSystem, locale} = TimeAdapter.getLocaleOptionsByTime(time, opts);
        const isPeriodExist = time.split(' ').length === 2;
        const timeMask = isPeriodExist ? TimeFormat.TWELVE_SHORT : TimeFormat.TWENTY_FOUR_SHORT;

        return DateTime.fromFormat(time, timeMask, {numberingSystem, locale});
    }

    static formatTime(time: string, opts: TimeOptions): string {
        const {format} = opts;

        return TimeAdapter.parseTime(time, opts).setLocale(TimeAdapter.DEFAULT_LOCALE)
            .toLocaleString({
                ...DateTime.TIME_SIMPLE,
                hour12: format !== 24,
                numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM
            });
    }

    static toLocaleTimeString(time: string, opts: TimeOptions = {}): string {
        const {format = TimeAdapter.DEFAULT_FORMAT, locale = TimeAdapter.DEFAULT_LOCALE} = opts;
        const timeFormat: DateTimeFormatOptions = {...DateTime.TIME_SIMPLE, hour12: format !== 24};
        const timeMask = (format === 24) ? TimeFormat.TWENTY_FOUR_SHORT : TimeFormat.TWELVE_SHORT;

        return DateTime.fromFormat(time, timeMask).setLocale(locale).toLocaleString(timeFormat);
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

        const convertedTime = this.parseTime(time, {format});
        const minutes = convertedTime.minute;

        if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
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

    static fromDateTimeToString(time: DateTime, format: number): string {
        const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;

        return time.reconfigure({
            numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM,
            locale: TimeAdapter.DEFAULT_LOCALE
        }).toFormat(timeFormat);
    }

    private static getLocaleOptionsByTime(time: string, opts: LocaleOptions): LocaleOptions {
        const {numberingSystem, locale} = DateTime.local().setLocale(opts.locale).resolvedLocaleOpts();
        const localeConfig: LocaleOptions = {numberingSystem: numberingSystem as NumberingSystem, locale};
        const defaultConfig: LocaleOptions = {numberingSystem: TimeAdapter.DEFAULT_NUMBERING_SYSTEM, locale: TimeAdapter.DEFAULT_LOCALE};

        return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
    }
}
