import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

type TimepickerDirection = 'top' | 'center' | 'bottom';

@Directive({
    selector: '[ngxAppendToInput]'
})
export class AppendToInputDirective implements AfterViewInit {

    @Input('ngxAppendToInput') inputElement: any;

    private _direction: TimepickerDirection;
    private _inputCords: ClientRect;
    private readonly element: HTMLElement;

    constructor(elementRef: ElementRef<HTMLElement>,
                private renderer: Renderer2) {
        this.element = elementRef.nativeElement;
    }

    private get inputCords(): ClientRect {
        return this.inputElement.getBoundingClientRect();
    }

    private get direction(): TimepickerDirection {
        const height = this.element.offsetHeight;
        const {bottom, top} = this._inputCords;
        const isElementFit = (window && window.innerHeight) - bottom < height;
        const isTop = isElementFit && top > height;
        const isCenter = isElementFit && top < height;

        if (isTop) {
            return 'top';
        } else if (isCenter) {
            return 'center';
        }
        return 'bottom';
    }

    ngAfterViewInit(): void {
        this._inputCords = this.inputCords;
        this._direction = this.direction;

        this.append();
    }

    @HostListener('window:scroll')
    changePosition(): void {
        const {bottom, top} = this.inputCords;
        const y = this.defineElementYByDirection(top, bottom);
        this.setStyle('top', `${y}px`);
    }

    private append(): void {
        const {left, bottom, top} = this._inputCords;
        const y = this.defineElementYByDirection(top, bottom);

        this.setStyle('position', 'fixed');
        this.setStyle('left', `${left}px`);
        this.setStyle('top', `${y}px`);
    }

    private setStyle(style: string, value: string): void {
        this.renderer.setStyle(this.element, style, value);
    }

    private defineElementYByDirection(inputTop: number, inputBottom: number): number {
        if (this._direction === 'top') {
            return inputTop - this.element.offsetHeight;
        } else if (this._direction === 'center') {
            return inputTop - (this.element.offsetHeight / 2);
        }
        return inputBottom;
    }
}
