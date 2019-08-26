import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { DateTime } from 'luxon';
import { disableHours, disableMinutes, getHours, getMinutes } from '../../utils/timepicker-time.utils';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMaterialTimepickerDialComponent implements OnChanges {

    timeUnit = TimeUnit;

    hours: ClockFaceTime[];
    minutes: ClockFaceTime[];

    isHintVisible: boolean;

    @Input() editableHintTmpl: TemplateRef<Node>;
    @Input() hour: number | string;
    @Input() minute: number | string;
    @Input() format: number;
    @Input() period: TimePeriod;
    @Input() activeTimeUnit: TimeUnit;
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() isEditable: boolean;
    @Input() minutesGap: number;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() hourChanged = new EventEmitter<ClockFaceTime>();
    @Output() minuteChanged = new EventEmitter<ClockFaceTime>();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            const hours = getHours(this.format);

            this.hours = disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            const minutes = getMinutes(this.minutesGap);

            this.minutes = disableMinutes(minutes, +this.hour, {
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

    changeMinute(minute: ClockFaceTime): void {
        this.minuteChanged.next(minute);
    }

    showHint(): void {
        this.isHintVisible = true;
    }

    hideHint(): void {
        this.isHintVisible = false;
    }
}
