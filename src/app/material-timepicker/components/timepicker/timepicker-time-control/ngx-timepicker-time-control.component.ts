import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { isDigit } from '../../../utils/timepicker.utils';

@Component({
    selector: 'ngx-timepicker-time-control',
    templateUrl: './ngx-timepicker-time-control.component.html',
    styleUrls: ['./ngx-timepicker-time-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxTimepickerTimeControlComponent {

    @Input() time: number;
    @Input() min: number;
    @Input() max: number;
    @Input() placeholder: string;

    @Output() timeChanged = new EventEmitter<number>();

    isFocused: boolean;


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
        const nextTime = this.time + 1;

        if (nextTime > this.max) {
            this.time = this.min;
            return;
        }

        this.timeChanged.emit(nextTime);
    }

    decrease(): void {
        const previousTime = this.time - 1;

        if (previousTime < this.min) {
            this.time = this.max;
            return;
        }

        this.timeChanged.emit(previousTime);
    }

    onInput(input: HTMLInputElement) {
        const value = parseInt(input.value, 10);

        if (!isNaN(value)) {
            this.time = value;

            if (this.min === 0 && value === 0) {
                this.time = 0;
            }

            if (value > this.max) {
                this.time = +String(value)[0];
            }

            input.value = String(this.time);
            this.timeChanged.emit(this.time);
        }

    }

    onFocus(): void {
        this.isFocused = true;
    }

    onBlur(): void {
        this.isFocused = false;
    }
}
