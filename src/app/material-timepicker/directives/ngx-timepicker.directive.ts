import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TimeAdapter } from '../services/time-adapter';
import { DateTime } from 'luxon';
import { TIME_LOCALE } from '../tokens/time-locale.token';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(() => TimepickerDirective),
    multi: true
};

@Directive({
    selector: '[ngxTimepicker]',
    providers: [VALUE_ACCESSOR],
    host: {
        '[disabled]': 'disabled',
        '(input)': 'onInput($event.target.value)',
        '(blur)': 'onTouched()',
    },
})
export class TimepickerDirective implements ControlValueAccessor, OnDestroy, OnChanges {

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
    }

    get format(): number {
        return this._format;
    }

    private _format = 12;

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

    private _min: string | DateTime;

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

    private _max: string | DateTime;

    @Input('ngxTimepicker')
    set timepicker(picker: NgxMaterialTimepickerComponent) {
        this.registerTimepicker(picker);
    }

    private _timepicker: NgxMaterialTimepickerComponent;

    @Input()
    set value(value: string) {
        if (!value) {
            this._value = '';
            this.updateInputValue();
            return;
        }
        const time = TimeAdapter.formatTime(value, {locale: this.locale, format: this.format});
        const isAvailable = TimeAdapter.isTimeAvailable(
            time,
            <DateTime>this._min,
            <DateTime>this._max,
            'minutes',
            this._timepicker.minutesGap,
            this._format
        );

        if (isAvailable) {
            this._value = time;
            this.updateInputValue();
            return;
        }
        console.warn('Selected time doesn\'t match min or max value');
    }

    get value(): string {
        if (!this._value) {
            return '';
        }
        return TimeAdapter.toLocaleTimeString(this._value, {format: this.format, locale: this.locale});
    }

    private _value = '';

    @Input() disabled: boolean;
    @Input() disableClick: boolean;

    private timepickerSubscriptions: Subscription[] = [];

    onTouched = () => {
    }

    private onChange: (value: any) => void = () => {
    }

    constructor(private elementRef: ElementRef,
                @Inject(TIME_LOCALE) private locale: string) {
    }

    private set defaultTime(time: string) {
        const formattedTime = TimeAdapter.formatTime(time, {locale: this.locale, format: this.format});

        this._timepicker.setDefaultTime(formattedTime);
    }

    onInput(value: string) {
        this.value = value;
        this.onChange(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['value'] && changes['value'].currentValue) {
            this.defaultTime = changes['value'].currentValue;
        }
    }

    @HostListener('click', ['$event'])
    onClick(event) {
        if (!this.disableClick) {
            this._timepicker.open();
            event.stopPropagation();
        }
    }

    writeValue(value: string): void {
        this.value = value;
        this.defaultTime = value;
    }

    registerOnChange(fn: (value: any) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnDestroy() {
        this.timepickerSubscriptions.forEach(s => s.unsubscribe());
    }

    private registerTimepicker(picker: NgxMaterialTimepickerComponent): void {
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscriptions.push(this._timepicker.timeSet.subscribe((time: string) => {
                this.value = time;
                this.onChange(this.value);
                this.onTouched();
            }));
            this.timepickerSubscriptions.push(
                this._timepicker.closed.subscribe(() => this.defaultTime = this._value));
        } else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    }

    private updateInputValue(): void {
        this.elementRef.nativeElement.value = this.value;
    }

}

