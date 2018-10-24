import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimeUnit} from '../../models/time-unit.enum';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimepickerTime} from '../../timepicker-time.namespace';
import {Moment} from 'moment';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'ngx-material-timepicker-period',
    templateUrl: 'ngx-material-timepicker-period.component.html',
    styleUrls: ['ngx-material-timepicker-period.component.scss'],
    animations: [
        trigger('scaleInOut', [
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('.2s', style({transform: 'scale(1)'}))
            ])
        ])
    ]
})
export class NgxMaterialTimepickerPeriodComponent {

    timePeriod = TimePeriod;
    isPeriodAvailable = true;

    @Input() selectedPeriod: TimePeriod;
    @Input() format: number;
    @Input() activeTimeUnit: TimeUnit;
    @Input() hours: ClockFaceTime[];
    @Input() minutes: ClockFaceTime[];
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Input() selectedHour: number | string;

    @Output() periodChanged = new EventEmitter<TimePeriod>();

    changePeriod(period: TimePeriod): void {
        this.isPeriodAvailable = this.isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }

    private isSwitchPeriodAvailable(period: TimePeriod): boolean {
        const time = this.getDisabledTimeByPeriod(period);
        return !time.every(t => t.disabled);
    }

    private getDisabledTimeByPeriod(period: TimePeriod): ClockFaceTime[] {
        switch (this.activeTimeUnit) {
            case TimeUnit.HOUR:
                return TimepickerTime.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimeUnit.MINUTE:
                return TimepickerTime.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimeUnit');
        }
    }
}
