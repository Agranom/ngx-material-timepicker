import {Directive, HostListener} from '@angular/core';
import {NgxMaterialTimepickerEventService,} from '../services/ngx-material-timepicker-event.service';

@Directive({
    selector: '[overlay]'
})
export class OverlayDirective {

    constructor(private eventService: NgxMaterialTimepickerEventService) {
    }


    @HostListener('click', ['$event'])
    onClick(e: MouseEvent) {
        this.eventService.dispatchEvent(e);
        e.preventDefault();
    }

}
