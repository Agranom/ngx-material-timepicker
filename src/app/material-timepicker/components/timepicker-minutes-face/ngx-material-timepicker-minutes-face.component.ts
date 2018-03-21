import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';

const MINUTES = 60;

@Component({
	selector: 'ngx-material-timepicker-minutes-face',
	templateUrl: './ngx-material-timepicker-minutes-face.component.html'
})
export class NgxMaterialTimepickerMinutesFaceComponent {

	minutesList: ClockFaceTime[] = [];
	timeUnit = TimeUnit;

	@Input() selectedMinute: ClockFaceTime;
	@Output() minuteChange = new EventEmitter<ClockFaceTime>();

	constructor() {
		for (let i = 0; i < MINUTES; i++) {
			const angleStep = 360 / MINUTES;
			const angle = angleStep * i;

			this.minutesList.push({time: i === 0 ? '00' : i, angle: angle !== 0 ? angle : 360});
		}
	}
}

