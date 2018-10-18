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

    protected constructor(hours: number) {
        this.hoursList = Time.HOURS.slice(0, hours);
    }

    abstract get disabledHours(): ClockFaceTime[]

    initHours(hours: number): void {
        const angleStep = 30;

        this.hoursList = Array(hours).fill(1).map((v, i) => {
            const time = v + i;
            const angle = angleStep * time;
            return {time: time === 24 ? '00' : time, angle};
        });
    }
}
