import { NgxMaterialTimepickerPeriodComponent } from './../components/timepicker-period/ngx-material-timepicker-period.component';
import { NgxMaterialTimepickerDialControlComponent } from "./../components/timepicker-dial-control/ngx-material-timepicker-dial-control.component";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})
export class NgxMaterialTimepickerDialService {
   lastInputFocused: | NgxMaterialTimepickerDialControlComponent;

    setLastInputFocused(
        component:
            | NgxMaterialTimepickerDialControlComponent
    ) {
        this.lastInputFocused = component;
    }
}
