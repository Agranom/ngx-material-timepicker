import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component
} from "@angular/core";
import { NgxMaterialTimepickerHoursFace } from "../timepicker-hours-face/ngx-material-timepicker-hours-face";
import { disableHours } from "../../utils/timepicker-time.utils";

@Component({
    selector: "ngx-material-timepicker-24-hours-face",
    templateUrl: "ngx-material-timepicker-24-hours-face.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMaterialTimepicker24HoursFaceComponent
    extends NgxMaterialTimepickerHoursFace
    implements AfterContentInit {
    constructor() {
        super(24);
    }

    ngAfterContentInit() {
        this.hoursList = disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format,
            filter: this.filter
        });
    }
}
