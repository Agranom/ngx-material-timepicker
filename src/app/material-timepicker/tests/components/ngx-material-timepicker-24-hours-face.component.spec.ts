import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {
    NgxMaterialTimepicker24HoursFaceComponent
} from '../../components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import * as moment from 'moment';

describe('NgxMaterialTimepicker24HoursFaceComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepicker24HoursFaceComponent>;
    let component: NgxMaterialTimepicker24HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepicker24HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepicker24HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it('should disable hours', () => {
        component.minTime = moment().hour(10);
        component.maxTime = moment().hour(19);
        component.hoursList = component.disabledHours;
        const disabledHours = component.hoursList.filter(h => h.disabled);

        expect(component.hoursList.length).toBe(24);
        expect(disabledHours.length).toBe(14);

    });

    it('should return hoursList without changes if min and max time was not provided', () => {
        component.hoursList = component.disabledHours;
        let disabledHours = component.hoursList.filter(h => h.disabled);

        expect(disabledHours.length).toBe(0);

        component.minTime = null;
        component.maxTime = null;

        component.ngAfterContentInit();
        disabledHours = component.hoursList.filter(h => h.disabled);

        expect(disabledHours.length).toBe(0);
    });
});
