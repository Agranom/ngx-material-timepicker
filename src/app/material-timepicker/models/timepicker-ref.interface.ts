import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

export interface TimepickerRef {
    timeSet: EventEmitter<string>;
    hourSelected: EventEmitter<number>;
    timeUpdated: Observable<string>;

    close(): void;
}
