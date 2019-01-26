/* tslint:disable:triple-equals */
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeFormatterPipe } from '../../pipes/time-formatter.pipe';

@Component({
    selector: 'ngx-material-timepicker-dial-control',
    templateUrl: 'ngx-material-timepicker-dial-control.component.html',
    styleUrls: ['ngx-material-timepicker-dial-control.component.scss']
})
export class NgxMaterialTimepickerDialControlComponent implements OnChanges {

    previousTime: number | string;

    @Input() timeList: ClockFaceTime[];
    @Input() timeUnit: TimeUnit;
    @Input() time: string;
    @Input() isActive: boolean;
    @Input() isEditable: boolean;
    @Input() minutesGap: number;

    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() timeChanged = new EventEmitter<ClockFaceTime>();

    private get selectedTime(): ClockFaceTime {
        if (!!this.time) {
            return this.timeList.find(t => t.time === +this.time);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['time'] && (changes['time'].currentValue !== undefined)) {
            if (this.isEditable && !changes['time'].firstChange) {
                return;
            }
            this.time = new TimeFormatterPipe().transform(+changes['time'].currentValue, this.timeUnit);
        }
    }

    saveTimeAndChangeTimeUnit(event: FocusEvent, unit: TimeUnit): void {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
    }

    updateTime(): void {
        const time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    }

    formatTime(): void {
        if (this.isEditable) {
            const time = this.time || this.previousTime;
            this.time = new TimeFormatterPipe().transform(+time, this.timeUnit);
        }
    }

    onKeyDown(e: KeyboardEvent): void {
        const char = String.fromCharCode(e.keyCode);


        if ((!isInputAllowed(e)) || isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }

        if (isInputAllowed(e)) {
            this.changeTimeByArrow(e.keyCode);
        }
    }

    private changeTimeByArrow(keyCode: number): void {
        const ARROW_UP = 38;
        const ARROW_DOWN = 40;
        let time: string;

        if (keyCode === ARROW_UP) {
            time = String(+this.time + (this.minutesGap || 1));
        } else if (keyCode === ARROW_DOWN) {
            time = String(+this.time - (this.minutesGap || 1));
        }

        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    }

}

function isInputAllowed(e: KeyboardEvent): boolean {
    // Allow: backspace, delete, tab, escape, enter
    if ([46, 8, 9, 27, 13].some(n => n === e.keyCode) ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right, up, down
        (e.keyCode >= 35 && e.keyCode <= 40)) {

        return true;
    }
    return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
}

function isTimeDisabledToChange(currentTime: string, nextTime: string, timeList: ClockFaceTime[]): boolean {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        const time = currentTime + nextTime;
        return isTimeUnavailable(time, timeList);
    }
}

function isTimeUnavailable(time: string, timeList: ClockFaceTime[]): boolean {
    const selectedTime = timeList.find(value => value.time === +time);
    return !selectedTime || (selectedTime && selectedTime.disabled);
}
