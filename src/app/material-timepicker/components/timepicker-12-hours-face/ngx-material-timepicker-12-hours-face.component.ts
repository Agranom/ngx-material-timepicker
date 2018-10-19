import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NgxMaterialTimepickerHoursFace} from '../timepicker-hours-face/ngx-material-timepicker-hours-face';
import {TimePeriod} from '../../models/time-period.enum';
import {TimepickerTime} from '../../time.namespace';


@Component({
    selector: 'ngx-material-timepicker-12-hours-face',
    templateUrl: 'ngx-material-timepicker-12-hours-face.component.html'
})

export class NgxMaterialTimepicker12HoursFaceComponent extends NgxMaterialTimepickerHoursFace implements OnChanges {

    @Input() period: TimePeriod;

    constructor() {
        super(12);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = TimepickerTime.disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
