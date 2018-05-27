import {Injectable} from '@angular/core';
import {Subject, Observable} from 'rxjs';

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
