import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimepickerTime} from '../../time.namespace';
import {ClockFaceTime} from '../../models/clock-face-time.interface';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss']
})
export class NgxMaterialTimepickerDialComponent implements OnInit {

    timeUnit = TimeUnit;
    timePeriod = TimePeriod;

    hours: ClockFaceTime[];
    minutes: ClockFaceTime[];

    @Input() hour: number | string;
    @Input() minute: number | string;
    @Input() format: number;
    @Input() period: TimePeriod;
    @Input() activeTimeUnit: TimeUnit;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() hourChanged = new EventEmitter<ClockFaceTime>();
    @Output() minuteChanged = new EventEmitter<ClockFaceTime>();

    ngOnInit() {
        this.hours = TimepickerTime.getHours(this.format);
        this.minutes = TimepickerTime.getMinutes();
    }

    changeTimeUnit(unit: TimeUnit): void {
        this.timeUnitChanged.next(unit);
    }

    changePeriod(period: TimePeriod): void {
        this.periodChanged.next(period);
    }

    changeHour(hour: ClockFaceTime): void {
        this.hourChanged.next(hour);
    }

    minuteChange(minute: ClockFaceTime): void {
        this.minuteChanged.next(minute);
    }
}
