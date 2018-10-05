import {AfterContentInit, Component, Input} from '@angular/core';
import {NgxMaterialTimepickerHoursFace} from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import * as _moment from 'moment';
import {TimeFormat} from '../../models/time-format.enum';
import {TimeAdapter} from '../../services/time-adapter';

const moment = _moment;

@Component({
    selector: 'ngx-material-timepicker-24-hours-face',
    templateUrl: 'ngx-material-timepicker-24-hours-face.component.html'
})

export class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFace implements AfterContentInit {

    @Input() format: number;

    constructor() {
        super(24);
    }

    get disabledHours(): ClockFaceTime[] {
        if (this.minTime || this.maxTime) {

            return this.hoursList.map(value => {
                const currentTime = moment().hour(+value.time).format(TimeFormat.TWELVE);

                return {
                    ...value,
                    disabled: !TimeAdapter.isTimeAvailable(currentTime, this.minTime, this.maxTime)
                };
            });
        }
        return this.hoursList;
    }

    ngAfterContentInit() {
        this.hoursList = this.disabledHours;
    }
}
