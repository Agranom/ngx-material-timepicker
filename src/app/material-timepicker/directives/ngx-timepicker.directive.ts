import {Directive, ElementRef, forwardRef, HostListener, Input, OnDestroy} from '@angular/core';
import {NgxMaterialTimepickerComponent} from '../ngx-material-timepicker.component';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Subscription} from 'rxjs';
import {TimeFormat} from '../models/time-format.enum';
import * as moment_ from 'moment';
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
    onTouched = () => {
    };
    private timepickerSubscription: Subscription;
    private onChange: (value: any) => void = () => {
    };

    constructor(private elementRef: ElementRef) {
    }

    private _timepicker: NgxMaterialTimepickerComponent;

    @Input('ngxTimepicker')
    set timepicker(picker: NgxMaterialTimepickerComponent) {
        this.registerTimepicker(picker);
    }

    private _format: TimeFormat;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? TimeFormat.TWENTY_FOUR : TimeFormat.TWELVE;
    }

    private _value: string;

    @Input()
    get value(): string {
        return this._value;
    }

    set value(value: string) {
        this._value = formatTime(value, this._format);
        this.elementRef.nativeElement.value = value ? formatTime(value, this._format) : '';
        this._timepicker.setDefaultTime(formatTime(value));
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
            this.timepickerSubscription = this._timepicker.timeSet.subscribe((time: string) => {
                this.value = time;
                this.onChange(time);
                this.onTouched();
            });
        }
    }
}

function formatTime(time: string, format = TimeFormat.TWELVE): string {
    return moment(time, TimeFormat.TWELVE).format(format);
}
