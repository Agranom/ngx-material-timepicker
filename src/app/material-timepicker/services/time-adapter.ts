import * as _moment from 'moment';
import {Moment, unitOfTime} from 'moment';
import {TimeFormat} from '../models/time-format.enum';

const moment = _moment;

export class TimeAdapter {

    static formatTime(time: string, format = 12): string {
        const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        return moment(time, TimeFormat.TWELVE).format(timeFormat);
    }

    static convertTimeToMoment(time: string): Moment {
        return moment(time, TimeFormat.TWELVE);
    }

    static isTimeAvailable(time: string, min?: Moment, max?: Moment, granularity?: unitOfTime.StartOf): boolean {
        if (!time) {
            return;
        }
        const convertedTime = this.convertTimeToMoment(time);
        const isAfter = (min && !max)
            && convertedTime.isAfter(min);
        const isBefore = (max && !min)
            && convertedTime.isBefore(max);
        const isBetween = (min && max)
            && convertedTime.isBetween(min, max, granularity, '(]');
        const isAvailable = !min && !max;

        return isAfter || isBefore || isBetween || isAvailable;
    }

}
