import {AfterViewInit, Component} from '@angular/core';
import {NgxMaterialTimepickerHoursFaceComponent} from '../timepicker-hours-face/ngx-material-timepicker-hours-face.component';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import * as _moment from 'moment';

const moment = _moment;

@Component({
    selector: 'ngx-material-timepicker-24-hours-face',
    templateUrl: 'ngx-material-timepicker-24-hours-face.component.html'
})

export class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFaceComponent implements AfterViewInit {


    constructor() {
        super();
        this.initHours();
        console.log(this.hoursList);
    }

    get disabledHours(): ClockFaceTime[] {
        if (this.minTime || this.maxTime) {
            console.log(this.minTime);

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

    initHours(): void {
        const defaultHours = 24;
        const angleStep = 30;

        this.hoursList = Array(defaultHours).fill(1).map((v, i) => {
            const time = v + i;
            return {time: time === 24 ? '00' : time, angle: angleStep * time};
        });
    }
}
