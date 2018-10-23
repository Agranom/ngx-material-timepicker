import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';

@Component({
    selector: 'ngx-material-timepicker-period',
    templateUrl: 'ngx-material-timepicker-period.component.html',
    styleUrls: ['ngx-material-timepicker-period.component.scss']
})
export class NgxMaterialTimepickerPeriodComponent {

    timePeriod = TimePeriod;

    @Input() selectedPeriod: TimePeriod;

    @Output() periodChanged = new EventEmitter<TimePeriod>();

    changePeriod(period: TimePeriod): void {
        this.periodChanged.next(period);
    }
}
