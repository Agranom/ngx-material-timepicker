import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { DateTime } from 'luxon';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';


@Directive()
export class NgxMaterialTimepickerHoursFace {

    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() format: number;

    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<number>();

    hoursList: ClockFaceTime[] = [];

    protected constructor(format: number) {
        this.hoursList = TimepickerTimeUtils.getHours(format);
    }

    onTimeSelected(time: number): void {
        this.hourSelected.next(time);
    }
}
