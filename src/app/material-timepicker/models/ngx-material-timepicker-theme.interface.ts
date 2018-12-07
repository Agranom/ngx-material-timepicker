import {NgxMaterialTimepickerDialTheme} from './ngx-material-timepicker-dial-theme.interface';
import {NgxMaterialTimepickerFaceTheme} from './ngx-material-timepicker-face-theme.interface';

export interface NgxMaterialTimepickerTheme {
    mainBackgroundColor?: string;
    fontFamily?: string;
    buttonColor?: string;
    dial?: NgxMaterialTimepickerDialTheme;
    clockFace?: NgxMaterialTimepickerFaceTheme;
}
