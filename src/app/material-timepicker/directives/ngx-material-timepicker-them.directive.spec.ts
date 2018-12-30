import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NgxMaterialTimepickerThemeDirective} from './ngx-material-timepicker-theme.directive';
import {NgxMaterialTimepickerTheme} from '../models';

@Component({
    template: `
        <div [ngxMaterialTimepickerTheme]="darkTheme"></div>`
})
class TestComponent {
    darkTheme: NgxMaterialTimepickerTheme = {
        container: {
            bodyBackgroundColor: '#424242',
        },
    };
}

describe('NgxMaterialTimepickerThemDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, NgxMaterialTimepickerThemeDirective],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TestComponent);

        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(NgxMaterialTimepickerThemeDirective));
        fixture.detectChanges();
    });

    it('should set property', () => {
        const backgroundColor = debugElement.nativeElement.style.getPropertyValue('--body-background-color');
        expect(backgroundColor).toBe('#424242');
    });
});
