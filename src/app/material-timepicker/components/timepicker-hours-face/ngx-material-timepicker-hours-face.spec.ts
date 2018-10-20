import {ComponentFixture, TestBed} from '@angular/core/testing';

import {Component} from '@angular/core';
import {NgxMaterialTimepickerHoursFace} from './ngx-material-timepicker-hours-face';

@Component({
    template: '<h1>Test</h1>'
})
class Test12HoursComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(12);
    }
}

@Component({
    template: '<h1>Test</h1>'
})
class Test24HoursComponent extends NgxMaterialTimepickerHoursFace {
    constructor() {
        super(24);
    }
}

describe('NgxMaterialTimepickerHoursFace', () => {
    let fixture: ComponentFixture<Test12HoursComponent>;
    let component12: Test12HoursComponent;
    let component24: Test24HoursComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [Test12HoursComponent, Test24HoursComponent],
        }).createComponent(Test12HoursComponent);

        component12 = fixture.componentInstance;
        component24 = TestBed.createComponent(Test24HoursComponent).componentInstance;
    });

    it('should generate array with 12 hours', () => {
        const hours = component12.hoursList;
        for (let i = 0; i < hours.length; i++) {
            const angleStep = 30;
            expect(hours[i]).toEqual({time: i + 1, angle: (i + 1) * angleStep});
        }
    });

    it('should generate array with 24 items', () => {
        const hours = component24.hoursList;
        for (let i = 0; i < hours.length; i++) {
            const angleStep = 30;
            const time = i + 1;

            expect(hours[i]).toEqual({time: time === 24 ? '00' : time, angle: time * angleStep});
        }
    });
});
