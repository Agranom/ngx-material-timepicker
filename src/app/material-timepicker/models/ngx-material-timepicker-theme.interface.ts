import {NgxMaterialTimepickerDialTheme} from './ngx-material-timepicker-dial-theme.interface';
import {NgxMaterialTimepickerFaceTheme} from './ngx-material-timepicker-face-theme.interface';
import {NgxMaterialTimepickerContainerTheme} from './ngx-material-timepicker-container-theme.interface';

export interface NgxMaterialTimepickerTheme {
    container?: NgxMaterialTimepickerContainerTheme;
    dial?: NgxMaterialTimepickerDialTheme;
    clockFace?: NgxMaterialTimepickerFaceTheme;
}
