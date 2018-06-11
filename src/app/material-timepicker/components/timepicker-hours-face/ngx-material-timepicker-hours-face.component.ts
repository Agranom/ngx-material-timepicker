import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';

@Component({
    selector: 'ngx-material-timepicker-hours-face',
    templateUrl: './ngx-material-timepicker-hours-face.component.html'
})
export class NgxMaterialTimepickerHoursFaceComponent {

    hoursList: ClockFaceTime[] = [];
    faceFormat: number;

    @Input() selectedHour: ClockFaceTime;
    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter();

    constructor(private timepickerService: NgxMaterialTimepickerService) {
        this.timepickerService.selectedFaceFormat.subscribe(format => {
            this.faceFormat = format;
        });

        for (let i = 1; i < this.faceFormat + 1; i++) {
            const angleStep = 360 / this.faceFormat;
            this.hoursList.push({time: i, angle: angleStep * i});
        }
    }

    @HostListener('touchend')
    @HostListener('click')
    onClick() {
        this.hourSelected.next();
    }
}

