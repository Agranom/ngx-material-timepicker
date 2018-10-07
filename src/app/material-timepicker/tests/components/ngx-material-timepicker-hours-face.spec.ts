import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from '@angular/core';
import {NgxMaterialTimepickerHoursFace} from '../../components/timepicker-hours-face/ngx-material-timepicker-hours-face';
import {ClockFaceTime} from '../../models/clock-face-time.interface';

@Component({
    template: '<h1>Test</h1>'
})
class TestComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }

    get disabledHours(): ClockFaceTime[] {
        return [];
    }
}

describe('NgxMaterialTimepickerHoursFace', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent],
        }).createComponent(TestComponent);

        component = fixture.componentInstance;
    });

    it('should generate array with 12 hours', () => {
        component.initHours(12);
        const hours = component.hoursList;
        for (let i = 0; i < hours.length; i++) {
            const angleStep = 30;
            expect(hours[i]).toEqual({time: i + 1, angle: (i + 1) * angleStep});
        }
    });

    it('should generate array with 24 items', () => {
        component.initHours(24);
        const hours = component.hoursList;
        for (let i = 0; i < hours.length; i++) {
            const angleStep = 30;
            const time = i + 1;

            expect(hours[i]).toEqual({time: time === 24 ? '00' : time, angle: time * angleStep});
        }
    });

    it('should emit hourSelected on click', () => {
        let counter = 0;
        component.hourSelected.subscribe(() => expect(++counter).toBe(1));
        component.onClick();
    });
});
