/* tslint:disable:triple-equals */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';
import {isDigit} from '../../utils/timepicker.utils';
import {TimeParserPipe} from '../../pipes/time-parser.pipe';

@Component({
    selector: 'ngx-material-timepicker-dial-control',
    templateUrl: 'ngx-material-timepicker-dial-control.component.html',
    styleUrls: ['ngx-material-timepicker-dial-control.component.scss'],
    providers: [TimeParserPipe]
})
export class NgxMaterialTimepickerDialControlComponent {

    previousTime: number | string;

    @Input() timeList: ClockFaceTime[];
    @Input() timeUnit: TimeUnit;
    @Input() time: string;
    @Input() isActive: boolean;
    @Input() isEditable: boolean;
    @Input() minutesGap: number;
    @Input() disabled: boolean;

    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() timeChanged = new EventEmitter<ClockFaceTime>();
    @Output() focused = new EventEmitter<null>();
    @Output() unfocused = new EventEmitter<null>();

    constructor(private timeParserPipe: TimeParserPipe) {
    }

    private get selectedTime(): ClockFaceTime {
        if (!!this.time) {
            return this.timeList.find(t => t.time === +this.time);
        }
    }

    saveTimeAndChangeTimeUnit(event: FocusEvent, unit: TimeUnit): void {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    }

    updateTime(): void {
        const time = this.selectedTime;
        if (time) {
            this.timeChanged.next(time);
            this.previousTime = time.time;
        }
    }

    changeTimeByKeyboard(e: any): void {
        const char = String.fromCharCode(e.keyCode);

        if (isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
    }

    onKeydown(e: any): void {
        if (!isDigit(e)) {
            e.preventDefault();
        } else {
            this.changeTimeByArrow(e.keyCode);
        }
    }

    onModelChange(value: string): void {
        this.time = this.timeParserPipe.transform(value, this.timeUnit).toString();
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
