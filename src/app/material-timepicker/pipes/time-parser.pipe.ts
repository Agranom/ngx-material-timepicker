import { Inject, Pipe, PipeTransform } from '@angular/core';
import { TIME_LOCALE } from '../tokens/time-locale.token';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime, NumberingSystem } from 'luxon';

@Pipe({
    name: 'timeParser'
})
export class TimeParserPipe implements PipeTransform {

    private numberingSystem: NumberingSystem;

    constructor(@Inject(TIME_LOCALE) private locale: string) {
        this.numberingSystem = DateTime.local().setLocale(this.locale).resolvedLocaleOpts().numberingSystem as NumberingSystem;
    }

    transform(time: string | number, timeUnit = TimeUnit.HOUR): number | string {
        if (time == null || time === '') {
            return 'Invalid Time';
        }

        return DateTime.fromFormat(String(time), 'H', {numberingSystem: this.numberingSystem}).hour;
    }

}
