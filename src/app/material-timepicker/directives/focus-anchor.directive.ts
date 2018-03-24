import {AfterViewInit, Directive, ElementRef, HostListener, Inject, OnDestroy, Optional} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {NgxMaterialTimepickerEventService} from '../services/ngx-material-timepicker-event.service';

@Directive({
    selector: '[focusAnchor]'
})
export class FocusAnchorDirective implements AfterViewInit, OnDestroy {

    private activeElement: HTMLElement;
    private element: HTMLElement;

    constructor(@Optional() @Inject(DOCUMENT) private document: Document,
                private eventService: NgxMaterialTimepickerEventService,
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

    @HostListener('keydown', ['$event'])
    onKeydown(e: KeyboardEvent) {
        this.eventService.keydownEventSubject.next(e);
    }

}
