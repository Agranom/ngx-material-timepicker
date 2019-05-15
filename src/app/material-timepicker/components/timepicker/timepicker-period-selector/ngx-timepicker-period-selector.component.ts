import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TimePeriod } from '../../../models/time-period.enum';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'ngx-timepicker-period-selector',
    templateUrl: 'ngx-timepicker-period-selector.component.html',
    styleUrls: ['./ngx-timepicker-period-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('scaleInOut', [
            transition(':enter', [
                style({transform: 'scale(0)', opacity: 0}),
                animate(200, style({transform: 'scale(1)', opacity: 1}))
            ]),
            transition(':leave', [
                animate(200, style({transform: 'scale(0)', opacity: 0}))
            ])
        ])
    ]
})

export class NgxTimepickerPeriodSelectorComponent {

    @Input() selectedPeriod: TimePeriod;
    @Input() isOpened: boolean;

    @Output() periodSelected = new EventEmitter<TimePeriod>();

    period = TimePeriod;

    open(): void {
        this.isOpened = true;
    }

    select(period: TimePeriod): void {
        this.periodSelected.next(period);
        this.isOpened = false;
    }

    backdropClick(): void {
        this.isOpened = false;
    }
}
