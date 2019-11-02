import { DomService } from './dom.service';
import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TimepickerConfig } from '../models/timepicker-config.interface';
import {
    NgxMaterialTimepickerContainerComponent
} from '../components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('DomService', () => {
    let service: DomService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule],
            declarations: [NgxMaterialTimepickerContainerComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).overrideModule(BrowserDynamicTestingModule, {
            set: {
                entryComponents: [NgxMaterialTimepickerContainerComponent]
            }
        });

        service = TestBed.get(DomService);

        TestBed.compileComponents();
    });

    describe('appendTimepickerToBody', () => {

        it('should append provided timepicker to body', () => {
            service.appendTimepickerToBody(NgxMaterialTimepickerContainerComponent, {} as TimepickerConfig);
            const expected = document.getElementsByTagName('ngx-material-timepicker-container')[0];

            expect(document.body.lastChild).toEqual(expected);
        });
    });

});
