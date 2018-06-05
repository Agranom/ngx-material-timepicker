import {Injectable} from '@angular/core';
import {ClockFaceTime} from '../models/clock-face-time.interface';
import {Observable, BehaviorSubject} from 'rxjs';
import {TimePeriod} from '../models/time-period.enum';

const DEFAULT_MINUTE: ClockFaceTime = {
	time: '00',
	angle: 360
};

@Injectable()
export class NgxMaterialTimepickerService {

	public DEFAULT_HOUR: ClockFaceTime = {
		time: 12,
		angle: 360
	};
	
	private hourSubject = new BehaviorSubject<ClockFaceTime>(this.DEFAULT_HOUR);
	private minuteSubject = new BehaviorSubject<ClockFaceTime>(DEFAULT_MINUTE);
	private periodSubject = new BehaviorSubject<TimePeriod>(TimePeriod.AM);
	private faceFormatSubject = new BehaviorSubject<number>(12);

	constructor() {
		this.selectedFaceFormat.subscribe(format => {
			this.DEFAULT_HOUR = {
				time: format,
				angle: 360
			}
			this.hourSubject.next(this.DEFAULT_HOUR);
		})
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

	set faceFormat(format: number) {
		this.faceFormatSubject.next(format);
	}

	get selectedFaceFormat(): Observable<number> {
		return this.faceFormatSubject.asObservable();
	}
}
