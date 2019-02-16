import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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

    it('should generate array with 12 items', () => {
        expect(component12.hoursList.length).toBe(12);
    });

    it('should generate array with 24 items', () => {
        expect(component24.hoursList.length).toBe(24);
    });

    it('should emit selected hour (12hr format)', async(() => {
        const time = 10;

        component12.hourSelected.subscribe(hour => expect(hour).toBe(time));
        component12.onTimeSelected(time);
    }));

    it('should emit selected hour (24hr format)', async(() => {
        const time = 15;

        component24.hourSelected.subscribe(hour => expect(hour).toBe(time));
        component24.onTimeSelected(time);
    }));
});
