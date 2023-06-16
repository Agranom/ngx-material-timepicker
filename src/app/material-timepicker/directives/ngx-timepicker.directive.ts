import { Directive, ElementRef, HostListener, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime } from 'luxon';
import { Subscription } from 'rxjs';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';
import { TimeAdapter } from '../services/time-adapter';
import { TIME_LOCALE } from '../tokens/time-locale.token';

@Directive({
    selector: '[ngxTimepicker]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TimepickerDirective,
            multi: true
        }
    ],
    host: {
        '[disabled]': 'disabled',
        '(change)': 'updateValue($event.target.value)',
        '(blur)': 'onTouched()',
    },
})
export class TimepickerDirective implements ControlValueAccessor, OnDestroy, OnChanges {

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
        const isDynamicallyChanged = value && (this.previousFormat && this.previousFormat !== this._format);

        if (isDynamicallyChanged) {
            this.value = this._value;
            this._timepicker.updateTime(this._value);
        }
        this.previousFormat = this._format;
    }

    get format(): number {
        return this._format;
    }

    private _format = 12;

    @Input()
    set min(value: string | DateTime) {
        console.log(value);
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
        this.setTimeIfAvailable(value);
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
    private previousFormat: number;

    onTouched = () => {
    }

    private onChange: (value: any) => void = () => {
    }

    constructor(private elementRef: ElementRef,
                @Inject(TIME_LOCALE) private locale: string) {
    }

    get element(): any {
        return this.elementRef && this.elementRef.nativeElement;
    }

    private set defaultTime(time: string) {
        this._timepicker.defaultTime = TimeAdapter.formatTime(time, {locale: this.locale, format: this.format});
    }

    updateValue(value: string) {
        this.value = value;
        this.onChange(value);
    }

    ngOnChanges(changes: SimpleChanges) {
        const value = changes?.value?.currentValue;
        if (value) {
            // Call setTimeIfAvailable after @Input setters
            this.setTimeIfAvailable(value);
            this.defaultTime = value;
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
        if (value) {
            this.defaultTime = value;
        }
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
                this.defaultTime = this._value;
            }));
        } else {
            throw new Error('NgxMaterialTimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to ngxTimepicker directive');
        }
    }

    private updateInputValue(): void {
        this.elementRef.nativeElement.value = this.value;
    }

    private setTimeIfAvailable(value: string): void {
        const time = TimeAdapter.formatTime(value, {locale: this.locale, format: this.format});
        const isAvailable = TimeAdapter.isTimeAvailable(
            time,
            <DateTime>this._min,
            <DateTime>this._max,
            'minutes',
            this._timepicker?.minutesGap,
            this._format
        );

        if (isAvailable) {
            this._value = time;
            this.updateInputValue();
        } else {
            this.value = null;
            console.warn('Selected time doesn\'t match min or max value');
        }
    }
}

