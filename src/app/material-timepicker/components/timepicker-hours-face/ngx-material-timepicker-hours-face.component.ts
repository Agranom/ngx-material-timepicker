import {Component, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimePeriod} from '../../models/time-period.enum';
import * as _moment from 'moment';
import {Moment} from 'moment';

const moment = _moment;
const HOURS = 12;

@Component({
    selector: 'ngx-material-timepicker-hours-face',
    templateUrl: './ngx-material-timepicker-hours-face.component.html',
})
export class NgxMaterialTimepickerHoursFaceComponent implements OnChanges {

    hoursList: ClockFaceTime[] = [];

    @Input() selectedHour: ClockFaceTime;
    @Input() period: TimePeriod;
    @Input() minTime: Moment;
    @Input() maxTime: Moment;
    @Output() hourChange = new EventEmitter<ClockFaceTime>();
    @Output() hourSelected = new EventEmitter<null>();

    constructor() {
        const angleStep = 360 / HOURS;
        this.hoursList = Array(HOURS).fill(1).map((v, i) => {
            return {time: v + i, angle: angleStep * (v + i)};
        });
    }

    private get disabledHours(): ClockFaceTime[] {
        if (this.minTime || this.maxTime) {

            return this.hoursList.map(value => {
                const currentHour = this.period === TimePeriod.AM ? +value.time : +value.time + 12;
                const hour = this.period === TimePeriod.AM && currentHour === 12 ? 0 : currentHour;
                const currentTime = moment().hour(hour);
                // console.log(currentTime);

                return {
                    ...value,
                    disabled: currentTime.isBefore(this.minTime || null, 'hours')
                    || currentTime.isAfter(this.maxTime || null, 'hours')
                };
            });
        }
        return this.hoursList;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue) {
            this.hoursList = this.disabledHours;
        }
    }

    @HostListener('touchend')
    @HostListener('click')
    onClick() {
        this.hourSelected.next();
    }
}

