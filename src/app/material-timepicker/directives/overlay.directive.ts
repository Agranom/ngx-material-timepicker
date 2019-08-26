import { Directive, HostListener, Input } from '@angular/core';
import {NgxMaterialTimepickerEventService} from '../services/ngx-material-timepicker-event.service';

@Directive({
    selector: '[overlay]'
})
export class OverlayDirective {

    @Input('overlay') preventClick: boolean;

    constructor(private eventService: NgxMaterialTimepickerEventService) {
    }


    @HostListener('click', ['$event'])
    onClick(e: MouseEvent) {
        if (!this.preventClick) {
            this.eventService.dispatchEvent(e);
        }
        e.preventDefault();
    }

}
