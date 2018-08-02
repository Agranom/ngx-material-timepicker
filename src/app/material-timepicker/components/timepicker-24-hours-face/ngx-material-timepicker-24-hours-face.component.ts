import {AfterViewInit, Component, Input} from '@angular/core';
import {NgxMaterialTimepickerHoursFaceComponent} from '../timepicker-hours-face/ngx-material-timepicker-hours-face.component';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import * as _moment from 'moment';

const moment = _moment;

@Component({
    selector: 'ngx-material-timepicker-24-hours-face',
    templateUrl: 'ngx-material-timepicker-24-hours-face.component.html'
})

export class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFaceComponent implements AfterViewInit {

    @Input() format: number;

    constructor() {
        super(24);
    }

    get disabledHours(): ClockFaceTime[] {
        if (this.minTime || this.maxTime) {

            return this.hoursList.map(value => {
                const currentTime = moment().hour(+value.time);

                return {
                    ...value,
                    disabled: currentTime.isBefore(this.minTime || null, 'hours')
                    || currentTime.isAfter(this.maxTime || null, 'hours')
                };
            });
        }
        return this.hoursList;
    }

    ngAfterViewInit() {
        this.hoursList = this.disabledHours;
    }
}
