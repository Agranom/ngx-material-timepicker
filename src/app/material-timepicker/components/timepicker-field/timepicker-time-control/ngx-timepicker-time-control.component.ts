import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
import { ClockFaceTime } from '../../../models/clock-face-time.interface';

@Component({
    selector: 'ngx-timepicker-time-control',
    templateUrl: './ngx-timepicker-time-control.component.html',
    styleUrls: ['./ngx-timepicker-time-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimeParserPipe]
})

export class NgxTimepickerTimeControlComponent {

    @Input() time: number;
    @Input() min: number;
    @Input() max: number;
    @Input() placeholder: string;
    @Input() timeUnit: TimeUnit;
    @Input() disabled: boolean;
    @Input() timeList: ClockFaceTime[];
    @Input() preventTyping: boolean;

    @Output() timeChanged = new EventEmitter<number>();

    isFocused: boolean;

    private previousTime: number;

    constructor(private timeParser: TimeParserPipe) {
    }

    changeTime(event: any): void {
        event.stopPropagation();

        const char = String.fromCharCode(event.keyCode);
        const time = concatTime(String(this.time), char);

        this.changeTimeIfValid(time);
    }

    onKeydown(event: any): void {
        event.stopPropagation();

        if (!isDigit(event)) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp':
                this.increase();
                break;
            case 'ArrowDown':
                this.decrease();
                break;
        }

        if (this.preventTyping && event.key !== 'Tab') {
            event.preventDefault();
        }
    }

    increase(): void {
        if (!this.disabled) {
            let nextTime = +this.time + 1;

            if (nextTime > this.max) {
                nextTime = this.min;
            }

            if (this.isSelectedTimeDisabled(nextTime)) {
                nextTime = this.getAvailableTime(nextTime, this.getNextAvailableTime.bind(this)) ?? this.time;
            }

            if (nextTime !== this.time) {
                this.timeChanged.emit(nextTime);
            }
        }
    }

    decrease(): void {
        if (!this.disabled) {
            let previousTime = +this.time - 1;

            if (previousTime < this.min) {
                previousTime = this.max;
            }

            if (this.isSelectedTimeDisabled(previousTime)) {
                previousTime = this.getAvailableTime(previousTime, this.getPrevAvailableTime.bind(this)) ?? this.time;
            }

            if (previousTime !== this.time) {
                this.timeChanged.emit(previousTime);
            }
        }
    }

    onFocus(): void {
        this.isFocused = true;
        this.previousTime = this.time;
    }

    onBlur(): void {
        this.isFocused = false;

        if (this.previousTime !== this.time) {
            this.changeTimeIfValid(+this.time);
        }
    }

    onModelChange(value: string): void {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    }

    private changeTimeIfValid(value: number | undefined) {
        if (!isNaN(value)) {
            this.time = value;

            if (this.time > this.max) {
                const timeString = String(value);
                this.time = +timeString[timeString.length - 1];
            }

            if (this.time < this.min) {
                this.time = this.min;
            }

            this.timeChanged.emit(this.time);
        }
    }

    private isSelectedTimeDisabled(time: number): boolean {
        return this.timeList.find((faceTime: ClockFaceTime) => faceTime.time === time)?.disabled;
    }

    private getNextAvailableTime(index: number): number | undefined {
        const timeCollection = this.timeList;
        const maxValue = timeCollection.length;
        for (let i = index + 1; i < maxValue; i++) {
            const time = timeCollection[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    }

    private getPrevAvailableTime(index: number): number | undefined {
        for (let i = index; i >= 0; i--) {
            const time = this.timeList[i];
            if (!time.disabled) {
                return time.time;
            }
        }
    }

    private getAvailableTime(currentTime: number, fn: (index: number) => number | undefined): number | undefined {
        const currentTimeIndex = this.timeList.findIndex(time => time.time === currentTime);
        return fn(currentTimeIndex);
    }
}

function concatTime(currentTime: string, nextTime: string): number {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        const time = currentTime + nextTime;
        return +time;
    }
}

