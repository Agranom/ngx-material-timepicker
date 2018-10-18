import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';
import {TimeUnit} from '../../models/time-unit.enum';
import {Time} from '../../time.namespace';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeFormatterPipe} from '../../pipes/time-formatter.pipe';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss']
})
export class NgxMaterialTimepickerDialComponent implements AfterViewInit {

    timeUnit = TimeUnit;
    timePeriod = TimePeriod;

    hours: ClockFaceTime[];
    prevHour: number;

    @Input() hour: number;
    @Input() minute: number;
    @Input() format: number;
    @Input() period: TimePeriod;
    @Input() activeTimeUnit: TimeUnit;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() hourChanged = new EventEmitter<ClockFaceTime>();

    ngAfterViewInit() {
        this.hours = Time.generateHours(this.format);
    }

    changeTimeUnit(unit: TimeUnit): void {
        this.timeUnitChanged.next(unit);
    }

    changePeriod(period: TimePeriod): void {
        this.periodChanged.next(period);
    }

    savePrevHour(): void {
        this.prevHour = this.hour;
    }

    updateHour(): void {
        const hour = this.selectedHour();
        if (hour) {
            this.hourChanged.next(hour);
            this.prevHour = +hour.time;
        }
    }

    revertHour(): void {
        const hour = this.selectedHour();
        if (!hour) {
            this.hour = this.prevHour;
        }
        this.hour = new TimeFormatterPipe().transform(this.hour, TimeUnit.HOUR);
    }

    private selectedHour(): ClockFaceTime {
        return this.hours.find(h => +h.time === +this.hour);
    }
}
