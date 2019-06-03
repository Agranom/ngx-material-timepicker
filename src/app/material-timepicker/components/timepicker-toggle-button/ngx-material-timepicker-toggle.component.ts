import {Component, ContentChild, Input} from '@angular/core';
import {NgxMaterialTimepickerToggleIconDirective} from '../../directives/ngx-material-timepicker-toggle-icon.directive';
import {NgxMaterialTimepickerComponent} from '../../ngx-material-timepicker.component';

@Component({
    selector: 'ngx-material-timepicker-toggle',
    templateUrl: 'ngx-material-timepicker-toggle.component.html',
    styleUrls: ['ngx-material-timepicker-toggle.component.scss']
})

export class NgxMaterialTimepickerToggleComponent {

    @Input('for') timepicker: NgxMaterialTimepickerComponent;

    @Input()
    get disabled(): boolean {
        return this._disabled === undefined ? this.timepicker.disabled : this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = value;
    }

    private _disabled: boolean;

    @ContentChild(NgxMaterialTimepickerToggleIconDirective, {static: false}) customIcon: NgxMaterialTimepickerToggleIconDirective;

    open(event): void {
        if (this.timepicker) {
            this.timepicker.open();
            event.stopPropagation();
        }
    }
}
