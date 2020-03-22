import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Observable, Subject } from 'rxjs';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { NgxMaterialTimepickerTheme } from '../../models/ngx-material-timepicker-theme.interface';
import { TimeAdapter } from '../../services/time-adapter';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
import { DateTime } from 'luxon';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

@Component({
    selector: 'ngx-timepicker-field',
    templateUrl: './ngx-timepicker-field.component.html',
    styleUrls: ['./ngx-timepicker-field.component.scss'],
    providers: [
        NgxMaterialTimepickerService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: NgxTimepickerFieldComponent,
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxTimepickerFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

    period: TimePeriod;
    hour$: Observable<ClockFaceTime>;
    minute$: Observable<ClockFaceTime>;

    minHour = 1;
    maxHour = 12;

    timeUnit = TimeUnit;
    timepickerTime: string;

    hoursList: ClockFaceTime[];
    minutesList: ClockFaceTime[];

    isTimeRangeSet: boolean;

    @Input() disabled: boolean;
    @Input() toggleIcon: TemplateRef<HTMLObjectElement>;
    @Input() buttonAlign: 'right' | 'left' = 'right';
    @Input() clockTheme: NgxMaterialTimepickerTheme;
    @Input() controlOnly: boolean;
    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Input() confirmBtnTmpl: TemplateRef<Node>;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
        this.hoursList = TimepickerTimeUtils.getHours(this._format);
        const isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);

        if (isDynamicallyChanged) {
            this.updateTime(this.timepickerTime);
        }
        this.previousFormat = this._format;
    }

    get format(): number {
        return this._format;
    }

    @Input()
    set min(value: string | DateTime) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.parseTime(value, {locale: this.locale, format: this.format});
            return;
        }
        this._min = value;
    }

    get min(): string | DateTime {
        return this._min;
    }

    @Input()
    set max(value: string | DateTime) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.parseTime(value, {locale: this.locale, format: this.format});
            return;
        }
        this._max = value;
    }

    get max(): string | DateTime {
        return this._max;
    }

    @Input()
    set defaultTime(val: string) {
        this._defaultTime = val;
        this.isDefaultTime = !!val;
    }

    get defaultTime(): string {
        return this._defaultTime;
    }

    @Output() timeChanged = new EventEmitter<string>();

    private _defaultTime: string;
    private _format = 12;
    private _min: string | DateTime;
    private _max: string | DateTime;
    private previousFormat: number;

    private unsubscribe$ = new Subject();

    private isFirstTimeChange = true;
    private isDefaultTime: boolean;
    private selectedHour: number;

    private onChange: (value: string) => void = () => {
    }

    constructor(private timepickerService: NgxMaterialTimepickerService,
                @Inject(TIME_LOCALE) private locale: string) {
    }

    ngOnInit() {
        this.updateTime(this.defaultTime);

        this.hoursList = TimepickerTimeUtils.getHours(this._format);
        this.minutesList = TimepickerTimeUtils.getMinutes();

        this.hour$ = this.timepickerService.selectedHour.pipe(
            tap((clockTime: ClockFaceTime) => this.selectedHour = clockTime.time),
            map(this.changeDefaultTimeValue.bind(this)),
            tap(() => this.updateAvailableMinutes())
        ) as Observable<ClockFaceTime>;
        this.minute$ = this.timepickerService.selectedMinute.pipe(
            map(this.changeDefaultTimeValue.bind(this)),
            tap(() => this.isFirstTimeChange = false)
        ) as Observable<ClockFaceTime>;
        this.timepickerService.selectedPeriod.pipe(
            distinctUntilChanged<TimePeriod>(),
            tap((period: TimePeriod) => this.period = period),
            takeUntil(this.unsubscribe$)
        ).subscribe(() => this.updateAvailableTime());

        this.isTimeRangeSet = !!(this.min || this.max);
    }

    writeValue(val: string): void {
        if (val) {
            this.updateTime(val);
        } else {
            this.resetTime();
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
        this.updateTime(time);
        this.emitLocalTimeChange(time);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private changeTime(): void {
        const time = this.timepickerService.getFullTime(this._format);
        this.timepickerTime = time;

        this.emitLocalTimeChange(time);
    }

    private resetTime(): void {
        this.timepickerService.hour = {angle: 0, time: null};
        this.timepickerService.minute = {angle: 0, time: null};
    }

    private emitLocalTimeChange(time: string): void {
        const localTime = TimeAdapter.toLocaleTimeString(time, {format: this.format, locale: this.locale});

        this.onChange(localTime);
        this.timeChanged.emit(localTime);
    }

    private changeDefaultTimeValue(clockFaceTime: ClockFaceTime): ClockFaceTime {
        if (!this.isDefaultTime && this.isFirstTimeChange) {
            return {...clockFaceTime, time: null};
        }
        return clockFaceTime;
    }

    private updateAvailableHours(): void {
        this.hoursList = TimepickerTimeUtils.disableHours(this.hoursList, {
            min: this.min as DateTime,
            max: this.max as DateTime,
            format: this.format,
            period: this.period
        });
    }

    private updateAvailableMinutes(): void {
        this.minutesList = TimepickerTimeUtils.disableMinutes(this.minutesList, this.selectedHour, {
            min: this.min as DateTime,
            max: this.max as DateTime,
            format: this.format,
            period: this.period
        });
    }

    private updateAvailableTime(): void {
        this.updateAvailableHours();
        this.updateAvailableMinutes();
    }

    private updateTime(time: string): void {
        if (time) {
            const formattedTime = TimeAdapter.formatTime(time, {locale: this.locale, format: this.format});
            this.timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min as DateTime, this.max as DateTime, this.format);
            this.timepickerTime = formattedTime;
        }
    }

}
