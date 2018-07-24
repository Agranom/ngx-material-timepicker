import {Directive, ElementRef, forwardRef, HostListener, Input, OnDestroy} from '@angular/core';
import {NgxMaterialTimepickerComponent} from '../ngx-material-timepicker.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TimeFormat} from '../models/time-format.enum';
import * as moment_ from 'moment';
import {Moment} from 'moment';
//Workaround for error "Cannot call a namespace ('moment')
const moment = moment_;

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
    }
})
export class TimepickerDirective implements ControlValueAccessor, OnDestroy {

    @Input() disabled: boolean;

    @Input('ngxTimepicker')
    set timepicker(picker: NgxMaterialTimepickerComponent) {
        this.registerTimepicker(picker);
    }

    private _timepicker: NgxMaterialTimepickerComponent;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
    }

    private _format: TimeFormat;

    @Input()
    set min(value: string | Moment) {
        if (typeof value === 'string') {
            this._min = convertTimeToMoment(value);
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
            this._max = convertTimeToMoment(value);
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
        this._value = formatTime(value, this._format);

        if (this._min && convertTimeToMoment(this._value).isAfter(this._min)) {
            this.updateValue(value);
            return;
        }
        if (this._max && convertTimeToMoment(this._value).isBefore(this._max)) {
            this.updateValue(value);
            return;
        }
        if ((this._min && this._max)
            && convertTimeToMoment(this._value).isBetween(this._min, this._max, 'minutes')) {
            this.updateValue(value);
            return;
        }
        if (!this._min && !this._max) {
            this.updateValue(value);
        }
        console.warn('Selected time doesn\'t match min or max value');
    }

    get value(): string {
        return this._value;
    }

    private _value: string;

    onTouched = () => {
    };

    private timepickerSubscription: Subscription;
    private onChange: (value: any) => void = () => {
    };

    constructor(private elementRef: ElementRef) {
    }

    onInput(value: string) {
        this._value = value;
        this.onChange(value);
    }

    @HostListener('click')
    onClick() {
        this._timepicker.open();
    }

    writeValue(value: string): void {
        this.value = value;
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
                this.onChange(time);
                this.onTouched();
            });
        }
    }

    private updateValue(value: string): void {
        this.elementRef.nativeElement.value = this._value;
        this._timepicker.setDefaultTime(formatTime(value));
    }
}

function formatTime(time: string, format = TimeFormat.TWELVE): string {
    return moment(time, TimeFormat.TWELVE).format(format);
}

function convertTimeToMoment(time: string): Moment {
    return moment(time, TimeFormat.TWELVE);
}
