import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime, NumberingSystem } from 'luxon';

type TimeMeasure = 'hour' | 'minute';

@Pipe({
    name: 'timeParser'
})
@Injectable()
export class TimeParserPipe implements PipeTransform {

    private readonly numberingSystem: NumberingSystem;

    constructor(@Inject(TIME_LOCALE) private locale: string) {
        this.numberingSystem = DateTime.local().setLocale(this.locale).resolvedLocaleOpts().numberingSystem as NumberingSystem;
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
        const parsedTime = DateTime.fromFormat(String(time), format, {numberingSystem: this.numberingSystem})[timeMeasure];

        if (!isNaN(parsedTime)) {
            return parsedTime;
        }

        throw new Error(`Cannot parse time - ${time}`);
    }

}
