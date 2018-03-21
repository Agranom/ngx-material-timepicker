import {Injectable} from '@angular/core';
import {ClockFaceTime} from '../models/clock-face-time.interface';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TimePeriod} from '../models/time-period.enum';

const DEFAULT_HOUR: ClockFaceTime = {
	time: 12,
	angle: 360
};
const DEFAULT_MINUTE: ClockFaceTime = {
	time: '00',
	angle: 360
};

@Injectable()
export class NgxMaterialTimepickerService {

	private hourSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_HOUR);
	private minuteSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_MINUTE);
	private periodSubject = new BehaviorSubject<TimePeriod>(TimePeriod.AM);

	constructor() {
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

	get fullTime(): string {
		const hour = this.hourSubject.getValue().time;
		const minute = this.minuteSubject.getValue().time;
		const period = this.periodSubject.getValue();

		return `${hour}:${minute} ${period}`;
	}

}
