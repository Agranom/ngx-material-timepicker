import { TemplateRef } from '@angular/core';
import { DateTime } from 'luxon';
import { TimepickerRef } from './timepicker-ref.interface';

export interface TimepickerConfig {
    cancelBtnTmpl: TemplateRef<Node>;
    editableHintTmpl: TemplateRef<Node>;
    confirmBtnTmpl: TemplateRef<Node>;
    enableKeyboardInput: boolean;
    preventOverlayClick: boolean;
    disableAnimation: boolean;
    disabled: boolean;
    format: number;
    minutesGap: number;
    minTime: DateTime;
    maxTime: DateTime;
    defaultTime: string;
    time: string;
    timepickerBaseRef: TimepickerRef;
}
