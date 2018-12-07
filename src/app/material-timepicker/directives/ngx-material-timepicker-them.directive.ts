import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {NgxMaterialTimepickerTheme} from '../models/ngx-material-timepicker-theme.interface';
import {NgxMaterialTimepickerDialTheme} from '../models/ngx-material-timepicker-dial-theme.interface';
import {NgxMaterialTimepickerFaceTheme} from '../models/ngx-material-timepicker-face-theme.interface';


const DEFAULT_STYLES: NgxMaterialTimepickerTheme = {
    mainBackgroundColor: '#fff',
    fontFamily: '\'Roboto\', sans-serif',
    buttonColor: 'deepskyblue',
    dial: {
        active: '#fff',
        inactive: 'rgba(255, 255, 255, .5)',
        backgroundColor: 'deepskyblue'
    },
    clockFace: {
        activeTime: '#fff',
        inactiveTime: '#6c6c6c',
        innerInactiveTime: '#929292',
        disabledTime: '#c5c5c5',
        backgroundColor: '#f0f0f0',
        clockHand: 'deepskyblue'
    }
};

@Directive({selector: '[ngxMaterialTimepickerTheme]'})
export class NgxMaterialTimepickerThemDirective implements AfterViewInit {

    @Input('ngxMaterialTimepickerTheme') theme: NgxMaterialTimepickerTheme;

    private element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    ngAfterViewInit() {
        if (this.theme) {
            this.setTimepickerTheme();
            this.setDialTheme(this.theme.dial);
            this.setClockFaceTheme(this.theme.clockFace);
        }

    }

    private setTimepickerTheme(): void {
        this.element.style.setProperty('--body-background-color', this.theme.mainBackgroundColor || DEFAULT_STYLES.mainBackgroundColor);
        this.element.style.setProperty('--primary-font-family', this.theme.mainBackgroundColor || DEFAULT_STYLES.fontFamily);
        this.element.style.setProperty('--button-color', this.theme.buttonColor || DEFAULT_STYLES.buttonColor);
    }

    private setDialTheme(theme: NgxMaterialTimepickerDialTheme): void {
        if (theme) {
            this.element.style.setProperty('--dial-active-color', theme.active || DEFAULT_STYLES.dial.active);
            this.element.style.setProperty('--dial-inactive-color', theme.inactive || DEFAULT_STYLES.dial.inactive);
            this.element.style.setProperty('--dial-background-color', theme.backgroundColor || DEFAULT_STYLES.dial.backgroundColor);
        }
    }

    private setClockFaceTheme(theme: NgxMaterialTimepickerFaceTheme): void {
        if (theme) {
            this.element.style.setProperty('--clock-face-time-active-color', theme.activeTime
                || DEFAULT_STYLES.clockFace.activeTime);
            this.element.style.setProperty('--clock-face-time-inactive-color', theme.inactiveTime
                || DEFAULT_STYLES.clockFace.inactiveTime);
            this.element.style.setProperty('--clock-face-inner-time-inactive-color', theme.inactiveTime
                || DEFAULT_STYLES.clockFace.innerInactiveTime);
            this.element.style.setProperty('--clock-face-time-disabled-color', theme.inactiveTime
                || DEFAULT_STYLES.clockFace.disabledTime);
            this.element.style.setProperty('--clock-face-background-color', theme.backgroundColor
                || DEFAULT_STYLES.clockFace.backgroundColor);
            this.element.style.setProperty('--clock-hand-color', theme.clockHand
                || DEFAULT_STYLES.clockFace.clockHand);
        }
    }
}
