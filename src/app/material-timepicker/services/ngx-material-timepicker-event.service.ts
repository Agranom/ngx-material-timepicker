import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class NgxMaterialTimepickerEventService {

    private backdropClickSubject: Subject<MouseEvent> = new Subject();
    private keydownEventSubject: Subject<KeyboardEvent> = new Subject();

    get backdropClick(): Observable<MouseEvent> {
        return this.backdropClickSubject.asObservable();
    }

    get keydownEvent(): Observable<KeyboardEvent> {
        return this.keydownEventSubject.asObservable();
    }

    dispatchEvent(event: KeyboardEvent | MouseEvent): void {
        switch (event.type) {
            case 'click':
                this.backdropClickSubject.next(<MouseEvent>event);
                break;
            case 'keydown':
                this.keydownEventSubject.next(<KeyboardEvent>event);
                break;
            default:
                throw new Error('no such event type');
        }
    }

}
