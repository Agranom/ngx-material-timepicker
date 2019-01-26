import {Component, DebugElement, SimpleChanges} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TimepickerDirective} from './ngx-timepicker.directive';
import {By} from '@angular/platform-browser';
import {NgxMaterialTimepickerComponent} from '../ngx-material-timepicker.component';
import {NgxMaterialTimepickerModule} from '../ngx-material-timepicker.module';
import * as _moment from 'moment';

const moment = _moment;


@Component({
    template: `
        <input [ngxTimepicker]="picker">
        <ngx-material-timepicker #picker></ngx-material-timepicker>
    `
})
class TestComponent {

}

describe('TimepickerDirective', () => {
    const consoleWarnValue = 'Selected time doesn\'t match min or max value';
    let fixture: ComponentFixture<TestComponent>;
    let input: DebugElement;
    let directive: TimepickerDirective;
    let timepickerComponent: NgxMaterialTimepickerComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            imports: [NgxMaterialTimepickerModule.forRoot()]
        }).createComponent(TestComponent);
        input = fixture.debugElement.query(By.directive(TimepickerDirective));
        directive = input.injector.get<TimepickerDirective>(TimepickerDirective);
        timepickerComponent = TestBed.createComponent(NgxMaterialTimepickerComponent).componentInstance;
    });

    it('should register NgxMaterialTimepickerComponent', () => {
        const spy = spyOnProperty(directive, 'timepicker', 'set').and.callThrough();
        directive.timepicker = timepickerComponent;
        expect(spy).toHaveBeenCalledWith(timepickerComponent);
    });

    it('should throw Error if NgxMaterialTimepickerComponent is not defined', () => {
        spyOnProperty(directive, 'timepicker', 'set').and.callThrough();
        expect(() => directive.timepicker = null).toThrowError('NgxMaterialTimepickerComponent is not defined.' +
            ' Please make sure you passed the timepicker to ngxTimepicker directive');
    });

    it('should set 12 format', () => {
        directive.format = 25;
        expect(directive.format).toBe(12);
    });

    it('should set 24 format', () => {
        directive.format = 24;
        expect(directive.format).toBe(24);
    });

    it('should return min time in Moment type if pass string', () => {
        directive.min = '11:00 pm';
        expect(directive.min['hour']()).toBe(23);
        expect(directive.min['minute']()).toBe(0);
    });

    it('should return min time in Moment type if pass moment', () => {
        directive.min = moment().hour(10).minute(11);
        expect(directive.min['hour']()).toBe(10);
        expect(directive.min['minute']()).toBe(11);
    });

    it('should return max time in Moment type if pass string', () => {
        directive.max = '11:00 pm';
        expect(directive.max['hour']()).toBe(23);
        expect(directive.max['minute']()).toBe(0);
    });

    it('should return max time in Moment type if pass moment', () => {
        directive.max = moment().hour(10).minute(11);
        expect(directive.max['hour']()).toBe(10);
        expect(directive.max['minute']()).toBe(11);
    });

    it(`should clear the time if set value undefined, null, '' `, () => {
        directive.value = undefined;
        expect(directive.value).toBe('');
        directive.value = null;
        expect(directive.value).toBe('');
        directive.value = '';
        expect(directive.value).toBe('');
    });

    it('should return formatted time', () => {
        directive.value = '11:00';
        expect(directive.value).toBe('11:00 am');
    });

    it('should call console.warn if time is not between min and max(inclusively) value', () => {
        const spy = spyOn(console, 'warn');
        directive.min = '11:00 am';
        directive.value = '10:00 am';
        expect(spy).toHaveBeenCalledWith(consoleWarnValue);

        directive.max = '11:30 am';
        directive.value = '11:35 am';
        directive.value = '11:20 am';

        expect(spy).toHaveBeenCalledTimes(2);
    });

    it('should set default time once timepicker is closed and time is available', () => {
        const spy = spyOn(timepickerComponent, 'setDefaultTime');
        directive.timepicker = timepickerComponent;
        directive.value = '11:11 am';
        timepickerComponent.closed.next();
        expect(spy).toHaveBeenCalledWith('11:11 am');
    });

    it('should set time on timeSet output', () => {
        const time = '12:12 pm';
        directive.timepicker = timepickerComponent;
        timepickerComponent.timeSet.next(time);
        expect(directive.value).toBe(time);
    });

    it('should change time onInput', () => {
        directive.onInput('11:12');
        expect(directive.value).toBe('11:12 am');
    });

    it('should set Invalid date if time is in inappropriate format', () => {
        directive.value = 'test';
        expect(directive.value).toBe('Invalid date');
    });

    it('should set default time if binding value changes', () => {
        const changes: SimpleChanges = {
            value: {
                currentValue: '10:00 am',
                firstChange: true,
                previousValue: undefined,
                isFirstChange: () => null
            }
        };
        const spy = spyOn(timepickerComponent, 'setDefaultTime');

        directive.timepicker = timepickerComponent;
        directive.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledWith('10:00 am');
    });

    it('should not set default time if binding value does not change ', () => {
        const changes: SimpleChanges = {
            min: {
                currentValue: '11:00',
                firstChange: true,
                previousValue: undefined,
                isFirstChange: () => null
            }
        };
        const spy = spyOn(timepickerComponent, 'setDefaultTime');
        directive.timepicker = timepickerComponent;

        directive.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should open timepicker on click', () => {
        const spy = spyOn(timepickerComponent, 'open');
        directive.timepicker = timepickerComponent;

        directive.onClick({stopPropagation: () => null});
        expect(spy).toHaveBeenCalled();
    });

    it('should not open timepicker on click if disableClick is true', () => {
        const spy = spyOn(timepickerComponent, 'open');
        directive.timepicker = timepickerComponent;
        directive.disableClick = true;

        directive.onClick({stopPropagation: () => null});
        expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should update time and default time on writeValue function', () => {
        const spy = spyOn(timepickerComponent, 'setDefaultTime');
        const time = '11:11 am';
        directive.timepicker = timepickerComponent;

        directive.writeValue(time);
        expect(directive.value).toBe(time);
        expect(spy).toHaveBeenCalledWith(time);
    });

    it('should set onChange function on registerOnChange', () => {
        const spy = spyOn(console, 'log');
        const time = '11:12 am';

        directive.registerOnChange(console.log);
        directive.onInput(time);

        expect(spy).toHaveBeenCalledWith(time);
    });

    it('should set onTouch function on registerOnTouched', () => {
        const spy = spyOn(console, 'log');

        directive.registerOnTouched(console.log);
        directive.onTouched();

        expect(spy).toHaveBeenCalled();
    });

    it('should change disabled state on setDisabledState', () => {
        expect(directive.disabled).toBeFalsy();
        directive.setDisabledState(true);
        expect(directive.disabled).toBeTruthy();
    });
});
