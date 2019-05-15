import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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

    onKeydown(event: KeyboardEvent): void {
        // TODO allow only digits
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
}
