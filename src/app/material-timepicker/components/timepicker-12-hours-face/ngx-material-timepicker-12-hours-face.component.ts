import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgxMaterialTimepickerHoursFaceComponent} from '../timepicker-hours-face/ngx-material-timepicker-hours-face.component';
import {TimePeriod} from '../../models/time-period.enum';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import * as _moment from 'moment';

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
                const hour = this.period === TimePeriod.AM && currentHour === 12 ? 0 : currentHour;
                const currentTime = moment().hour(hour);

                return {
                    ...value,
                    disabled: currentTime.isBefore(this.minTime || null, 'hours')
                    || currentTime.isAfter(this.maxTime || null, 'hours')
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
