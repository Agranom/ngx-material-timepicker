import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input, OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {ClockFaceTime} from './models/clock-face-time.interface';
import {TimePeriod} from './models/time-period.enum';
import {merge, Subscription} from 'rxjs';
import {NgxMaterialTimepickerService} from './services/ngx-material-timepicker.service';
import {TimeUnit} from './models/time-unit.enum';
import {animate, AnimationEvent, style, transition, trigger} from '@angular/animations';
import {NgxMaterialTimepickerEventService,} from './services/ngx-material-timepicker-event.service';
import {filter} from 'rxjs/operators';


export enum AnimationState {
    ENTER = 'enter',
    LEAVE = 'leave'
}

const ESCAPE = 27;

@Component({
    selector: 'ngx-material-timepicker',
    templateUrl: './ngx-material-timepicker.component.html',
    styleUrls: ['./ngx-material-timepicker.component.scss'],
    animations: [
        trigger('timepicker', [
            transition(`* => ${AnimationState.ENTER}`, [
                style({transform: 'translateY(-30%)'}),
                animate('0.2s ease-out', style({transform: 'translateY(0)'}))
            ]),
            transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
                style({transform: 'translateY(0)', opacity: 1}),
                animate('0.2s ease-out', style({transform: 'translateY(-30%)', opacity: 0}))
            ])
        ])
    ]
})
export class NgxMaterialTimepickerComponent implements OnInit, OnDestroy {

    selectedHour: ClockFaceTime;
    selectedMinute: ClockFaceTime;
    selectedPeriod: TimePeriod;

    timePeriod = TimePeriod;
    timeUnit = TimeUnit;
    activeTimeUnit = TimeUnit.HOUR;

    isOpened = false;
    animationState: AnimationState;

    subscriptions: Subscription[] = [];

    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Input() confirmBtnTmpl: TemplateRef<Node>;
    @Input('ESC') isEsc = true;
    @Output() timeSet = new EventEmitter<string>();

    @ViewChild('timepicker') timepicker: ElementRef;

    constructor(private timepickerService: NgxMaterialTimepickerService,
                private eventService: NgxMaterialTimepickerEventService) {

        this.subscriptions.push(merge(this.eventService.backdropClick,
            this.eventService.keydownEvent.pipe(filter(e => e.keyCode === ESCAPE && this.isEsc)))
            .subscribe(() => this.close()));

    }

    ngOnInit() {
        this.subscriptions.push(this.timepickerService.selectedHour.subscribe(hour => this.selectedHour = hour));
        this.subscriptions.push(this.timepickerService.selectedMinute.subscribe(minute => this.selectedMinute = minute));
        this.subscriptions.push(this.timepickerService.selectedPeriod.subscribe(period => this.selectedPeriod = period));
    }

    onHourChange(hour: ClockFaceTime): void {
        this.timepickerService.hour = hour;
    }

    onMinuteChange(minute: ClockFaceTime): void {
        this.timepickerService.minute = minute;
    }

    changePeriod(period: TimePeriod): void {
        this.timepickerService.period = period;
    }

    changeTimeUnit(unit: TimeUnit) {
        this.activeTimeUnit = unit;
    }

    setTime() {
        this.timeSet.next(this.timepickerService.fullTime);
        this.close();
    }

    open() {
        this.isOpened = true;
        this.animationState = AnimationState.ENTER;
    }

    close() {
        this.animationState = AnimationState.LEAVE;
    }

    animationDone(event: AnimationEvent): void {
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.isOpened = false;
        }
    }

    @HostListener('keydown', ['$event'])
    onKeydown(e: KeyboardEvent) {
        this.eventService.keydownEventSubject.next(e);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
