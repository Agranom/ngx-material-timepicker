import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import {TimeUnit} from '../models/time-unit.enum';

@Pipe({
    name: 'timeFormatter'
})
export class TimeFormatterPipe implements PipeTransform {

    transform(time: number, timeUnit: TimeUnit): any {
        if (time === undefined) {
            return time;
        }
        switch (timeUnit) {
            case TimeUnit.HOUR:
                return moment.utc(time * 3600 * 1000).format('HH');
            case TimeUnit.MINUTE:
                return moment.utc(time * 60 * 1000).format('mm');
            default:
                throw new Error('no such time unit');
        }
    }

}
