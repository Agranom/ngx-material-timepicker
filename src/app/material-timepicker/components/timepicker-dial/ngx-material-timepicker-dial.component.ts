import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimepickerTime} from '../../timepicker-time.namespace';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {Moment} from 'moment';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMaterialTimepickerDialComponent implements OnChanges {

    timeUnit = TimeUnit;
    timePeriod = TimePeriod;

    hours: ClockFaceTime[];
    minutes: ClockFaceTime[];

    @Input() hour: number | string;
    @Input() minute: number | string;
    @Input() format: number;
    @Input() period: TimePeriod;
    @Input() activeTimeUnit: TimeUnit;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() hourChanged = new EventEmitter<ClockFaceTime>();
    @Output() minuteChanged = new EventEmitter<ClockFaceTime>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            const hours = TimepickerTime.getHours(this.format);

            this.hours = TimepickerTime.disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            const minutes = TimepickerTime.getMinutes();

            this.minutes = TimepickerTime.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
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
