import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NgxMaterialTimepickerToggleComponent} from '../../components/timepicker-toggle-button/ngx-material-timepicker-toggle.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgxMaterialTimepickerComponent} from '../../ngx-material-timepicker.component';

describe('NgxMaterialTimepickerToggleComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerToggleComponent>;
    let component: NgxMaterialTimepickerToggleComponent;
    const timepicker = {disabled: true, open: () => null} as NgxMaterialTimepickerComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerToggleComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerToggleComponent);

        component = fixture.componentInstance;
    });

    it('should set disabled state from timepicker if it did not set for toggle', () => {
        component.timepicker = timepicker;
        expect(component.disabled).toBeTruthy();
    });

    it('should set disabled state', () => {
        component.disabled = true;
        expect(component.disabled).toBeTruthy();
    });

    it('should override timepicker\'s disabled state', () => {
        component.timepicker = timepicker;
        component.disabled = false;
        expect(component.disabled).toBeFalsy();
    });

    it('should call open method for timepicker', () => {
        const spy = spyOn(timepicker, 'open');
        component.timepicker = timepicker;
        component.open({stopPropagation: () => null});

        expect(spy).toHaveBeenCalled();
    });

    it('should not call open method for timepicker if no timepicker provided', () => {
        const spy = spyOn(timepicker, 'open');
        component.open({stopPropagation: () => null});

        expect(spy).toHaveBeenCalledTimes(0);
    });
});
