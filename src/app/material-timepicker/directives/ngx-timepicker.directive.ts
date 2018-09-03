import {
    Directive, ElementRef, forwardRef, HostListener, Input, OnChanges, OnDestroy,
    SimpleChanges
} from '@angular/core';
import {NgxMaterialTimepickerComponent} from '../ngx-material-timepicker.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Moment} from 'moment';
import {TimeAdapter} from '../services/time-adapter';

const VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
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

    @Input() disabled: boolean;
    @Input() disableClick: boolean;

    @Input('ngxTimepicker')
    set timepicker(picker: NgxMaterialTimepickerComponent) {
        this.registerTimepicker(picker);
    }

    private _timepicker: NgxMaterialTimepickerComponent;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
    }

    get format(): number {
        return this._format;
    }

    private _format: number;

    @Input()
    set min(value: string | Moment) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.convertTimeToMoment(value);
            return;
        }
        this._min = value;
    }

    get min(): string | Moment {
        return this._min;
    }

    private _min: string | Moment;

    @Input()
    set max(value: string | Moment) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.convertTimeToMoment(value);
            return;
        }
        this._max = value;
    }

    get max(): string | Moment {
        return this._max;
    }

    private _max: string | Moment;

    @Input()
    set value(value: string) {
        if (!value) {
            return;
        }
        this._value = TimeAdapter.formatTime(value, this._format);

        if (this.isValueAvailableToUpdate()) {
            this.updateInputValue();
            return;
        }
        console.warn('Selected time doesn\'t match min or max value');
    }

    get value(): string {
        return this._value;
    }

    private _value: string;

    private timepickerSubscription: Subscription;

    private onChange: (value: any) => void = () => {};
    onTouched = () => {};

    constructor(private elementRef: ElementRef) {
    }

    private set defaultTime(time: string) {
        if (this.isValueAvailableToUpdate()) {
            this._timepicker.setDefaultTime(TimeAdapter.formatTime(time, this._format));
        }
    }

    onInput(value: string) {
        this._value = value;
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
        this.timepickerSubscription.unsubscribe();
    }

    private registerTimepicker(picker: NgxMaterialTimepickerComponent): void {
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this.timepickerSubscription = this._timepicker.timeSet.subscribe((time: string) => {
                this.value = time;
                this.onChange(this._value);
                this.onTouched();
            });
        }
    }

    private updateInputValue(): void {
        this.elementRef.nativeElement.value = this._value;
    }

    private isValueAvailableToUpdate(): boolean {
        const isAfter = this._min && TimeAdapter.convertTimeToMoment(this._value).isAfter(this._min);
        const isBefore = this._max && TimeAdapter.convertTimeToMoment(this._value).isBefore(this._max);
        const isBetween = (this._min && this._max)
            && TimeAdapter.convertTimeToMoment(this._value).isBetween(this._min, this._max, 'minutes');
        const isAvailable = !this._min && !this._max;

        return isAfter || isBefore || isBetween || isAvailable;
    }
}

