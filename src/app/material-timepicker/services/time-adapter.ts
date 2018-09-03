import * as _moment from 'moment';
import {Moment} from 'moment';
import {TimeFormat} from '../models/time-format.enum';

const moment = _moment;

export class TimeAdapter {

    static formatTime(time: string, format = 12): string {
        const timeFormat = format === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
        return moment(time, timeFormat).format(timeFormat);
    }

    static convertTimeToMoment(time: string): Moment {
        return moment(time, TimeFormat.TWELVE);
    }

}
