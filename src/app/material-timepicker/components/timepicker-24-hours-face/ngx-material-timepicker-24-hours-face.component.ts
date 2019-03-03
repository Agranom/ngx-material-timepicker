import {AfterContentInit, Component} from '@angular/core';
import {NgxMaterialTimepickerHoursFace} from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import {TimepickerTime} from '../../utils/timepicker-time.namespace';

@Component({
    selector: 'ngx-material-timepicker-24-hours-face',
    templateUrl: 'ngx-material-timepicker-24-hours-face.component.html'
})

export class NgxMaterialTimepicker24HoursFaceComponent extends NgxMaterialTimepickerHoursFace implements AfterContentInit {

    constructor() {
        super(24);
    }

    ngAfterContentInit() {
        this.hoursList = TimepickerTime.disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    }
}
