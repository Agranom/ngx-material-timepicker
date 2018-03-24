import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NgxMaterialTimepickerEventService {

    backdropClickSubject: Subject<MouseEvent> = new Subject();
    keydownEventSubject: Subject<KeyboardEvent> = new Subject();

    get backdropClick(): Observable<MouseEvent> {
        return this.backdropClickSubject.asObservable();
    }

    get keydownEvent(): Observable<KeyboardEvent> {
        return this.keydownEventSubject.asObservable();
    }

}
