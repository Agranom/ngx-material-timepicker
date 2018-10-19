import {ClockFaceTime} from './models/clock-face-time.interface';
import * as _moment from 'moment';
import {TimeAdapter} from './services/time-adapter';
import {TimeFormat} from './models/time-format.enum';
import {DisabledTimeConfig} from './models/disabled-time-config.interface';

const moment = _moment;

export namespace TimepickerTime {

    export function getHours(format: number): ClockFaceTime[] {
        return Array(format).fill(1).map((v, i) => {
            const angleStep = 30;
            const time = v + i;
            const angle = angleStep * time;
            return {time: time === 24 ? '00' : time, angle};
        });
    }

    export function disableHours(hours: ClockFaceTime[], config: DisabledTimeConfig): ClockFaceTime[] {
        if (config.min || config.max) {

            return hours.map(value => {
                const hour = config.format === 24 ? value.time : TimeAdapter.formatHour(+value.time, config.format, config.period);
                const currentTime = moment().hour(+hour).format(TimeFormat.TWELVE);

                return {
                    ...value,
                    disabled: !TimeAdapter.isTimeAvailable(currentTime, config.min, config.max, 'hours')
                };
            });
        }
        return hours;
    }

    export function getMinutes(): ClockFaceTime[] {
        const minutes = 60;
        const angleStep = 360 / minutes;

        return Array(minutes).fill(0).map((v, i) => {
            const index = (v + i);
            const angle = angleStep * index;
            return {time: index === 0 ? '00' : index, angle: angle !== 0 ? angle : 360};
        });
    }
}
