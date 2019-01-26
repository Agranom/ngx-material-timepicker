import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { OverlayDirective } from './overlay.directive';
import { By } from '@angular/platform-browser';
import { NgxMaterialTimepickerEventService } from '../services/ngx-material-timepicker-event.service';

@Component({
    template: `
        <div [overlay]="false"><p>Some content</p></div>`
})
class TestComponent {
}

describe('OverlayDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let overlayEl: DebugElement;
    let directive: OverlayDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, OverlayDirective],
            providers: [NgxMaterialTimepickerEventService]
        }).createComponent(TestComponent);
        overlayEl = fixture.debugElement.query(By.directive(OverlayDirective));
        directive = overlayEl.injector.get<OverlayDirective>(OverlayDirective);
    });

    it('should dispatch click event on click', inject([NgxMaterialTimepickerEventService],
        (service: NgxMaterialTimepickerEventService) => {
            const spy = spyOn(service, 'dispatchEvent').and.callThrough();
            overlayEl.nativeElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
        }));

    it('should not dispatch click event on click', inject([NgxMaterialTimepickerEventService],
        (service: NgxMaterialTimepickerEventService) => {
            const spy = spyOn(service, 'dispatchEvent').and.callThrough();
            directive.preventClick = true;
            overlayEl.nativeElement.dispatchEvent(new Event('click'));
            fixture.detectChanges();
            expect(spy).toHaveBeenCalledTimes(0);
        }));
});
