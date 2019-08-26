import { Pipe, PipeTransform } from '@angular/core';
import { TimeUnit } from '../models/time-unit.enum';
import { DateTime } from 'luxon';

@Pipe({
    name: 'timeFormatter'
})
export class TimeFormatterPipe implements PipeTransform {

    transform(time: number | string, timeUnit: TimeUnit): any {
        if (time == null || time === '') {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return DateTime.fromObject({hour: +time}).toFormat('HH');
            case TimeUnit.MINUTE:
                return DateTime.fromObject({minute: +time}).toFormat('mm');
            default:
                throw new Error('no such time unit');
        }
    }

}
