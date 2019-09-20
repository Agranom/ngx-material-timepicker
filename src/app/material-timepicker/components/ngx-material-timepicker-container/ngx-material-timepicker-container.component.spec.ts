import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AnimationState, NgxMaterialTimepickerContainerComponent } from './ngx-material-timepicker-container.component';
import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimepickerRef } from '../../models/timepicker-ref.interface';
import { of, Subject } from 'rxjs';
import { DateTime } from 'luxon';
import { TimeUnit } from '../../models/time-unit.enum';
import { TimePeriod } from '../../models/time-period.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { NgxMaterialTimepickerEventService } from '../../services/ngx-material-timepicker-event.service';

@Component({
    template: ''
})
class TimepickerBaseRefStub implements TimepickerRef {
    timeUpdated = new Subject<string>().asObservable();

    @Output() hourSelected = new EventEmitter<number>();
    @Output() timeSet = new EventEmitter<string>();

    close(): void {
    }
}

describe('NgxMaterialTimepickerContainerComponent', () => {
    let component: NgxMaterialTimepickerContainerComponent;
    let fixture: ComponentFixture<NgxMaterialTimepickerContainerComponent>;
    let timepickerBaseRefStub: TimepickerRef;
    let eventService: NgxMaterialTimepickerEventService;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule],
            declarations: [
                NgxMaterialTimepickerContainerComponent,
                TimepickerBaseRefStub
            ],
            providers: [
                {
                    provide: NgxMaterialTimepickerEventService, useValue: {
                        dispatchEvent: (e) => null
                    }
                }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .createComponent(NgxMaterialTimepickerContainerComponent);

        component = fixture.componentInstance;
        timepickerBaseRefStub = TestBed.createComponent(TimepickerBaseRefStub).componentInstance;
        component.timepickerBaseRef = timepickerBaseRefStub;
        eventService = TestBed.get(NgxMaterialTimepickerEventService);
        fixture.detectChanges();
    });

    it('should create a component', () => {
        expect(component).toBeTruthy();
    });

    describe('changeTimeUnit', () => {
        it('should change time unit from HOUR to MINUTE', () => {
            expect(component.activeTimeUnit).toBe(TimeUnit.HOUR);

            component.changeTimeUnit(TimeUnit.MINUTE);

            expect(component.activeTimeUnit).toBe(TimeUnit.MINUTE);
        });
    });

    describe('setTime', () => {
        it('should emit time on setTime and call close fn', async(() => {
            const spy = spyOn(component, 'close');

            component.timepickerBaseRef.timeSet.subscribe(time => expect(time).toBeDefined());
            component.setTime();
            expect(spy).toHaveBeenCalled();
        }));
    });

    describe('setDefaultTime', () => {

        it('should set default time equal to min time', fakeAsync(() => {
            component.minTime = DateTime.fromObject({hour: 23, minute: 15});
            component.time = undefined;

            component.ngOnInit();

            component.selectedHour.subscribe(hour => expect(hour.time).toBe(11));
            component.selectedMinute.subscribe(minute => expect(minute.time).toBe(15));
            component.selectedPeriod.subscribe(period => expect(period).toBe(TimePeriod.PM));

            tick();
        }));

        it('should not set default time equal to minTime if time is provided', fakeAsync(() => {
            component.minTime = DateTime.fromObject({hour: 23, minute: 15});
            component.format = 12;
            component.time = '11:11 am';

            component.ngOnInit();

            component.selectedHour.subscribe(hour => expect(hour.time).not.toBe(11));
            component.selectedMinute.subscribe(minute => !expect(minute.time).not.toBe(15));

            tick();
        }));

        it('should update hour, minute and period on timeUpdated', fakeAsync(() => {
            const time = '10:12 am';
            component.timepickerBaseRef = {...timepickerBaseRefStub, timeUpdated: of(time)};

            component.ngOnInit();

            component.selectedHour.subscribe(hour => expect(hour.time).toBe(10));
            component.selectedMinute.subscribe(minute => expect(minute.time).toBe(12));
            component.selectedPeriod.subscribe(period => expect(period).toBe(TimePeriod.AM));

            tick();
        }));

        it('should update hour, minute and period on defaultTime input set', fakeAsync(() => {
            component.defaultTime = '01:11 am';

            component.ngOnInit();

            component.selectedHour.subscribe(hour => expect(hour.time).toBe(1));
            component.selectedMinute.subscribe(minute => expect(minute.time).toBe(11));
            component.selectedPeriod.subscribe(period => expect(period).toBe(TimePeriod.AM));

            tick();
        }));
    });

    describe('animationState', () => {

        it('should set animationState to enter', () => {
            component.disableAnimation = false;
            component.ngOnInit();

            expect(component.animationState).toBe('enter');
        });

        it('should set animationState to false', () => {
            component.disableAnimation = true;
            component.ngOnInit();

            expect(component.animationState).toBeFalsy();
        });
    });

    describe('onHourChange', () => {

        it('should change an hour to provided one', fakeAsync(() => {
            const expectedHour: ClockFaceTime = {time: 10, angle: 130};

            component.onHourChange(expectedHour);
            component.selectedHour.subscribe(hour => expect(hour).toEqual(expectedHour));

            tick();
        }));
    });

    describe('onMinuteChange', () => {

        it('should change an minute to provided one', fakeAsync(() => {
            const expectedMinute: ClockFaceTime = {time: 10, angle: 130};

            component.onMinuteChange(expectedMinute);
            component.selectedMinute.subscribe(minute => expect(minute).toEqual(expectedMinute));

            tick();
        }));
    });

    describe('changePeriod', () => {

        it('should change period to provided one', fakeAsync(() => {
            const expectedPeriod = TimePeriod.PM;

            component.changePeriod(expectedPeriod);
            component.selectedPeriod.subscribe(period => expect(period).toBe(expectedPeriod));

            tick();
        }));
    });

    describe('onHourSelected', () => {

        it('should change timeUnit to MINUTE and emit selected hour', async(() => {
            const hour = 10;

            expect(component.activeTimeUnit).toBe(TimeUnit.HOUR);

            component.timepickerBaseRef.hourSelected.subscribe(h => expect(h).toBe(hour));
            component.onHourSelected(hour);

            expect(component.activeTimeUnit).toBe(TimeUnit.MINUTE);
        }));
    });

    describe('close', () => {

        it('should call close method of timepickerBaseRef and not change animation state', () => {
            const spy = spyOn(timepickerBaseRefStub, 'close');
            component.animationState = AnimationState.ENTER;
            component.disableAnimation = true;

            component.close();
            expect(spy).toHaveBeenCalled();
            expect(component.animationState).toBe(AnimationState.ENTER);
        });

        it(`should not call timepickerBaseRef's close method and change animation state to 'leave' `, () => {
            const spy = spyOn(timepickerBaseRefStub, 'close');
            component.animationState = AnimationState.ENTER;
            component.disableAnimation = false;

            component.close();
            expect(spy).toHaveBeenCalledTimes(0);
            expect(component.animationState).toBe('leave');
        });
    });

    describe('animationDone', () => {

        it(`should call timepickerBaseRef's close method if animation toState is 'leave' on animationDone`, () => {
            const event = {
                phaseName: 'done',
                toState: 'leave',
            };
            const spy = spyOn(timepickerBaseRefStub, 'close');

            // @ts-ignore
            component.animationDone(event as AnimationEvent);
            expect(spy).toHaveBeenCalled();
        });

        it(`should not call timepickerBaseRef's close method if animation toState is not 'leave' on animationDone`, () => {
            const event = {
                phaseName: 'done',
                toState: 'enter',
            };
            const spy = spyOn(timepickerBaseRefStub, 'close');

            // @ts-ignore
            component.animationDone(event as AnimationEvent);
            expect(spy).toHaveBeenCalledTimes(0);
        });
    });

    describe('onKeydown', () => {

        it('should call dispatchEvent method on keydown', () => {
            const event = {
                keyCode: 27,
                stopPropagation: () => null,
                type: 'keydown'
            };
            const spy = spyOn(eventService, 'dispatchEvent');
            component.onKeydown(event as KeyboardEvent);

            expect(spy).toHaveBeenCalledWith(event);
        });
    });
});
