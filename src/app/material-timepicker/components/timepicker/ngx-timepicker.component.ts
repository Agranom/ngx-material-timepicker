import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Observable } from 'rxjs';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';

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

    private onChange: (value: string) => void = () => {
    }

    constructor(private timepickerService: NgxMaterialTimepickerService) {
    }

    ngOnInit() {
        this.hour$ = this.timepickerService.selectedHour;
        this.minute$ = this.timepickerService.selectedMinute;
        this.period$ = this.timepickerService.selectedPeriod;
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

    selectPeriod(period: TimePeriod): void {
        this.timepickerService.period = period;
    }

}
