import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NgxMaterialTimepickerThemDirective} from './ngx-material-timepicker-them.directive';
import {NgxMaterialTimepickerTheme} from '../models/ngx-material-timepicker-theme.interface';

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
            declarations: [TestComponent, NgxMaterialTimepickerThemDirective],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TestComponent);

        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(NgxMaterialTimepickerThemDirective));
        fixture.detectChanges();
    });

    it('should set property', () => {
        const backgroundColor = debugElement.nativeElement.style.getPropertyValue('--body-background-color');
        expect(backgroundColor).toBe('#424242');
    });
});
