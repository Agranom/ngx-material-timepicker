import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NgxMaterialTimepickerMinutesFaceComponent } from "./ngx-material-timepicker-minutes-face.component";
import { NO_ERRORS_SCHEMA, SimpleChanges } from "@angular/core";
import { TimePeriod } from "../../models/time-period.enum";
import * as TimepickerTime from "../../utils/timepicker-time.utils";
import { DateTime } from "luxon";
import { spyOnFunction } from "../../ngx-material-timepicker.component.spec";

describe("NgxMaterialTimepickerMinutesFaceComponent", () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerMinutesFaceComponent>;
    let component: NgxMaterialTimepickerMinutesFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerMinutesFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerMinutesFaceComponent);

        component = fixture.componentInstance;
    });

    it("should call disableMinutes once period changed", () => {
        const spy = spyOnFunction(TimepickerTime, "disableMinutes");
        const changes: SimpleChanges = {
            period: {
                currentValue: TimePeriod.PM,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };
        const time = DateTime.fromJSDate(new Date());
        const format = 12;
        const period = TimePeriod.PM;
        const minutes = TimepickerTime.getMinutes();
        const filter = () => true;
        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.period = period;
        component.minutesList = minutes;
        component.selectedHour = 1;
        component.filter = filter;

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledWith(minutes, 1, {min: time, max: time, format, period, filter});
    });

    it("should not call disableMinutes", () => {
        const spy = spyOnFunction(TimepickerTime, "disableMinutes");
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
