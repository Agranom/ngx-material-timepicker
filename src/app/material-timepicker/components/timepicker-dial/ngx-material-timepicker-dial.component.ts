import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimeUnit} from '../../models/time-unit.enum';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss']
})

export class NgxMaterialTimepickerDialComponent {

    timeUnit = TimeUnit;
    timePeriod = TimePeriod;

    @Input() hour: number;
    @Input() minute: number;
    @Input() format: number;
    @Input() period: TimePeriod;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();

    changeTimeUnit(unit: TimeUnit): void {
        this.timeUnitChanged.next(unit);
    }

    changePeriod(period: TimePeriod): void {
        this.periodChanged.next(period);
    }
}
