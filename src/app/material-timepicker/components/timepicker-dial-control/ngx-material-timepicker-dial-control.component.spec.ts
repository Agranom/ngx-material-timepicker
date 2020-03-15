import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxMaterialTimepickerDialControlComponent } from './ngx-material-timepicker-dial-control.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeLocalizerPipe } from '../../pipes/time-localizer.pipe';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { DateTime } from 'luxon';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';

describe('NgxMaterialTimepickerDialControlComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerDialControlComponent>;
    let component: NgxMaterialTimepickerDialControlComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                NgxMaterialTimepickerDialControlComponent,
                TimeLocalizerPipe,
                TimeParserPipe
            ],
            providers: [
                TimeParserPipe,
                {provide: TIME_LOCALE, useValue: 'ar-AE'}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerDialControlComponent);

        component = fixture.componentInstance;
    });

    it('should set current time to previous time, change time unit and emit focus event', async(() => {
        let counter = 0;
        component.timeUnitChanged.subscribe(unit => expect(unit).toBe(TimeUnit.MINUTE));
        component.focused.subscribe(() => expect(++counter).toBe(1));

        component.time = '10';
        expect(component.previousTime).toBeUndefined();

        component.saveTimeAndChangeTimeUnit({preventDefault: () => null} as FocusEvent, TimeUnit.MINUTE);

        expect(component.previousTime).toBe('10');
    }));

    it('should emit changed time if it exists and available', fakeAsync(() => {
        const timeMock = {time: 1, angle: 30, disabled: false};
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = '1';
        component.updateTime();

        tick();
        expect(time).toEqual(timeMock);
        expect(component.previousTime).toBe(1);
    }));

    it('should not emit changed time if it does not exists', fakeAsync(() => {
        const timeMock = {time: 1, angle: 30};
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = '';
        component.updateTime();

        tick();
        expect(time).toBeNull();
        expect(component.previousTime).toBeUndefined();
    }));

    describe('changeTimeByKeyboard', () => {
        let counter = 0;
        const event = {
            keyCode: 0,
            preventDefault: () => {
                counter++;
            },
            type: 'keypress'
        } as KeyboardEvent;

        beforeEach(() => {
            counter = 0;
            component.timeList = TimepickerTimeUtils.getHours(24);
        });

        it('should call preventDefault if no time exist or time disabled', () => {
            const NUM_1 = 49; // 1
            component.timeList = [{time: 1, angle: 30, disabled: true}];
            component.time = '1';


            component.changeTimeByKeyboard({...event, keyCode: NUM_1});
            expect(counter).toBe(1);

            component.time = '';
            component.changeTimeByKeyboard({...event, keyCode: NUM_1});
            expect(counter).toBe(2);
        });

        it('should not call preventDefault if provided value is not a number', () => {
            const CHAR_A = 65; // a
            component.time = '1';

            component.changeTimeByKeyboard({...event, keyCode: CHAR_A});
        });
    });

    describe('onKeyDown', () => {
        let counter = 0;
        const event = {
            keyCode: 0,
            preventDefault: () => {
                counter++;
            },
            type: 'keydown'
        } as KeyboardEvent;

        beforeEach(() => {
            counter = 0;
            component.timeList = TimepickerTimeUtils.getHours(24);
        });


        it('should call preventDefault when trying to write not a number', () => {
            const CHAR_A = 65; // a
            component.time = '1';

            component.onKeydown({...event, keyCode: CHAR_A});
            expect(counter).toBe(1);
            expect(component.time).toBe('1');
        });

        it('should do not change time if value other than number and letter is provided', () => {
            const ARROW_LEFT = 37; // arrow_left
            component.time = '1';

            component.onKeydown({...event, keyCode: ARROW_LEFT});
            expect(counter).toBe(0);
            expect(component.time).toBe('1');
        });

        it('should up time by 1', () => {
            const ARROW_UP = 38;
            component.time = '11';

            component.onKeydown({...event, keyCode: ARROW_UP});
            expect(component.time).toBe('12');
        });

        it('should down time by 1', () => {
            const ARROW_DOWN = 40;
            component.time = '11';

            component.onKeydown({...event, keyCode: ARROW_DOWN});
            expect(component.time).toBe('10');
        });

        it('should up time by 7', () => {
            const ARROW_UP = 38;
            component.time = '11';
            component.minutesGap = 7;

            component.onKeydown({...event, keyCode: ARROW_UP});
            expect(component.time).toBe('18');
        });

        it('should down time by 6', () => {
            const ARROW_DOWN = 40;
            component.time = '11';
            component.minutesGap = 6;

            component.onKeydown({...event, keyCode: ARROW_DOWN});
            expect(component.time).toBe('5');
        });
    });

    describe('onModelChange', () => {

        it('should parse value and set it to time property', () => {
            const unparsedTime = DateTime.fromObject({minute: 10, numberingSystem: 'arab'}).toFormat('m');
            component.time = '5';
            component.timeUnit = TimeUnit.MINUTE;

            component.onModelChange(unparsedTime);

            expect(component.time).toBe(String(10));

        });
    });
});
