import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimePeriod} from '../../models/time-period.enum';
import {Moment} from 'moment';
import {TimepickerTime} from '../../timepicker-time.namespace';


@Component({
    selector: 'ngx-material-timepicker-minutes-face',
    templateUrl: './ngx-material-timepicker-minutes-face.component.html'
})
export class NgxMaterialTimepickerMinutesFaceComponent implements OnChanges {

    minutesList: ClockFaceTime[] = [];
    timeUnit = TimeUnit;

    @Input() selectedMinute: ClockFaceTime;
    @Input() selectedHour: number;
    @Input() period: TimePeriod;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Input() format: number;
    @Output() minuteChange = new EventEmitter<ClockFaceTime>();

    constructor() {
        this.minutesList = TimepickerTime.getMinutes();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue) {
            this.minutesList = TimepickerTime.disableMinutes(this.minutesList, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}

