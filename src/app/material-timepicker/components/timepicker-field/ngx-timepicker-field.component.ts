import {Component, forwardRef, Inject, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Observable, Subject } from 'rxjs';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TimeUnit } from '../../models/time-unit.enum';
import { NgxMaterialTimepickerTheme } from '../../models/ngx-material-timepicker-theme.interface';
import { takeUntil } from 'rxjs/operators';
import { TimeFormatterPipe } from '../../pipes/time-formatter.pipe';
import {TIME_LOCALE} from '../../tokens/time-locale.token';

@Component({
    selector: 'ngx-timepicker-field',
    templateUrl: './ngx-timepicker-field.component.html',
    styleUrls: ['./ngx-timepicker-field.component.scss'],
    providers: [
        NgxMaterialTimepickerService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxTimepickerFieldComponent),
            multi: true
        }
    ]
})
export class NgxTimepickerFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

    period$: Observable<TimePeriod>;

    hour: number;
    minute: number;

    minHour = 1;
    maxHour = 12;

    timeUnit = TimeUnit;
    timepickerTime: string;
    isDefaultTime: boolean;

    @Input() disabled: boolean;
    @Input() toggleIcon: TemplateRef<HTMLObjectElement>;
    @Input() buttonAlign: 'right' | 'left' = 'right';
    @Input() clockTheme: NgxMaterialTimepickerTheme;
    @Input() controlOnly: boolean;
    @Input() autoFormat: boolean;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
        this.hoursList = getHours(this._format);
    }

    get format(): number {
        return this.autoFormat ? this.getAutoFormat() : this._format;
    }


    @Input()
    set defaultTime(val: string) {
        this.timepickerService.setDefaultTimeIfAvailable(val, null, null, this._format);
        this._defaultTime = val;
        this.timepickerTime = val;
        this.isDefaultTime = !!val;
    }

    get defaultTime(): string {
        return this._defaultTime;
    }

    private _defaultTime: string;
    private _format = 12;

    private hoursList: ClockFaceTime[];
    private minutesList: ClockFaceTime[];

    private unsubscribe$ = new Subject();

    private onChange: (value: string) => void = () => {
    }

    constructor(private timepickerService: NgxMaterialTimepickerService,
                @Inject(TIME_LOCALE) private locale: string) {
    }

    ngOnInit() {
        this.period$ = this.timepickerService.selectedPeriod;

        this.timepickerService.selectedHour.pipe(takeUntil(this.unsubscribe$))
            .subscribe(hour => this.hour = hour.time);

        this.timepickerService.selectedMinute.pipe(takeUntil(this.unsubscribe$))
            .subscribe(minute => this.minute = minute.time);

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

    onTimeSet(time: string): void {
        this.defaultTime = time;
        this.onChange(time);
        this.formatTime();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
    }

    private changeTime(): void {
        const time = this.timepickerService.getFullTime(this._format);
        this.timepickerTime = time;
        this.onChange(time);
    }

    private formatTime(): void {
        this.hour = new TimeFormatterPipe().transform(this.hour, TimeUnit.HOUR);
        this.minute = new TimeFormatterPipe().transform(this.minute, TimeUnit.MINUTE);
    }

    private getAutoFormat(): number {
        const regex: RegExp = new RegExp('us|uk|ph|ca|au|nz|in|eg|sa|co|pk|my|sg|za');
        return  this.locale.toLowerCase().search(regex) !== -1 ?  12 : 24;
    }

}
