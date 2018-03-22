import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';

const HOURS = 12;

@Component({
    selector: 'ngx-material-timepicker-hours-face',
    templateUrl: './ngx-material-timepicker-hours-face.component.html'
})
export class NgxMaterialTimepickerHoursFaceComponent {

    hoursList: ClockFaceTime[] = [];

    @Input() selectedHour: ClockFaceTime;
    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter();

    constructor() {
        for (let i = 1; i < HOURS + 1; i++) {
            const angleStep = 360 / HOURS;
            this.hoursList.push({time: i, angle: angleStep * i});
        }
    }

    @HostListener('click')
    onMouseup() {
        this.hourSelected.next();
    }
}

