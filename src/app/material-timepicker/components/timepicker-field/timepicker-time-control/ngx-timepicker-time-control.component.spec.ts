import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxTimepickerTimeControlComponent } from './ngx-timepicker-time-control.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
import { DateTime } from 'luxon';
import { NgxMaterialTimepickerModule } from '../../../ngx-material-timepicker.module';
import { TimeFormatterPipe } from '../../../pipes/time-formatter.pipe';

describe('NgxTimepickerTimeControlComponent', () => {
    let fixture: ComponentFixture<NgxTimepickerTimeControlComponent>;
    let component: NgxTimepickerTimeControlComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxMaterialTimepickerModule.setLocale('ar-AE')],
            providers: [
                TimeParserPipe,
                TimeFormatterPipe
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(NgxTimepickerTimeControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });


    it('should increase time', async(() => {
        component.time = 1;
        component.min = 1;
        component.max = 12;
        component.disabled = false;

        component.timeChanged.subscribe(t => expect(t).toBe(2));

        component.increase();
    }));

    it('should set time to min when increase time', async(() => {
        component.time = 12;
        component.min = 1;
        component.max = 12;
        component.disabled = false;

        component.timeChanged.subscribe(t => expect(t).toBe(1));

        component.increase();
    }));

    it('should decrease time', async(() => {
        component.time = 5;
        component.min = 1;
        component.max = 12;
        component.disabled = false;

        component.timeChanged.subscribe(t => expect(t).toBe(4));

        component.decrease();
    }));

    it('should set time to max when decrease time', async(() => {
        component.time = 1;
        component.min = 1;
        component.max = 12;
        component.disabled = false;

        component.timeChanged.subscribe(t => expect(t).toBe(12));

        component.decrease();
    }));

    it('should not call increase or decrease if disabled true', () => {
        component.time = 1;
        component.disabled = true;

        component.increase();
        expect(component.time).toBe(1);

        component.decrease();
        expect(component.time).toBe(1);
    });


    describe('onKeydown', () => {

        it('should increase time by 1 when key down arrow up', async(() => {
            const event: KeyboardEvent = {key: 'ArrowUp'} as KeyboardEvent;
            component.time = 1;
            component.timeChanged.subscribe(time => expect(time).toBe(2));
            component.onKeydown(event);
        }));

        it('should decrease time by 1 when key down arrow down', async(() => {
            const event: KeyboardEvent = {key: 'ArrowDown'} as KeyboardEvent;
            component.time = 5;
            component.timeChanged.subscribe(time => expect(time).toBe(4));
            component.onKeydown(event);
        }));

        it('should call preventDefault and not change time', () => {
            let counter = 0;
            const event = {keyCode: 70, preventDefault: () => counter++};
            component.time = 1;
            // @ts-ignore
            component.onKeydown(event as KeyboardEvent);
            expect(counter).toBe(1);
        });

        it('should set time to 14 when onKeydown event fires with keycode 52', async(() => {
            const event = {keyCode: 52}; // 4
            const expectedTime = 14;

            component.time = 1;
            component.min = 0;
            component.max = 59;
            component.timeChanged.subscribe(time => expect(time).toBe(expectedTime));

            component.onKeydown(event as KeyboardEvent);
            expect(component.time).toBe(expectedTime);
        }));

        it('should set time to 4 when provided value more than max', () => {
            const event = {keyCode: 52}; // 4
            component.time = 4;
            component.min = 1;
            component.max = 23;

            component.onKeydown(event as KeyboardEvent);

            expect(component.time).toBe(4);
        });

        it('should set time to 22 when provided value less than min', () => {
            const event = {keyCode: 48}; // 0
            component.time = 1;
            component.min = 22;
            component.max = 23;

            component.onKeydown(event as KeyboardEvent);
            expect(component.time).toBe(22);
        });

        it('should not change time if value is NaN', () => {
            const event = {keyCode: 83, preventDefault: () => null}; // s
            component.time = 1;
            component.min = 1;
            component.max = 23;

            component.onKeydown(event as KeyboardEvent);
            expect(component.time).toBe(1);
        });
    });


    describe('ngOnChanges', () => {
        const changes: SimpleChanges = {
            time: {
                currentValue: 10,
                firstChange: true,
                isFirstChange: () => true,
                previousValue: undefined
            }
        };

        it('should set time to null', () => {
            component.time = 7;
            component.isDefaultTimeSet = false;
            component.ngOnChanges(changes);

            expect(component.time).toBeNull();
        });

        it('should not change time', () => {
            const isFirstChange = () => false;
            component.time = 7;
            component.ngOnChanges({time: {...changes.time, isFirstChange}});

            expect(component.time).toBe(7);

            component.isDefaultTimeSet = true;
            component.ngOnChanges(changes);

            expect(component.time).toBe(7);
        });
    });

    describe('onModelChange', () => {

        it('should parse value and set it to time property', () => {
            const unparsedTime = DateTime.fromObject({minute: 10, numberingSystem: 'arab'}).toFormat('m');
            component.time = 5;
            component.timeUnit = TimeUnit.MINUTE;

            component.onModelChange(unparsedTime);

            expect(component.time).toBe(10);

        });
    });

    describe('onFocus', () => {

        it('should change focus flag to true and set previousTime when focus event fires', () => {
            component.isFocused = false;
            component.onFocus();

            expect(component.isFocused).toBeTruthy();
        });
    });

    describe('onBlur', () => {

        it('should change focus flag to false when blur event fires', () => {
            component.isFocused = true;

            component.onBlur();
            expect(component.isFocused).toBeFalsy();
        });

        it('should emit time when blur event fires and time was changed', async(() => {
            const expectedTime = 10;
            component.time = expectedTime;

            component.timeChanged.subscribe(time => expect(time).toBe(expectedTime));

            component.onBlur();
        }));

        it('should not emit time when blur event fires and time was not changed', fakeAsync(() => {
            let counter = 0;
            component.time = 10;

            component.timeChanged.subscribe(() => ++counter);

            component.onFocus();
            component.onBlur();

            tick();

            expect(counter).toBe(0);
        }));
    });
});
