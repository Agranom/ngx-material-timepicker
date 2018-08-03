import {EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {Moment} from 'moment';


export abstract class NgxMaterialTimepickerHoursFaceComponent {

    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<null>();

    hoursList: ClockFaceTime[] = [];

    constructor(hours: number) {
        this.initHours(hours);
    }

    abstract get disabledHours(): ClockFaceTime[]

    @HostListener('touchend')
    @HostListener('click')
    onClick() {
        this.hourSelected.next();
    }

    initHours(hours: number): void {
        const angleStep = 30;

        this.hoursList = Array(hours).fill(1).map((v, i) => {
            const time = v + i;
            return {time, angle: angleStep * time};
        });
    }
}
