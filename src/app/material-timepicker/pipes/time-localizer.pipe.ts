import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';

type TimeMeasure = 'hour' | 'minute';

@Pipe({
    name: 'timeLocalizer'
})
export class TimeLocalizerPipe implements PipeTransform {

    constructor(@Inject(TIME_LOCALE) private locale: string) {
    }

    transform(time: number | string, timeUnit: TimeUnit, isKeyboardEnabled = false): string {
        if (time == null || time === '') {
            return '';
        }

        switch (timeUnit) {
            case TimeUnit.HOUR: {
                const format = (time === 0 || isKeyboardEnabled) ? 'HH' : 'H';
                return this.formatTime('hour', time, format);
            }
            case TimeUnit.MINUTE:
                return this.formatTime('minute', time, 'mm');
            default:
                throw new Error(`There is no Time Unit with type ${timeUnit}`);
        }
    }

    private formatTime(timeMeasure: TimeMeasure, time: string | number, format: string): string {
        try {
            return DateTime.fromObject({[timeMeasure]: +time}).setLocale(this.locale).toFormat(format);
        } catch {
            throw new Error(`Cannot format provided time - ${time} to locale - ${this.locale}`);
        }
    }
}
