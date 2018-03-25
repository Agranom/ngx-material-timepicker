import {AfterViewInit, Directive, ElementRef, Inject, OnDestroy, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Directive({
    selector: '[focusAnchor]'
})
export class FocusAnchorDirective implements AfterViewInit, OnDestroy {

    private activeElement: HTMLElement;
    private element: HTMLElement;

    constructor(@Optional() @Inject(DOCUMENT) private document: any, //Type 'any' because of build error
                elementRef: ElementRef) {
        this.element = elementRef.nativeElement;
    }

    ngAfterViewInit() {
        this.activeElement = <HTMLElement>this.document.activeElement;
        this.element.focus();
    }

    ngOnDestroy() {
        this.activeElement.focus();
    }
}
