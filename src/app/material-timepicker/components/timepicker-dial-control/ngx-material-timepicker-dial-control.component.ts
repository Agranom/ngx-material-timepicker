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
        this.time = new TimeFormatterPipe().transform(+this.time, this.timeUnit);
    }

    onKeyDown(e: KeyboardEvent): void {
        const char = String.fromCharCode(e.keyCode);

        if ((!e.ctrlKey && isCharInvalid(char)) || isTimeAvailableToChange(this.time.toString(), char, this.timeList)) {
            e.preventDefault();
        }
    }

}

function isCharInvalid(char: string): boolean {
    const regEx = /[a-zA-Z]/g;
    return regEx.test(char);
}

function isTimeAvailableToChange(currentTime: string, nextTime: string, timeList: ClockFaceTime[]): boolean {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        const time = currentTime + nextTime;
        const selectedTime = timeList.find(value => value.time === +time);
        return time.length > 2 || !selectedTime;
    }
}
