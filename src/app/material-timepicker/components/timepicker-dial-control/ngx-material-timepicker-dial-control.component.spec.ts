import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxMaterialTimepickerDialControlComponent } from './ngx-material-timepicker-dial-control.component';
import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { TimeUnit } from '../../models/time-unit.enum';
import { getHours } from '../../utils/timepicker-time.utils';
import { TimeLocalizerPipe } from '../../pipes/time-localizer.pipe';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimeAdapter } from '../../services/time-adapter';

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
                {provide: TIME_LOCALE, useValue: TimeAdapter.DEFAULT_LOCALE}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerDialControlComponent);

        component = fixture.componentInstance;
    });

    it('should set current time to previous time, change time unit and emit focus event', async (() => {
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

    it('should format time once it changes', () => {
        const changes: SimpleChanges = {
            time: {
                previousValue: undefined,
                currentValue: 1,
                firstChange: true,
                isFirstChange: () => null
            }
        };
        component.timeUnit = TimeUnit.HOUR;
        component.ngOnChanges(changes);

        expect(component.time).toBe('01');
    });

    it('should not format time if editable and the second change', () => {
        const changes: SimpleChanges = {
            time: {
                previousValue: undefined,
                currentValue: '1',
                firstChange: false,
                isFirstChange: () => null
            }
        };
        component.time = '4';
        component.timeUnit = TimeUnit.HOUR;
        component.isEditable = true;
        component.ngOnChanges(changes);

        expect(component.time).toBe('4');
    });

    it('should do nothing', () => {
        const changes: SimpleChanges = {
            timeUnit: {
                previousValue: undefined,
                currentValue: null,
                firstChange: false,
                isFirstChange: () => null
            }
        };
        component.time = '4';
        component.ngOnChanges(changes);
        expect(component.time).toBe('4');
    });

    it('should format time if editable and emit unfocused event', async(() => {
        let counter = 0;

        component.isEditable = true;
        component.time = '2';
        component.previousTime = 4;
        component.timeUnit = TimeUnit.MINUTE;

        component.formatTime();
        expect(component.time).toBe('02');

        component.unfocused.subscribe(() => expect(++counter).toBe(1));
        component.time = '';
        component.formatTime();

        expect(component.time).toBe('04');
        component.time = '5';
        component.isEditable = false;
        component.formatTime();
        expect(component.time).toBe('5');
    }));

    describe('onKeyDown', () => {
        let counter = 0;
        const event = {
            keyCode: 0, preventDefault: () => {
                counter++;
            }
        } as KeyboardEvent;

        beforeEach(() => {
            counter = 0;
            component.timeList = getHours(24);
        });

        it('should call preventDefault if no time exist or time disabled', () => {
            const NUM_1 = 49; // 1
            component.timeList = [{time: 1, angle: 30, disabled: true}];
            component.time = '1';


            component.onKeyDown({...event, keyCode: NUM_1});
            expect(counter).toBe(1);

            component.time = '';
            component.onKeyDown({...event, keyCode: NUM_1});
            expect(counter).toBe(2);
        });

        it('should up time by 1', () => {
            const ARROW_UP = 38;
            component.time = '11';

            component.onKeyDown({...event, keyCode: ARROW_UP});
            expect(component.time).toBe('12');
        });

        it('should down time by 1', () => {
            const ARROW_DOWN = 40;
            component.time = '11';

            component.onKeyDown({...event, keyCode: ARROW_DOWN});
            expect(component.time).toBe('10');
        });

        it('should up time by 7', () => {
            const ARROW_UP = 38;
            component.time = '11';
            component.minutesGap = 7;

            component.onKeyDown({...event, keyCode: ARROW_UP});
            expect(component.time).toBe('18');
        });

        it('should down time by 6', () => {
            const ARROW_DOWN = 40;
            component.time = '11';
            component.minutesGap = 6;

            component.onKeyDown({...event, keyCode: ARROW_DOWN});
            expect(component.time).toBe('5');
        });
    });
});
