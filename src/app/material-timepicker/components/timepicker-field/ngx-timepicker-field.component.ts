import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgxMaterialTimepickerService } from '../../services/ngx-material-timepicker.service';
import { Observable, Subject } from 'rxjs';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimePeriod } from '../../models/time-period.enum';
import { getHours, getMinutes } from '../../utils/timepicker-time.utils';
import { TimeUnit } from '../../models/time-unit.enum';
import { NgxMaterialTimepickerTheme } from '../../models/ngx-material-timepicker-theme.interface';
import { TimeAdapter } from '../../services/time-adapter';
import { TIME_LOCALE } from '../../tokens/time-locale.token';

@Component({
    selector: 'ngx-timepicker-field',
    templateUrl: './ngx-timepicker-field.component.html',
    styleUrls: ['./ngx-timepicker-field.component.scss'],
    providers: [
        NgxMaterialTimepickerService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: () => NgxTimepickerFieldComponent,
            multi: true
        }
    ]
})
export class NgxTimepickerFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

    period$: Observable<TimePeriod>;
    hour$: Observable<ClockFaceTime>;
    minute$: Observable<ClockFaceTime>;

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
    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Input() confirmBtnTmpl: TemplateRef<Node>;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
        this.hoursList = getHours(this._format);
        const isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);

        if (isDynamicallyChanged) {
            this.defaultTime = this.timepickerTime;
        }
        this.previousFormat = this._format;
    }

    get format(): number {
        return this._format;
    }


    @Input()
    set defaultTime(val: string) {
        const time = TimeAdapter.formatTime(val, {locale: this.locale, format: this._format});
        this.timepickerService.setDefaultTimeIfAvailable(time, null, null, this._format);
        this._defaultTime = time;
        this.timepickerTime = time;
        this.isDefaultTime = !!time;
    }

    get defaultTime(): string {
        return this._defaultTime;
    }

    @Output() timeChanged = new EventEmitter<string>();

    private _defaultTime: string;
    private _format = 12;
    private previousFormat: number;

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
        this.hour$ = this.timepickerService.selectedHour;
        this.minute$ = this.timepickerService.selectedMinute;

        this.hoursList = getHours(this._format);
        this.minutesList = getMinutes();
    }

    writeValue(val: string): void {
        if (val) {
            this.defaultTime = val;
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
        this.defaultTime = time;
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
}
