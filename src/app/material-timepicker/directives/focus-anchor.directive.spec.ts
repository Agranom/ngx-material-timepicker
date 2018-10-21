import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/common';
import {FocusAnchorDirective} from './focus-anchor.directive';

@Component({
    template: `
        <div>
            <p focusAnchor>Focusable element</p>
        </div>
    `
})
class TestComponent {
}

describe('FocusAnchorDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let focusableEl: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, FocusAnchorDirective]
        }).createComponent(TestComponent);
        component = fixture.componentInstance;
        focusableEl = fixture.debugElement.query(By.directive(FocusAnchorDirective));
        fixture.detectChanges();
    });

    it('focus should be on the element with focusAnchor directive after view' +
        ' init and return to previous active element after destroy element with focusAnchor directive ',
        inject([DOCUMENT], (document: Document) => {
            const body = document.activeElement;
            fixture.whenRenderingDone().then(() => {
                expect(document.activeElement).toEqual(focusableEl.nativeElement);
            });
            fixture.destroy();
            expect(document.activeElement).toEqual(body);
        }));
});
