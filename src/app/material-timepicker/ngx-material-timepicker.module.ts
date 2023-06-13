import { ModuleWithProviders, NgModule } from '@angular/core';
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
import { TimeFormatterPipe } from './pipes/time-formatter.pipe';
import { OverlayDirective } from './directives/overlay.directive';
import { MinutesFormatterPipe } from './pipes/minutes-formatter.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { NgxTimepickerFieldComponent } from './components/timepicker-field/ngx-timepicker-field.component';
import {
    NgxTimepickerTimeControlComponent
} from './components/timepicker-field/timepicker-time-control/ngx-timepicker-time-control.component';
import {
    NgxTimepickerPeriodSelectorComponent
} from './components/timepicker-field/timepicker-period-selector/ngx-timepicker-period-selector.component';
import { TimeLocalizerPipe } from './pipes/time-localizer.pipe';
import { NUMBERING_SYSTEM, TIME_LOCALE } from './tokens/time-locale.token';
import { TimeParserPipe } from './pipes/time-parser.pipe';
import { ActiveHourPipe } from './pipes/active-hour.pipe';
import { ActiveMinutePipe } from './pipes/active-minute.pipe';
import {
    NgxMaterialTimepickerContainerComponent
} from './components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
import {
    NgxMaterialTimepickerContentComponent
} from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { AppendToInputDirective } from './directives/append-to-input.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NgxMaterialTimepickerComponent,
        NgxMaterialTimepickerToggleComponent,
        NgxTimepickerFieldComponent,
        TimepickerDirective,
        NgxMaterialTimepickerToggleIconDirective,
        NgxMaterialTimepickerThemeDirective,
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
        TimeFormatterPipe,
        TimepickerDirective,
        OverlayDirective,
        NgxMaterialTimepickerToggleIconDirective,
        AutofocusDirective,
        MinutesFormatterPipe,
        NgxMaterialTimepickerThemeDirective,
        NgxTimepickerFieldComponent,
        NgxTimepickerTimeControlComponent,
        NgxTimepickerPeriodSelectorComponent,
        TimeLocalizerPipe,
        TimeParserPipe,
        ActiveHourPipe,
        ActiveMinutePipe,
        NgxMaterialTimepickerContainerComponent,
        NgxMaterialTimepickerContentComponent,
        AppendToInputDirective
    ],
})
export class NgxMaterialTimepickerModule {

    static setOpts(locale: string, numberingSystem: string): ModuleWithProviders<NgxMaterialTimepickerModule> {
        return {
            ngModule: NgxMaterialTimepickerModule,
            providers: [
                {provide: TIME_LOCALE, useValue: locale},
                {provide: NUMBERING_SYSTEM, useValue: numberingSystem}
            ]
        };
    }
}
