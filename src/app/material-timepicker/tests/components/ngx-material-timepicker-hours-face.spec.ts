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

    it('should generate array with 12 items', () => {
        component.initHours(12);
        expect(component.hoursList.length).toBe(12);
    });

    it(`last item should be {time: 12, angle: 12 * 30} `, () => {
        component.initHours(12);
        expect(component.hoursList[11]).toEqual({time: 12, angle: 12 * 30});
    });

    it('should generate array with 24 items', () => {
        component.initHours(24);
        expect(component.hoursList.length).toBe(24);
    });

    it(`last item should be {time: 00, angle: 24 * 30} `, () => {
        component.initHours(24);
        expect(component.hoursList[23]).toEqual({time: '00', angle: 24 * 30});
    });

    it('should emit hourSelected on click', () => {
        let counter = 0;
        component.hourSelected.subscribe(() => expect(++counter).toBe(1));
        component.onClick();
    });
});
