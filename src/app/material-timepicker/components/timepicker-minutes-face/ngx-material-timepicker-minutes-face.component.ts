import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimePeriod} from '../../models/time-period.enum';
import * as _moment from 'moment';
import {Moment} from 'moment';
import {TimeFormat} from '../../models/time-format.enum';
import {TimeAdapter} from '../../services/time-adapter';

const moment = _moment;
const MINUTES = 60;

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
        const angleStep = 360 / MINUTES;
        this.minutesList = Array(MINUTES).fill(0).map((v, i) => {
            const index = (v + i);
            const angle = angleStep * index;
            return {time: index === 0 ? '00' : index, angle: angle !== 0 ? angle : 360};
        });
    }

    private get disabledMinutes(): ClockFaceTime[] {
        if (this.minTime || this.maxTime) {

            const hour = TimeAdapter.formatHour(this.selectedHour, this.format, this.period);

            return this.minutesList.map(value => {
                const currentTime = moment().hour(hour).minute(+value.time).format(TimeFormat.TWELVE);

                return {
                    ...value,
                    disabled: !TimeAdapter.isTimeAvailable(currentTime, this.minTime, this.maxTime, 'minutes')
                };
            });
        }
        return this.minutesList;
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes['period'] && changes['period'].currentValue)) {
            this.minutesList = this.disabledMinutes;
        }
    }
}

