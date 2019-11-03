import { EventEmitter, Input, Output } from "@angular/core";
import { DateTime } from "luxon";
import { ClockFaceTime } from "../../models/clock-face-time.interface";
import { getHours } from "../../utils/timepicker-time.utils";

export class NgxMaterialTimepickerHoursFace {
    @Input() selectedHour: ClockFaceTime;
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() format: number;
    @Input() filter: (
        time: DateTime,
        granularity?: "hours" | "minutes"
    ) => boolean;

    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<number>();

    hoursList: ClockFaceTime[] = [];

    protected constructor(format: number) {
        this.hoursList = getHours(format);
    }

    onTimeSelected(time: number): void {
        this.hourSelected.next(time);
    }
}
