import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxMaterialTimepickerComponent} from './ngx-material-timepicker.component';
import {FormsModule} from '@angular/forms';
import {
    NgxMaterialTimepicker12HoursFaceComponent,
    NgxMaterialTimepicker24HoursFaceComponent,
    NgxMaterialTimepickerButtonComponent,
    NgxMaterialTimepickerDialComponent,
    NgxMaterialTimepickerDialControlComponent,
    NgxMaterialTimepickerFaceComponent,
    NgxMaterialTimepickerMinutesFaceComponent, NgxMaterialTimepickerPeriodComponent,
    NgxMaterialTimepickerToggleComponent
} from './components';
import {
    AutofocusDirective,
    NgxMaterialTimepickerThemeDirective,
    NgxMaterialTimepickerToggleIconDirective, OverlayDirective,
    TimepickerDirective
} from './directives';
import {MinutesFormatterPipe, StyleSanitizerPipe, TimeFormatterPipe} from './pipes';
import {NgxMaterialTimepickerEventService, NgxMaterialTimepickerService} from './services';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        NgxMaterialTimepickerComponent,
        NgxMaterialTimepickerToggleComponent,
        TimepickerDirective,
        NgxMaterialTimepickerToggleIconDirective,
        NgxMaterialTimepickerThemeDirective
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
        NgxMaterialTimepickerThemeDirective
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
