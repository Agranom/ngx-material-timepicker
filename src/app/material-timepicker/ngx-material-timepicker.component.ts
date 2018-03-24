import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener, Inject,
    Input,
    OnInit, Optional,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {ClockFaceTime} from './models/clock-face-time.interface';
import {TimePeriod} from './models/time-period.enum';
import {Observable} from 'rxjs/Observable';
import {NgxMaterialTimepickerService} from './services/ngx-material-timepicker.service';
import {TimeUnit} from './models/time-unit.enum';
import {animate, AnimationEvent, style, transition, trigger} from '@angular/animations';
import {DOCUMENT} from '@angular/common';


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
export class NgxMaterialTimepickerComponent implements OnInit {

    selectedHour: Observable<ClockFaceTime>;
    selectedMinute: Observable<ClockFaceTime>;
    selectedPeriod: Observable<TimePeriod>;

    timePeriod = TimePeriod;
    timeUnit = TimeUnit;
    activeTimeUnit = TimeUnit.HOUR;

    isOpened = false;
    animationState: AnimationState;

    @Input() cancelBtnTmpl: TemplateRef<Node>;
    @Input() confirmBtnTmpl: TemplateRef<Node>;
    @Output() timeSet = new EventEmitter<string>();

    @ViewChild('timepicker') timepicker: ElementRef;

    private activeElement: HTMLElement;

    constructor(private timepickerService: NgxMaterialTimepickerService,
                @Optional() @Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit() {
        this.selectedHour = this.timepickerService.selectedHour;
        this.selectedMinute = this.timepickerService.selectedMinute;
        this.selectedPeriod = this.timepickerService.selectedPeriod;
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
        if (event.phaseName === 'done' && event.toState === AnimationState.ENTER) {
            this.activeElement = <HTMLElement>this.document.activeElement;
            this.timepicker.nativeElement.focus();
        }
        if (event.phaseName === 'done' && event.toState === AnimationState.LEAVE) {
            this.isOpened = false;
            this.activeElement.focus();
        }
    }

    @HostListener('keydown', ['$event'])
    onKeydown(e: KeyboardEvent) {
        if (e.keyCode === ESCAPE) {
            this.close();
            e.preventDefault();
        }
    }
}
