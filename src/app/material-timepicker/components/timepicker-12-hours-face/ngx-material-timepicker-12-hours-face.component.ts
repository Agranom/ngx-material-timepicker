import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgxMaterialTimepickerHoursFaceComponent} from '../timepicker-hours-face/ngx-material-timepicker-hours-face.component';
import {TimePeriod} from '../../models/time-period.enum';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import * as _moment from 'moment';
import {TimeAdapter} from '../../services/time-adapter';
import {TimeFormat} from '../../models/time-format.enum';

const moment = _moment;


@Component({
    selector: 'ngx-material-timepicker-12-hours-face',
    templateUrl: 'ngx-material-timepicker-12-hours-face.component.html'
})

export class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFaceComponent implements OnChanges {

    @Input() period: TimePeriod;

    constructor() {
        super(12);
    }

    get disabledHours(): ClockFaceTime[] {
        if (this.minTime || this.maxTime) {

            return this.hoursList.map(value => {
                const currentHour = this.period === TimePeriod.AM ? +value.time : +value.time + 12;
                let hour = currentHour;

                if (this.period === TimePeriod.AM && currentHour === 12) {
                    hour = 0;
                } else if (this.period === TimePeriod.PM && currentHour === 24) {
                    hour = 12;
                }
                const currentTime = moment().hour(hour).format(TimeFormat.TWELVE);

                return {
                    ...value,
                    disabled: !TimeAdapter.isTimeAvailable(currentTime, this.minTime, this.maxTime)
                };
            });
        }
        return this.hoursList;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = this.disabledHours;
        }
    }
}
