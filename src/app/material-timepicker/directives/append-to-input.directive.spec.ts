import { AppendToInputDirective } from './append-to-input.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';

describe('AppendToInputDirective', () => {
    let directive: AppendToInputDirective;
    let renderer: Renderer2;
    const elementRef: ElementRef<HTMLElement> = {
        nativeElement: {
            offsetHeight: 400
        } as HTMLElement
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: Renderer2, useValue: {
                        setStyle: (element, prop, value) => null
                    }
                }
            ]
        });

        renderer = TestBed.get(Renderer2);
        directive = new AppendToInputDirective(elementRef, renderer);
    });

    describe('Initial Init', () => {

        it(`should render element on 'top' direction`, () => {
            const spy = spyOn(renderer, 'setStyle');
            Object.defineProperty(window, 'innerHeight', {value: 200});
            directive.inputElement = {
                getBoundingClientRect: () => {
                    return {
                        left: 10,
                        bottom: 100,
                        top: 500,
                    } as ClientRect;
                }
            } as HTMLInputElement;
            directive.ngAfterViewInit();
            expect(spy).toHaveBeenCalledWith(elementRef.nativeElement, 'top', '100px');
        });

        it(`should render element on 'center' direction`, () => {
            const spy = spyOn(renderer, 'setStyle');
            Object.defineProperty(window, 'innerHeight', {value: 200});
            directive.inputElement = {
                getBoundingClientRect: () => {
                    return {
                        left: 10,
                        bottom: 100,
                        top: 300,
                    } as ClientRect;
                }
            } as HTMLInputElement;
            directive.ngAfterViewInit();
            expect(spy).toHaveBeenCalledWith(elementRef.nativeElement, 'top', '100px');
        });

        it(`should render element on 'bottom' direction`, () => {
            const spy = spyOn(renderer, 'setStyle');
            Object.defineProperty(window, 'innerHeight', {value: 800});
            directive.inputElement = {
                getBoundingClientRect: () => {
                    return {
                        left: 10,
                        bottom: 200,
                        top: 300,
                    } as ClientRect;
                }
            } as HTMLInputElement;
            directive.ngAfterViewInit();
            expect(spy).toHaveBeenCalledWith(elementRef.nativeElement, 'top', '200px');
        });

        it('should set css on ngAfterViewInit', () => {
            const spy = spyOn(renderer, 'setStyle');
            Object.defineProperty(window, 'innerHeight', {value: 800});
            directive.inputElement = {
                getBoundingClientRect: () => {
                    return {
                        left: 10,
                        bottom: 200,
                        top: 300,
                    } as ClientRect;
                }
            } as HTMLInputElement;
            directive.ngAfterViewInit();
            expect(spy).toHaveBeenCalledWith(elementRef.nativeElement, 'position', 'fixed');
            expect(spy).toHaveBeenCalledWith(elementRef.nativeElement, 'left', '10px');
            expect(spy).toHaveBeenCalledWith(elementRef.nativeElement, 'top', '200px');
        });
    });
});
