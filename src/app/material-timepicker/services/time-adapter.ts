import * as _moment from 'moment';
import {Moment, unitOfTime} from 'moment';
import {TimeFormat} from '../models/time-format.enum';
import {TimePeriod} from '../models/time-period.enum';

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
            && convertedTime.isSameOrAfter(min, granularity);
        const isBefore = (max && !min)
            && convertedTime.isSameOrBefore(max, granularity);
        const isBetween = (min && max)
            && convertedTime.isBetween(min, max, granularity, '[]');
        const isAvailable = !min && !max;

        return isAfter || isBefore || isBetween || isAvailable;
    }

    /***
     *  Format hour according to time format (12 or 24)
     */
    static formatHour(currentHour: number, format: number, period: TimePeriod): number {
        if (format === 24) {
            return currentHour;
        }
        let hour = period === TimePeriod.AM ? currentHour : currentHour + 12;

        if (period === TimePeriod.AM && hour === 12) {
            return 0;
        } else if (period === TimePeriod.PM && hour === 24) {
            return 12;
        }
        return hour;
    }

}
