import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
    NgxMaterialTimepicker12HoursFaceComponent
} from '../../components/timepicker-12-hours-face/ngx-material-timepicker-12-hours-face.component';
import * as moment from 'moment';
import {NO_ERRORS_SCHEMA, SimpleChanges} from '@angular/core';
import {TimePeriod} from '../../models/time-period.enum';

describe('NgxMaterialTimepicker12HoursFaceComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepicker12HoursFaceComponent>;
    let component: NgxMaterialTimepicker12HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepicker12HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepicker12HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it('should return hoursList without changes if min and max time was not provided', () => {
        component.hoursList = component.disabledHours;
        let disabledHours = component.hoursList.filter(h => h.disabled);

        expect(disabledHours.length).toBe(0);

        component.minTime = null;
        component.maxTime = null;

        component.hoursList = component.disabledHours;
        disabledHours = component.hoursList.filter(h => h.disabled);

        expect(disabledHours.length).toBe(0);
    });

    it(`should disable hours if min time exist`, () => {
        component.period = TimePeriod.AM;
        component.minTime = moment().hour(1);
        component.maxTime = moment().hour(18);
        component.hoursList = component.disabledHours;
        let disabledHours = component.hoursList.filter(h => h.disabled);

        expect(component.hoursList.length).toBe(12, 'initial hours list length');
        expect(disabledHours.length).toBe(1, 'disabled hours length AM');
        expect(disabledHours[0].time).toBe(12);

        component.period = TimePeriod.PM;
        component.hoursList = component.disabledHours;
        disabledHours = component.hoursList.filter(h => h.disabled);
        expect(disabledHours.length).toBe(5, 'disabled hours length PM');
    });

    it('should call disabledHours once period changed', () => {
        const spy = spyOnProperty(component, 'disabledHours');
        const changes: SimpleChanges = {
            period: {
                currentValue: TimePeriod.PM,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalled();
    });

    it('should not call disabledHours', () => {
        const spy = spyOnProperty(component, 'disabledHours');
        const changes: SimpleChanges = {
            minTime: {
                currentValue: null,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
