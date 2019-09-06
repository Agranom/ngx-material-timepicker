import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTimepickerTimeControlComponent } from './ngx-timepicker-time-control.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { TimeUnit } from '../../../models/time-unit.enum';
import { TimeParserPipe } from '../../../pipes/time-parser.pipe';
import { DateTime } from 'luxon';
import { NgxMaterialTimepickerModule } from '../../../ngx-material-timepicker.module';

describe('NgxTimepickerTimeControlComponent', () => {
    let fixture: ComponentFixture<NgxTimepickerTimeControlComponent>;
    let component: NgxTimepickerTimeControlComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxMaterialTimepickerModule.setLocale('ar-AE')],
            providers: [
                TimeParserPipe
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(NgxTimepickerTimeControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should format time when onInit', () => {
        component.time = 1;
        component.timeUnit = TimeUnit.HOUR;
        component.isDefaultTimeSet = true;
        component.ngOnInit();

        // @ts-ignore
        expect(component.time).toBe('01');
    });

    it('should not format time when onInit', () => {
        component.time = 1;
        component.isDefaultTimeSet = false;
        component.ngOnInit();

        // @ts-ignore
        expect(component.time).toBe(1);
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

    it('should change focus flag to true when focus event fires', () => {
        component.isFocused = false;
        component.onFocus();

        expect(component.isFocused).toBeTruthy();
    });

    it('should change focus flag to false and format time when blur event fires', () => {
        component.isFocused = true;
        component.time = 1;
        component.timeUnit = TimeUnit.HOUR;

        component.onBlur();
        expect(component.isFocused).toBeFalsy();
        // @ts-ignore
        expect(component.time).toBe('01');
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
    });

    describe('onInput', () => {

        beforeEach(() => {
            component.time = 4;
            component.min = 1;
            component.max = 12;
        });

        it('should set time to 10 when input event fires', async(() => {
            const input: HTMLInputElement = {value: '10'} as HTMLInputElement;
            const expectedTime = 10;
            component.timeChanged.subscribe(time => expect(time).toBe(expectedTime));

            component.onInput(input);
            expect(component.time).toBe(expectedTime);
            expect(input.value).toBe(String(expectedTime));
        }));

        it('should set time to 2 when input value more than max', () => {
            const input: HTMLInputElement = {value: '22'} as HTMLInputElement;

            component.onInput(input);
            expect(component.time).toBe(2);
            expect(input.value).toBe('2');
        });

        it('should set time to 1 when input value less than min', () => {
            const input: HTMLInputElement = {value: '0'} as HTMLInputElement;

            component.onInput(input);
            expect(component.time).toBe(1);
            expect(input.value).toBe('1');
        });

        it('should not change input and time if value is NaN', () => {
            const input: HTMLInputElement = {value: 'ef'} as HTMLInputElement;

            component.onInput(input);
            expect(component.time).toBe(4);
            expect(input.value).toBe('ef');
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
});
