import {EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {Moment} from 'moment';


export abstract class NgxMaterialTimepickerHoursFaceComponent {


    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Input() format: number;
    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<null>();

    protected hoursList: ClockFaceTime[] = [];

    abstract get disabledHours(): ClockFaceTime[]

    abstract initHours(): void;

    @HostListener('touchend')
    @HostListener('click')
    onClick() {
        // this.hourSelected.next();
    }
}
