import { Injectable } from '@angular/core';
import { ClockFaceTime } from '../models/clock-face-time.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { TimePeriod } from '../models/time-period.enum';
import { TimeAdapter } from './time-adapter';
import { DateTime } from 'luxon';


const DEFAULT_HOUR: ClockFaceTime = {
    time: 12,
    angle: 360
};
const DEFAULT_MINUTE: ClockFaceTime = {
    time: 0,
    angle: 360
};

@Injectable()
export class NgxMaterialTimepickerService {

    private hourSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_HOUR);
    private minuteSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_MINUTE);
    private periodSubject = new BehaviorSubject<TimePeriod>(TimePeriod.AM);

    private set defaultTime(time: string) {
        const defaultTime = TimeAdapter.convertTimeToDateTime(time).toJSDate();

        if (DateTime.fromJSDate(defaultTime).isValid) {
            this.hour = {...DEFAULT_HOUR, time: defaultTime.getHours()};
            this.minute = {...DEFAULT_MINUTE, time: defaultTime.getMinutes()};
            this.period = <TimePeriod>time.substr(time.length - 2).toUpperCase();
        } else {
            this.resetTime();
        }
    }

    set hour(hour: ClockFaceTime) {
        this.hourSubject.next(hour);
    }

    get selectedHour(): Observable<ClockFaceTime> {
        return this.hourSubject.asObservable();
    }

    set minute(minute: ClockFaceTime) {
        this.minuteSubject.next(minute);
    }

    get selectedMinute(): Observable<ClockFaceTime> {
        return this.minuteSubject.asObservable();
    }

    set period(period: TimePeriod) {
        this.periodSubject.next(period);
    }

    get selectedPeriod(): Observable<TimePeriod> {
        return this.periodSubject.asObservable();
    }


    setDefaultTimeIfAvailable(time: string, min: DateTime, max: DateTime, format: number, minutesGap?: number) {
        /* Workaround to double error message*/
        try {
            if (TimeAdapter.isTimeAvailable(time, min, max, 'minutes', minutesGap)) {
                this.defaultTime = TimeAdapter.formatTime(time, format);
            }
        } catch (e) {
            console.error(e);
        }
    }

    getFullTime(format: number): string {
        const hour = this.hourSubject.getValue().time;
        const minute = this.minuteSubject.getValue().time;
        const period = format === 12 ? this.periodSubject.getValue() : '';

        return TimeAdapter.formatTime(`${hour}:${minute} ${period}`, format);
    }

    private resetTime(): void {
        this.hour = {...DEFAULT_HOUR};
        this.minute = {...DEFAULT_MINUTE};
        this.period = TimePeriod.AM;
    }
}
