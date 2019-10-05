import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';
import { TimeFormatterPipe } from '../../../pipes/time-formatter.pipe';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';

@Component({
    selector: 'ngx-timepicker-time-control',
    templateUrl: './ngx-timepicker-time-control.component.html',
    styleUrls: ['./ngx-timepicker-time-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimeParserPipe, TimeFormatterPipe]
})

export class NgxTimepickerTimeControlComponent implements OnInit, OnChanges {

    @Input() time: number;
    @Input() min: number;
    @Input() max: number;
    @Input() placeholder: string;
    @Input() timeUnit: TimeUnit;
    @Input() disabled: boolean;
    @Input() isDefaultTimeSet: boolean;

    @Output() timeChanged = new EventEmitter<number>();

    isFocused: boolean;

    constructor(private timeParser: TimeParserPipe,
                private timeFormatter: TimeFormatterPipe) {
    }

    ngOnInit(): void {
        if (this.isDefaultTimeSet) {
            this.time = this.timeFormatter.transform(this.time, this.timeUnit);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const timeChanges = changes['time'];
        const isTimeNotProvided = timeChanges && timeChanges.isFirstChange() && !this.isDefaultTimeSet;

        if (isTimeNotProvided) {
            this.time = null;
        }
    }

    onKeydown(event: KeyboardEvent): void {
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
    }

    increase(): void {
        if (!this.disabled) {
            let nextTime = +this.time + 1;

            if (nextTime > this.max) {
                nextTime = this.min;
            }

            this.timeChanged.emit(nextTime);
        }
    }

    decrease(): void {
        if (!this.disabled) {
            let previousTime = +this.time - 1;

            if (previousTime < this.min) {
                previousTime = this.max;
            }

            this.timeChanged.emit(previousTime);
        }
    }

    onInput(input: HTMLInputElement) {
        const value = parseInt(input.value, 10);

        if (!isNaN(value)) {
            this.time = value;

            if (this.time > this.max) {
                this.time = +String(value)[0];
            }

            if (this.time < this.min) {
                this.time = this.min;
            }

            input.value = String(this.time);
            this.timeChanged.emit(this.time);
        }

    }

    onFocus(): void {
        this.isFocused = true;
    }

    onBlur(): void {
        this.time = this.timeFormatter.transform(this.time, this.timeUnit);
        this.isFocused = false;
    }

    onModelChange(value: string): void {
        this.time = +this.timeParser.transform(value, this.timeUnit);
    }
}
