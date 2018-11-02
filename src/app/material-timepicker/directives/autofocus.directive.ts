import {Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive({
    selector: '[timepickerAutofocus]'
})
export class AutofocusDirective implements OnChanges, OnDestroy {

    @Input('timepickerAutofocus') isFocusActive: boolean;

    private activeElement: HTMLElement;

    constructor(private element: ElementRef, @Optional() @Inject(DOCUMENT) private document: any) {
        this.activeElement = this.document.activeElement;
    }

    ngOnChanges() {
        if (this.isFocusActive) {
            this.element.nativeElement.focus();
        }
    }

    ngOnDestroy() {
        this.activeElement.focus();
    }
}
