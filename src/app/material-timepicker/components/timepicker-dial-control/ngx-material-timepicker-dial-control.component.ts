import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';
import {TimeFormatterPipe} from '../../pipes/time-formatter.pipe';

@Component({
    selector: 'ngx-material-timepicker-dial-control',
    templateUrl: 'ngx-material-timepicker-dial-control.component.html',
    styleUrls: ['ngx-material-timepicker-dial-control.component.scss']
})
export class NgxMaterialTimepickerDialControlComponent {

    previousTime: number | string;

    @Input() timeList: ClockFaceTime[];
    @Input() time: number | string;
    @Input() timeUnit: TimeUnit;
    @Input() isActive: boolean;
    @Input() isEditable: boolean;

    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() timeChanged = new EventEmitter<ClockFaceTime>();

    private get selectedTime(): ClockFaceTime {
        return this.timeList.find(t => +t.time === +this.time);
    }

    saveTimeAndChangeTimeUnit(unit: TimeUnit): void {
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
    }

    updateTime(): void {
        const time = this.selectedTime;
        if (time && !time.disabled) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    }

    revertTimeAndFormat(): void {
        const time = this.selectedTime;
        if (!time || time.disabled) {
            this.time = this.previousTime;
        }
        this.time = new TimeFormatterPipe().transform(+this.time, this.timeUnit);
    }
}
