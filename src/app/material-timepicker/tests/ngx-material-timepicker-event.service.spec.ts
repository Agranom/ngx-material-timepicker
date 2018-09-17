import {NgxMaterialTimepickerEventService} from '../services/ngx-material-timepicker-event.service';
import {TestBed} from '@angular/core/testing';

describe('NgxMaterialTimepickerService', () => {
    let eventService: NgxMaterialTimepickerEventService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [NgxMaterialTimepickerEventService]
        });
        eventService = TestBed.get(NgxMaterialTimepickerEventService);
    });


    it('should dispatch click event', () => {
        eventService.backdropClick.subscribe(event => expect(event.type).toBe('click'));
        eventService.dispatchEvent(<MouseEvent>{type: 'click'});
    });

    it('should dispatch keydown event', () => {
        eventService.keydownEvent.subscribe(event => expect(event.type).toBe('keydown'));
        eventService.dispatchEvent(<KeyboardEvent>{type: 'keydown'});
    });

    it('should throw error if wrong event type', () => {
        expect(() => eventService.dispatchEvent(<MouseEvent>{type: 'mouseout'})).toThrow('no such event type');
    });
});
