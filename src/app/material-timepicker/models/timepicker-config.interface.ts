import { TemplateRef } from '@angular/core';
import { DateTime } from 'luxon';
import { TimepickerRef } from './timepicker-ref.interface';
import { NgxMaterialTimepickerTheme } from './ngx-material-timepicker-theme.interface';

export interface TimepickerConfig {
    cancelBtnTmpl: TemplateRef<Node>;
    editableHintTmpl: TemplateRef<Node>;
    confirmBtnTmpl: TemplateRef<Node>;
    inputElement: any;
    enableKeyboardInput: boolean;
    preventOverlayClick: boolean;
    disableAnimation: boolean;
    disabled: boolean;
    appendToInput: boolean;
    hoursOnly: boolean;
    format: number;
    minutesGap: number;
    minTime: DateTime;
    maxTime: DateTime;
    defaultTime: string;
    time: string;
    timepickerClass: string;
    theme: NgxMaterialTimepickerTheme;
    timepickerBaseRef: TimepickerRef;
}
