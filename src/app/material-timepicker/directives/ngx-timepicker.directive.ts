import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
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
    onTouched = () => {
    };
    private timepickerSubscriptions: Subscription[] = [];
    private onChange: (value: any) => void = () => {
    };

    constructor(private elementRef: ElementRef) {
    }

    private _timepicker: NgxMaterialTimepickerComponent;

    @Input('ngxTimepicker')
    set timepicker(picker: NgxMaterialTimepickerComponent) {
        this.registerTimepicker(picker);
    }

    private _format: number;

    get format(): number {
        return this._format;
    }

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
    }

    private _min: string | Moment;

    get min(): string | Moment {
        return this._min;
    }

    @Input()
    set min(value: string | Moment) {
        if (typeof value === 'string') {
            this._min = TimeAdapter.convertTimeToMoment(value);
            return;
        }
        this._min = value;
    }

    private _max: string | Moment;

    get max(): string | Moment {
        return this._max;
    }

    @Input()
    set max(value: string | Moment) {
        if (typeof value === 'string') {
            this._max = TimeAdapter.convertTimeToMoment(value);
            return;
        }
        this._max = value;
    }

    private _value: string;

    get value(): string {
        return this._value;
    }

    @Input()
    set value(value: string) {
        if (!value) {
            return;
        }
        const time = TimeAdapter.formatTime(value, this._format);
        if (TimeAdapter.isTimeAvailable(time, <Moment>this._min, <Moment>this._max, 'minutes')) {
            this._value = time;
            this.updateInputValue();
            return;
        }
        console.warn('Selected time doesn\'t match min or max value');
    }

    private set defaultTime(time: string) {
        if (TimeAdapter.isTimeAvailable(time, <Moment>this._min, <Moment>this._max, 'minutes')) {
            this._timepicker.setDefaultTime(TimeAdapter.formatTime(time, this._format));
        }
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
                this.onChange(this._value);
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
        this.elementRef.nativeElement.value = this._value;
    }

}

