import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimepickerTime} from '../../time.namespace';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeFormatterPipe} from '../../pipes/time-formatter.pipe';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss']
})
export class NgxMaterialTimepickerDialComponent implements AfterViewInit {

    timeUnit = TimeUnit;
    timePeriod = TimePeriod;

    hours: ClockFaceTime[];
    prevHour: number;

    minutes: ClockFaceTime[];
    prevMinute: number;

    @Input() hour: number | string;
    @Input() minute: number | string;
    @Input() format: number;
    @Input() period: TimePeriod;
    @Input() activeTimeUnit: TimeUnit;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() hourChanged = new EventEmitter<ClockFaceTime>();
    @Output() minuteChanged = new EventEmitter<ClockFaceTime>();

    ngAfterViewInit() {
        this.hours = TimepickerTime.getHours(this.format);
        this.minutes = TimepickerTime.getMinutes();
    }

    changeTimeUnit(unit: TimeUnit): void {
        this.timeUnitChanged.next(unit);
    }

    changePeriod(period: TimePeriod): void {
        this.periodChanged.next(period);
    }

    savePrevTime(unit: TimeUnit): void {
        this.changeTimeUnit(unit);

        switch (unit) {
            case TimeUnit.HOUR: {
                this.prevHour = +this.hour;
                break;
            }
            case TimeUnit.MINUTE:
                this.prevMinute = +this.minute;
                break;
        }
    }

    updateHour(): void {
        const hour = this.selectedTime(this.hours, +this.hour);
        if (hour) {
            this.hourChanged.next(hour);
            this.prevHour = +hour.time;
        }
    }

    revertHour(): void {
        const hour = this.selectedTime(this.hours, +this.hour);
        if (!hour) {
            this.hour = this.prevHour;
        }
        this.hour = new TimeFormatterPipe().transform(+this.hour, TimeUnit.HOUR);
    }

    updateMinute(): void {
        const minute = this.selectedTime(this.minutes, +this.minute);
        if (minute) {
            this.minuteChanged.next(minute);
            this.prevMinute = +minute.time;
        }
    }

    revertMinute(): void {
        const minute = this.selectedTime(this.minutes, +this.minute);
        if (!minute) {
            this.minute = this.prevMinute;
        }
        this.minute = new TimeFormatterPipe().transform(+this.minute, TimeUnit.MINUTE);
    }

    private selectedTime(timeList: ClockFaceTime[], time: number): ClockFaceTime {
        return timeList.find(h => +h.time === time);
    }
}
