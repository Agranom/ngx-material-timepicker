import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';

@Pipe({
    name: 'timeLocalizer'
})
export class TimeLocalizerPipe implements PipeTransform {

    constructor(@Inject(TIME_LOCALE) private locale: string) {
    }

    transform(time: number | string, timeUnit: TimeUnit): string | null {
        if (time == null || time === '') {
            return '';
        }

        switch (timeUnit) {
            case TimeUnit.HOUR: {
                const format = time === 0 ? 'HH' : 'H';
                return DateTime.fromObject({hour: +time}).setLocale(this.locale).toFormat(format);
            }
            case TimeUnit.MINUTE:
                return DateTime.fromObject({minute: +time}).setLocale(this.locale).toFormat('mm');
            default:
                throw new Error(`There is no Time Unit with type ${timeUnit}`);
        }
    }

}
