import {EventEmitter, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {Moment} from 'moment';
import {Time} from '../../time.namespace';


export abstract class NgxMaterialTimepickerHoursFace {

    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<null>();

    hoursList: ClockFaceTime[] = [];

    protected constructor(format: number) {
        this.hoursList = Time.generateHours(format);
    }

    abstract get disabledHours(): ClockFaceTime[]
}
