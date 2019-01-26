import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';
import {NgxMaterialTimepickerTheme} from '../models/ngx-material-timepicker-theme.interface';

@Directive({selector: '[ngxMaterialTimepickerTheme]'})
export class NgxMaterialTimepickerThemeDirective implements AfterViewInit {

    @Input('ngxMaterialTimepickerTheme') theme: NgxMaterialTimepickerTheme;

    private element: HTMLElement;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    ngAfterViewInit() {
        if (this.theme) {
            this.setTheme(this.theme);
        }
    }

    private setTheme(theme): void {
        for (const val in theme) {
            if (theme.hasOwnProperty(val)) {
                if (typeof theme[val] === 'string') {
                    for (const prop in theme) {
                        if (theme.hasOwnProperty(prop)) {
                            this.element.style.setProperty(`--${camelCaseToDash(prop)}`, theme[prop]);
                        }
                    }
                    return;
                }
                this.setTheme(theme[val]);
            }

        }
    }
}

function camelCaseToDash(myStr) {
    return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
