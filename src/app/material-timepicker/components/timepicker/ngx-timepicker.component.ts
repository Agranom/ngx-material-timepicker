import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Observable } from 'rxjs';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TimeUnit } from '../../models/time-unit.enum';

@Component({
    selector: 'ngx-timepicker',
    templateUrl: './ngx-timepicker.component.html',
    styleUrls: ['./ngx-timepicker.component.scss'],
    providers: [
        NgxMaterialTimepickerService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxTimepickerComponent),
            multi: true
        }
    ]
})
export class NgxTimepickerComponent implements OnInit, ControlValueAccessor {

    hour$: Observable<ClockFaceTime>;
    minute$: Observable<ClockFaceTime>;
    period$: Observable<TimePeriod>;

    minHour = 1;
    maxHour = 12;

    timeUnit = TimeUnit;

    @Input() disabled: boolean;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
    }

    get format(): number {
        return this._format;
    }

    private _format = 12;

    @Input()
    set defaultTime(val: string) {
        this.timepickerService.setDefaultTimeIfAvailable(val, null, null, this._format);
        this._defaultTime = val;
    }

    get defaultTime(): string {
        return this._defaultTime;
    }

    private _defaultTime: string;

    private hoursList: ClockFaceTime[];
    private minutesList: ClockFaceTime[];

    private onChange: (value: string) => void;

    constructor(private timepickerService: NgxMaterialTimepickerService) {
    }

    ngOnInit() {
        this.hour$ = this.timepickerService.selectedHour;
        this.minute$ = this.timepickerService.selectedMinute;
        this.period$ = this.timepickerService.selectedPeriod;

        this.hoursList = getHours(this._format);
        this.minutesList = getMinutes();
    }

    writeValue(val: string): void {
        if (val) {
            this.defaultTime = val;
        }
    }

    registerOnTouched(fn: any): void {
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    changeHour(hour: number): void {
        this.timepickerService.hour = this.hoursList.find(h => h.time === hour);
        this.changeTime();
    }

    changeMinute(minute: number): void {
        this.timepickerService.minute = this.minutesList.find(m => m.time === minute);
        this.changeTime();
    }

    changePeriod(period: TimePeriod): void {
        this.timepickerService.period = period;
        this.changeTime();
    }

    private changeTime(): void {
        const time = this.timepickerService.getFullTime(this._format);
        this.onChange(time);
    }
}
