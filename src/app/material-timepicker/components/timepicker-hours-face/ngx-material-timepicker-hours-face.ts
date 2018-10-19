import {EventEmitter, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {Moment} from 'moment';
import {TimepickerTime} from '../../time.namespace';


export class NgxMaterialTimepickerHoursFace {

    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Input() format: number;

    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<null>();

    hoursList: ClockFaceTime[] = [];

    protected constructor(format: number) {
        this.hoursList = TimepickerTime.getHours(format);
    }
}
