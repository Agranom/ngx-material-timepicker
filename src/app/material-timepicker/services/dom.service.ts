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
import {
    NgxMaterialTimepickerContainerComponent
} from '../components/ngx-material-timepicker-container/ngx-material-timepicker-container.component';
import { TimepickerConfig } from '../models/timepicker-config.interface';

@Injectable({
    providedIn: 'root'
})
export class DomService {

    private componentRef: ComponentRef<NgxMaterialTimepickerContainerComponent>;

    constructor(private cfr: ComponentFactoryResolver,
                private appRef: ApplicationRef,
                private injector: Injector,
                @Optional() @Inject(DOCUMENT) private document: any) {
    }

    appendTimepickerToBody(timepicker: Type<NgxMaterialTimepickerContainerComponent>, config: TimepickerConfig): void {
        this.componentRef = this.cfr.resolveComponentFactory(timepicker).create(this.injector);

        Object.keys(config).forEach(key => this.componentRef.instance[key] = config[key]);

        this.appRef.attachView(this.componentRef.hostView);

        const domElement: HTMLElement = (this.componentRef.hostView as EmbeddedViewRef<NgxMaterialTimepickerContainerComponent>)
            .rootNodes[0];

        this.document.body.appendChild(domElement);
    }

    destroyTimepicker(): void {
        this.componentRef.destroy();
        this.appRef.detachView(this.componentRef.hostView);
    }
}
