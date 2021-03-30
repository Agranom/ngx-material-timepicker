import { EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';


export class NgxMaterialTimepickerHoursFace {
    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() format: number;
    @Input() innerClockFaceSize: number;
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
