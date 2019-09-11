import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    EmbeddedViewRef,
    Inject,
    Injectable,
    Injector,
    Optional,
    Type
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NgxMaterialTimepickerComponent } from '../ngx-material-timepicker.component';

@Injectable({
    providedIn: 'root'
})
export class DomService {

    private componentRef: ComponentRef<NgxMaterialTimepickerComponent>;

    constructor(private cfr: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    appendTimepickerToBody(timepicker: Type<NgxMaterialTimepickerComponent>): void {
        this.componentRef = this.cfr.resolveComponentFactory(timepicker).create(this.injector);

        this.appRef.attachView(this.componentRef.hostView);

        const domElement: HTMLElement = (this.componentRef.hostView as EmbeddedViewRef<NgxMaterialTimepickerComponent>)
            .rootNodes[0];

        this.document.body.appendChild(domElement);
    }

    destroyTimepicker(): void {
        this.appRef.detachView(this.componentRef.hostView);
    }
}
