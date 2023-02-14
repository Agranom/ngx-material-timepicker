import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { NUMBERING_SYSTEM, TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';

type TimeMeasure = 'hour' | 'minute';

@Pipe({
    name: 'timeParser'
})
@Injectable()
export class TimeParserPipe implements PipeTransform {

    constructor(@Inject(TIME_LOCALE) private locale: string, @Inject(NUMBERING_SYSTEM) private numberingSystem: string) {
    }

    transform(time: string | number, timeUnit = TimeUnit.HOUR): number | string {
        if (time == null || time === '') {
            return '';
        }

        if (!isNaN(+time)) {
            return time;
        }

        if (timeUnit === TimeUnit.MINUTE) {
            return this.parseTime(time, 'm', 'minute');
        }

        return this.parseTime(time, 'H', 'hour');

    }

    private parseTime(time: string | number, format: string, timeMeasure: TimeMeasure): number {
        const parsedTime = DateTime.fromFormat(String(time), format, {numberingSystem: this.numberingSystem, locale: this.locale})[timeMeasure];

        if (!isNaN(parsedTime)) {
            return parsedTime;
        }

        throw new Error(`Cannot parse time - ${time}`);
    }

}
