import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerComponent } from './ngx-material-timepicker.component';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerToggleComponent } from './components/timepicker-toggle-button/ngx-material-timepicker-toggle.component';
import { TimepickerDirective } from './directives/ngx-timepicker.directive';
import { NgxMaterialTimepickerToggleIconDirective } from './directives/ngx-material-timepicker-toggle-icon.directive';
import { NgxMaterialTimepickerThemeDirective } from './directives/ngx-material-timepicker-theme.directive';
import {
    NgxMaterialTimepicker24HoursFaceComponent
} from './components/timepicker-24-hours-face/ngx-material-timepicker-24-hours-face.component';
import {
    NgxMaterialTimepicker12HoursFaceComponent
} from './components/timepicker-12-hours-face/ngx-material-timepicker-12-hours-face.component';
import {
    NgxMaterialTimepickerMinutesFaceComponent } from './components/timepicker-minutes-face/ngx-material-timepicker-minutes-face.component';
import { NgxMaterialTimepickerFaceComponent } from './components/timepicker-face/ngx-material-timepicker-face.component';
import { NgxMaterialTimepickerButtonComponent } from './components/timepicker-button/ngx-material-timepicker-button.component';
import { NgxMaterialTimepickerDialComponent } from './components/timepicker-dial/ngx-material-timepicker-dial.component';
import {
    NgxMaterialTimepickerDialControlComponent } from './components/timepicker-dial-control/ngx-material-timepicker-dial-control.component';
import { NgxMaterialTimepickerPeriodComponent } from './components/timepicker-period/ngx-material-timepicker-period.component';
import { StyleSanitizerPipe } from './pipes/style-sanitizer.pipe';
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { OverlayDirective } from './directives/overlay.directive';
import { MinutesFormatterPipe } from './pipes/minutes-formatter.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NgxTimepickerComponent } from './components/timepicker/ngx-timepicker.component';
import { NgxTimepickerTimeControlComponent } from './components/timepicker/timepicker-time-control/ngx-timepicker-time-control.component';
import {
    NgxTimepickerPeriodSelectorComponent
} from './components/timepicker/timepicker-period-selector/ngx-timepicker-period-selector.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NgxMaterialTimepickerComponent,
        NgxMaterialTimepickerToggleComponent,
        NgxTimepickerComponent,
        TimepickerDirective,
        NgxMaterialTimepickerToggleIconDirective,
        NgxMaterialTimepickerThemeDirective,
        NgxTimepickerPeriodSelectorComponent
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
        MinutesFormatterPipe,
        NgxMaterialTimepickerThemeDirective,
        NgxTimepickerComponent,
        NgxTimepickerTimeControlComponent,
        NgxTimepickerPeriodSelectorComponent
    ]
})
export class NgxMaterialTimepickerModule {
}
