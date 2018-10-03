import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TimepickerDirective} from '../directives/ngx-timepicker.directive';
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

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                TestComponent
            ],
            imports: [NgxMaterialTimepickerModule.forRoot()]
        }).createComponent(TestComponent);
        input = fixture.debugElement.query(By.directive(TimepickerDirective));
        directive = input.injector.get<TimepickerDirective>(TimepickerDirective);
    });

    it('should register NgxMaterialTimepickerComponent', () => {
        const timepicker = TestBed.createComponent(NgxMaterialTimepickerComponent).componentInstance;
        const spy = spyOnProperty(directive, 'timepicker', 'set').and.callThrough();
        directive.timepicker = timepicker;
        expect(spy).toHaveBeenCalledWith(timepicker);
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
        expect(directive.min.hour()).toBe(10);
        expect(directive.min.minute()).toBe(11);
    });

    it('should return max time in Moment type if pass string', () => {
        directive.max = '11:00 pm';
        expect(directive.max['hour']()).toBe(23);
        expect(directive.max['minute']()).toBe(0);
    });

    it('should return max time in Moment type if pass moment', () => {
        directive.max = moment().hour(10).minute(11);
        expect(directive.max.hour()).toBe(10);
        expect(directive.max.minute()).toBe(11);
    });

    it(`should return undefined if set value undefined, null, '' `, () => {
        directive.value = undefined;
        expect(directive.value).toBeUndefined();
        directive.value = null;
        expect(directive.value).toBeUndefined();
        directive.value = '';
        expect(directive.value).toBeUndefined();
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
});
