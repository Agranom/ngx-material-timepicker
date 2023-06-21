import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ClockFaceTime } from '../../../models/clock-face-time.interface';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeLocalizerPipe } from '../../../pipes/time-localizer.pipe';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
import { isDigit } from '../../../utils/timepicker.utils';

@Component({
    selector: 'ngx-timepicker-time-control',
    templateUrl: './ngx-timepicker-time-control.component.html',
    styleUrls: ['./ngx-timepicker-time-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimeParserPipe, TimeLocalizerPipe],
})

export class NgxTimepickerTimeControlComponent implements OnChanges {

    @Input() time: number;
    @Input() min: number;
    @Input() max: number;
    @Input() placeholder: string;
    @Input() timeUnit: TimeUnit;
    @Input() disabled: boolean;
    @Input() timeList: ClockFaceTime[];
    @Input() preventTyping: boolean;
    @Input() minutesGap: number;

    @ViewChild('timeControlTmpl', { static: true }) timeControlTmpl: ElementRef<HTMLInputElement>;

    @Output() timeChanged = new EventEmitter<number>();

    isFocused: boolean;

    private previousTime: number;

    constructor(private timeParser: TimeParserPipe,
                private timeLocalizerPipe: TimeLocalizerPipe) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.timeList && this.time != null) {
            if (this.isSelectedTimeDisabled(this.time)) {
                this.setAvailableTime();
            }
        }
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
            let nextTime = +this.time + (this.minutesGap || 1);

            if (nextTime > this.max) {
                nextTime = this.min;
            }

            if (this.isSelectedTimeDisabled(nextTime)) {
                nextTime = this.getAvailableTime(nextTime, this.getNextAvailableTime.bind(this));
            }

            if (nextTime !== this.time) {
                this.timeChanged.emit(nextTime);
            }
        }
    }

    decrease(): void {
        if (!this.disabled) {
            let previousTime = +this.time - (this.minutesGap || 1);

            if (previousTime < this.min) {
                previousTime = this.minutesGap ? this.max - (this.minutesGap - 1) : this.max;
            }

            if (this.isSelectedTimeDisabled(previousTime)) {
                previousTime = this.getAvailableTime(previousTime, this.getPrevAvailableTime.bind(this));
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
        if (+value > this.max) {
            this.timeControlTmpl.nativeElement.value = this.timeLocalizerPipe.transform(value.slice(-1), this.timeUnit, true);
        } else {
            this.time = +this.timeParser.transform(value, this.timeUnit);
        }
    }

    private changeTimeIfValid(value: number | undefined) {
        if (!isNaN(value)) {
            this.time = value;

            if (this.time > this.max) {
                this.time = +String(value).slice(-1);
            }

            if (this.time < this.min) {
                this.time = this.min;
            }

            this.timeChanged.emit(this.time);
        }
    }

    private isSelectedTimeDisabled(time: number): boolean {
        return this.timeList.find((faceTime: ClockFaceTime) => faceTime.time === time).disabled;
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
        const availableTime = fn(currentTimeIndex);

        return availableTime != null ? availableTime : this.time;
    }

    private setAvailableTime(): void {
        const availableTime = this.timeList.find(t => !t.disabled);
        if (availableTime != null) {
            this.time = availableTime.time;
            this.timeChanged.emit(this.time);
        }
    }
}

function concatTime(currentTime: string, nextTime: string): number {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        const time = currentTime + nextTime;
        return +time;
    }
}

