import { Component, EventEmitter, Input, OnDestroy, Output, TemplateRef } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { NgxMaterialTimepickerEventService } from './services/ngx-material-timepicker-event.service';
import { filter, takeUntil } from 'rxjs/operators';
import { TimepickerDirective } from './directives/ngx-timepicker.directive';
import { DateTime } from 'luxon';
import { DomService } from './services/dom.service';
import { NgxMaterialTimepickerContentComponent } from './components/ngx-material-timepicker-content/ngx-material-timepicker-content.component';
import { TimepickerRef } from './models/timepicker-ref.interface';


const ESCAPE = 27;

@Component({
    selector: 'ngx-material-timepicker',
    template: '',
})
export class NgxMaterialTimepickerComponent implements OnDestroy, TimepickerRef {

    timeUpdated = new Subject<string>();

    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Input() editableHintTmpl: TemplateRef<Node>;
    @Input() confirmBtnTmpl: TemplateRef<Node>;
    @Input('ESC') isEsc = true;
    @Input() enableKeyboardInput: boolean;
    @Input() preventOverlayClick: boolean;
    @Input() disableAnimation: boolean;
    @Input() defaultTime: string;

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
    }

    get format(): number {
        return this.timepickerInput ? this.timepickerInput.format : this._format;
    }

    @Input()
    set minutesGap(gap: number) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }

    get minutesGap(): number {
        return this._minutesGap;
    }

    @Output() timeSet = new EventEmitter<string>();
    @Output() opened = new EventEmitter<null>();
    @Output() closed = new EventEmitter<null>();
    @Output() hourSelected = new EventEmitter<number>();

    private _minutesGap: number;
    private _format: number;
    private timepickerInput: TimepickerDirective;
    private unsubscribe = new Subject();

    constructor(private eventService: NgxMaterialTimepickerEventService,
                private domService: DomService) {

        merge(this.eventService.backdropClick,
            this.eventService.keydownEvent.pipe(filter(e => e.keyCode === ESCAPE && this.isEsc)))
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(() => this.close());

    }

    get minTime(): DateTime {
        return this.timepickerInput && (this.timepickerInput.min as DateTime);
    }

    get maxTime(): DateTime {
        return this.timepickerInput && (this.timepickerInput.max as DateTime);
    }

    get disabled(): boolean {
        return this.timepickerInput && this.timepickerInput.disabled;
    }

    get time(): string {
        return this.timepickerInput && this.timepickerInput.value;
    }

    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input: TimepickerDirective): void {
        if (this.timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this.timepickerInput = input;
    }

    open(): void {
        this.domService.appendTimepickerToBody(NgxMaterialTimepickerContentComponent, {
            timepickerBaseRef: this,
            time: this.time,
            defaultTime: this.defaultTime,
            maxTime: this.maxTime,
            minTime: this.minTime,
            format: this.format,
            minutesGap: this.minutesGap,
            disableAnimation: this.disableAnimation,
            cancelBtnTmpl: this.cancelBtnTmpl,
            confirmBtnTmpl: this.confirmBtnTmpl,
            editableHintTmpl: this.editableHintTmpl,
            disabled: this.disabled,
            enableKeyboardInput: this.enableKeyboardInput,
            preventOverlayClick: this.preventOverlayClick
        });
        this.opened.next();
    }

    close(): void {
        this.domService.destroyTimepicker();
        this.closed.next();
    }

    updateTime(time: string): void {
        this.timeUpdated.next(time);
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

}
