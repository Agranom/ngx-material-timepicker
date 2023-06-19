/* tslint:disable:triple-equals */
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeLocalizerPipe } from '../../pipes/time-localizer.pipe';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
import { isDigit } from '../../utils/timepicker.utils';

@Component({
    selector: 'ngx-material-timepicker-dial-control',
    templateUrl: 'ngx-material-timepicker-dial-control.component.html',
    styleUrls: ['ngx-material-timepicker-dial-control.component.scss'],
    providers: [TimeParserPipe, TimeLocalizerPipe],
})
export class NgxMaterialTimepickerDialControlComponent implements OnInit {

    previousTime: number | string;

    @Input() timeList: ClockFaceTime[];
    @Input() timeUnit: TimeUnit;
    @Input() time: string;
    @Input() isActive: boolean;
    @Input() isEditable: boolean;
    @Input() minutesGap: number;
    @Input() disabled: boolean;

    @ViewChild('editableTimeTmpl') editableTimeTmpl: ElementRef<HTMLInputElement>;

    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() timeChanged = new EventEmitter<ClockFaceTime>();
    @Output() focused = new EventEmitter<null>();
    @Output() unfocused = new EventEmitter<null>();

    timeControl: FormControl;

    constructor(private timeParserPipe: TimeParserPipe,
                private timeLocalizerPipe: TimeLocalizerPipe) {
    }

    private get selectedTime(): ClockFaceTime {
        if (!!this.time) {
            return this.timeList.find(t => t.time === +this.time);
        }
    }

    ngOnInit() {
        if (this.isEditable) {
            this.timeControl = new FormControl({ value: this.formatTimeForUI(this.time), disabled: this.disabled });
            this.timeControl.valueChanges.pipe(
                tap((value) => {
                    if (value.length > 2) {
                        this.updateInputValue(value.slice(-1));
                    }
                }),
                debounceTime(500),
                distinctUntilChanged(),
                filter((value) => !isTimeDisabledToChange(this.time, value, this.timeList)),
                tap((value) => this.time = this.timeParserPipe.transform(value, this.timeUnit).toString()),
            ).subscribe(() => this.updateTime());
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
            if (this.isEditable) {
                this.updateInputValue(this.formatTimeForUI(time.time));
            }
        }
    }

    onKeydown(e: any): void {
        if (!isDigit(e)) {
            e.preventDefault();
        } else {
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

    private formatTimeForUI(value: string | number): string {
        const parsedTime = this.timeParserPipe.transform(value, this.timeUnit).toString();
        return this.timeLocalizerPipe.transform(parsedTime, this.timeUnit, true);
    }

    private updateInputValue(value: string): void {
        this.editableTimeTmpl.nativeElement.value = value;
    }

}

function isTimeDisabledToChange(currentTime: string, nextTime: string, timeList: ClockFaceTime[]): boolean {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        return isTimeUnavailable(nextTime, timeList);
    }
}

function isTimeUnavailable(time: string, timeList: ClockFaceTime[]): boolean {
    const selectedTime = timeList.find(value => value.time === +time);
    return !selectedTime || (selectedTime && selectedTime.disabled);
}
