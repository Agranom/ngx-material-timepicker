import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimeLocalizerPipe } from '../../pipes/time-localizer.pipe';
import { TimeParserPipe } from '../../pipes/time-parser.pipe';
import { NUMBERING_SYSTEM, TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
import { NgxMaterialTimepickerDialControlComponent } from './ngx-material-timepicker-dial-control.component';

describe('NgxMaterialTimepickerDialControlComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerDialControlComponent>;
    let component: NgxMaterialTimepickerDialControlComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                NgxMaterialTimepickerDialControlComponent,
                TimeLocalizerPipe,
                TimeParserPipe,
            ],
            providers: [
                TimeParserPipe,
                TimeLocalizerPipe,
                { provide: TIME_LOCALE, useValue: 'ar-AE' },
                { provide: NUMBERING_SYSTEM, useValue: 'arab' },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        }).createComponent(NgxMaterialTimepickerDialControlComponent);

        component = fixture.componentInstance;
        component.timeList = [];
    });

    it('should set current time to previous time, change time unit and emit focus event', waitForAsync(() => {
        let counter = 0;
        component.timeUnitChanged.subscribe(unit => expect(unit).toBe(TimeUnit.MINUTE));
        component.focused.subscribe(() => expect(++counter).toBe(1));

        component.time = '10';
        expect(component.previousTime).toBeUndefined();

        component.saveTimeAndChangeTimeUnit({ preventDefault: () => null } as FocusEvent, TimeUnit.MINUTE);

        expect(component.previousTime).toBe('10');
    }));

    it('should emit changed time if it exists and available', fakeAsync(() => {
        const timeMock = { time: 1, angle: 30, disabled: false };
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = '1';
        component.isEditable = false;
        component.editableTimeTmpl = { nativeElement: { value: '' } } as ElementRef<HTMLInputElement>;
        component.updateTime();

        tick();
        expect(time).toEqual(timeMock);
        expect(component.previousTime).toBe(1);
        expect(component.editableTimeTmpl.nativeElement.value).toBe('');
    }));

    it('should not emit changed time if it does not exists', fakeAsync(() => {
        const timeMock = { time: 1, angle: 30 };
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = '';
        component.updateTime();

        tick();
        expect(time).toBeNull();
        expect(component.previousTime).toBeUndefined();
    }));

    describe('onKeyDown', () => {
        let counter = 0;
        const event = {
            keyCode: 0,
            preventDefault: () => {
                counter++;
            },
            type: 'keydown',
        } as KeyboardEvent;

        beforeEach(() => {
            counter = 0;
            component.timeList = TimepickerTimeUtils.getHours(24);
        });


        it('should call preventDefault when trying to write not a number', () => {
            const CHAR_A = 65; // a
            component.time = '1';

            component.onKeydown({ ...event, keyCode: CHAR_A });
            expect(counter).toBe(1);
            expect(component.time).toBe('1');
        });

        it('should do not change time if value other than number and letter is provided', () => {
            const ARROW_LEFT = 37; // arrow_left
            component.time = '1';

            component.onKeydown({ ...event, keyCode: ARROW_LEFT });
            expect(counter).toBe(0);
            expect(component.time).toBe('1');
        });

        it('should up time by 1', () => {
            const ARROW_UP = 38;
            component.time = '11';

            component.onKeydown({ ...event, keyCode: ARROW_UP });
            expect(component.time).toBe('12');
        });

        it('should down time by 1', () => {
            const ARROW_DOWN = 40;
            component.time = '11';

            component.onKeydown({ ...event, keyCode: ARROW_DOWN });
            expect(component.time).toBe('10');
        });

        it('should up time by 7', () => {
            const ARROW_UP = 38;
            component.time = '11';
            component.minutesGap = 7;

            component.onKeydown({ ...event, keyCode: ARROW_UP });
            expect(component.time).toBe('18');
        });

        it('should down time by 6', () => {
            const ARROW_DOWN = 40;
            component.time = '11';
            component.minutesGap = 6;

            component.onKeydown({ ...event, keyCode: ARROW_DOWN });
            expect(component.time).toBe('5');
        });
    });

    describe('onInit with Editable mode', () => {
        beforeEach(() => {
            component.timeUnit = TimeUnit.MINUTE;
            component.isEditable = true;
            component.editableTimeTmpl = { nativeElement: { value: '' } } as ElementRef<HTMLInputElement>;
        });

        it('should set value to form control', () => {
            component.time = '10';
            component.ngOnInit();
            component.ngOnChanges();
            const timeControl = component.timeControl;
            expect(timeControl.value).toBe('10');
            expect(timeControl.enabled).toBeTruthy();
        });

        it('should not set value to form control if form control is not available yet', () => {
            component.time = '10';
            component.ngOnChanges();
            const timeControl = component.timeControl;
            expect(timeControl).toBe(undefined);
        });

        it('should disable form control', () => {
            component.disabled = true;
            component.ngOnInit();
            expect(component.timeControl.enabled).toBeFalsy();
        });

        it('should emit time after 500 ms', fakeAsync(() => {
            const timeMock = { time: 1, angle: 30, disabled: false };
            let time = null;
            component.time = '10';
            component.timeList = [timeMock];
            component.timeChanged.subscribe(t => time = t);
            component.ngOnInit();
            component.timeControl.patchValue('1');

            tick(500);
            expect(time).toEqual(timeMock);
            expect(component.editableTimeTmpl.nativeElement.value).toBe('01');
        }));

        it('should not emit time after 500 ms if selected time disabled', fakeAsync(() => {
            const timeMock = { time: 1, angle: 30, disabled: true };
            let time = null;
            component.time = '10';
            component.timeList = [timeMock];
            component.timeChanged.subscribe(t => time = t);
            component.ngOnInit();
            component.timeControl.patchValue('1');

            tick(500);
            expect(time).toBeNull();
            expect(component.editableTimeTmpl.nativeElement.value).toBe('');
        }));

        it('should set the latest char of value to input if value more than 2 chars', fakeAsync(() => {
            const timeMock = { time: 1, angle: 30, disabled: false };
            let time = null;
            component.time = '10';
            component.timeList = [timeMock];
            component.timeChanged.subscribe(t => time = t);
            component.ngOnInit();
            component.timeControl.patchValue('221');
            tick();
            expect(component.editableTimeTmpl.nativeElement.value).toBe('1');
            tick(500);
        }));
    });
});
