import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxMaterialTimepickerComponent} from './ngx-material-timepicker.component';
import {StyleSanitizerPipe} from './pipes/style-sanitizer.pipe';
import {NgxMaterialTimepickerMinutesFaceComponent} from './components/timepicker-minutes-face/ngx-material-timepicker-minutes-face.component';
import {NgxMaterialTimepickerService} from './services/ngx-material-timepicker.service';
import {NgxMaterialTimepickerFaceComponent} from './components/timepicker-face/ngx-material-timepicker-face.component';
import {TimeFormatterPipe} from './pipes/time-formatter.pipe';
import {NgxMaterialTimepickerButtonComponent} from './components/timepicker-button/ngx-material-timepicker-button.component';
import {TimepickerDirective} from './directives/ngx-timepicker.directive';
import {OverlayDirective} from './directives/overlay.directive';
import {NgxMaterialTimepickerEventService} from './services/ngx-material-timepicker-event.service';
import {NgxMaterialTimepickerToggleComponent} from './components/timepicker-toggle-button/ngx-material-timepicker-toggle.component';
import {NgxMaterialTimepickerToggleIconDirective} from './directives/ngx-material-timepicker-toggle-icon.directive';
import {NgxMaterialTimepicker12HoursFaceComponent} from './components/timepicker-12-hours-face/ngx-material-timepicker-12-hours-face.component';
import {NgxMaterialTimepicker24HoursFaceComponent} from './components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import {FormsModule} from '@angular/forms';
import {NgxMaterialTimepickerDialComponent} from './components/timepicker-dial/ngx-material-timepicker-dial.component';
import {NgxMaterialTimepickerDialControlComponent} from './components/timepicker-dial-control/ngx-material-timepicker-dial-control.component';
import {MinutesFormatterPipe} from './pipes/minutes-formatter.pipe';
import {NgxMaterialTimepickerPeriodComponent} from './components/timepicker-period/ngx-material-timepicker-period.component';
import {AutofocusDirective} from './directives/autofocus.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NgxMaterialTimepickerComponent,
        NgxMaterialTimepickerToggleComponent,
        TimepickerDirective,
        NgxMaterialTimepickerToggleIconDirective
    ],
    declarations: [
        NgxMaterialTimepickerComponent,
        NgxMaterialTimepicker24HoursFaceComponent,
        NgxMaterialTimepicker12HoursFaceComponent,
        NgxMaterialTimepickerMinutesFaceComponent,
        NgxMaterialTimepickerFaceComponent,
        NgxMaterialTimepickerToggleComponent,
        NgxMaterialTimepickerButtonComponent,
        NgxMaterialTimepickerDialComponent,
        NgxMaterialTimepickerDialControlComponent,
        NgxMaterialTimepickerPeriodComponent,
        StyleSanitizerPipe,
        TimeFormatterPipe,
        TimepickerDirective,
        OverlayDirective,
        NgxMaterialTimepickerToggleIconDirective,
        AutofocusDirective,
        MinutesFormatterPipe
    ]
})
export class NgxMaterialTimepickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxMaterialTimepickerModule,
            providers: [NgxMaterialTimepickerService, NgxMaterialTimepickerEventService]
        };
    }
}
