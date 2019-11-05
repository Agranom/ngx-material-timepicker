import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { NgxMaterialTimepicker24HoursFaceComponent } from "./ngx-material-timepicker-24-hours-face.component";
import * as TimepickerTime from "../../utils/timepicker-time.utils";
import { DateTime } from "luxon";
import { spyOnFunction } from "../../ngx-material-timepicker.component.spec";

describe("NgxMaterialTimepicker24HoursFaceComponent", () => {
    let fixture: ComponentFixture<NgxMaterialTimepicker24HoursFaceComponent>;
    let component: NgxMaterialTimepicker24HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepicker24HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepicker24HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it("should call disableHours", () => {
        const spy = spyOnFunction(TimepickerTime, "disableHours");
        const time = DateTime.fromJSDate(new Date());
        const format = 24;
        const hours = TimepickerTime.getHours(format);
        const filter = () => true;

        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.hoursList = hours;
        component.filter = filter;

        component.ngAfterContentInit();
        expect(spy).toHaveBeenCalledWith(hours, {min: time, max: time, format, filter});
    });
});
