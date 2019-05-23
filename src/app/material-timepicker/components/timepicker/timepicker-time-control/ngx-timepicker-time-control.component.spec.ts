import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxTimepickerTimeControlComponent } from './ngx-timepicker-time-control.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimeUnit } from '../../../models/time-unit.enum';

fdescribe('NgxTimepickerTimeControlComponent', () => {
    let fixture: ComponentFixture<NgxTimepickerTimeControlComponent>;
    let component: NgxTimepickerTimeControlComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [NgxTimepickerTimeControlComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(NgxTimepickerTimeControlComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should format time when onInit', () => {
        component.time = 1;
        component.timeUnit = TimeUnit.HOUR;
        component.ngOnInit();

        // @ts-ignore
        expect(component.time).toBe('01');
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
});
