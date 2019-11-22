import {
    Component,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    TemplateRef
} from "@angular/core";
import { ClockFaceTime } from "../../models/clock-face-time.interface";
import { TimePeriod } from "../../models/time-period.enum";
import { TimeUnit } from "../../models/time-unit.enum";
import { DateTime } from "luxon";
import {
    animate,
    AnimationEvent,
    style,
    transition,
    trigger
} from "@angular/animations";
import { NgxMaterialTimepickerService } from "../../services/ngx-material-timepicker.service";
import { Observable, Subject } from "rxjs";
import { shareReplay, takeUntil } from "rxjs/operators";
import { TimeAdapter } from "../../services/time-adapter";
import { TimepickerRef } from "../../models/timepicker-ref.interface";
import { TimepickerConfig } from "../../models/timepicker-config.interface";
import { NgxMaterialTimepickerEventService } from "../../services/ngx-material-timepicker-event.service";
import { NgxMaterialTimepickerTheme } from "../../models/ngx-material-timepicker-theme.interface";

export enum AnimationState {
    ENTER = "enter",
    LEAVE = "leave"
}

@Component({
    selector: "ngx-material-timepicker-container",
    templateUrl: "./ngx-material-timepicker-container.component.html",
    styleUrls: ["./ngx-material-timepicker-container.component.scss"],
    animations: [
        trigger("timepicker", [
            transition(`* => ${AnimationState.ENTER}`, [
                style({ transform: "translateY(-30%)" }),
                animate("0.2s ease-out", style({ transform: "translateY(0)" }))
            ]),
            transition(`${AnimationState.ENTER} => ${AnimationState.LEAVE}`, [
                style({ transform: "translateY(0)", opacity: 1 }),
                animate(
                    "0.2s ease-out",
                    style({ transform: "translateY(-30%)", opacity: 0 })
                )
            ])
        ])
    ],
    providers: [NgxMaterialTimepickerService]
})
export class NgxMaterialTimepickerContainerComponent
    implements OnInit, OnDestroy, TimepickerConfig {
    selectedHour: Observable<ClockFaceTime>;
    selectedMinute: Observable<ClockFaceTime>;
    selectedPeriod: Observable<TimePeriod>;

    timeUnit = TimeUnit;
    activeTimeUnit = TimeUnit.HOUR;

    animationState: AnimationState;

    cancelBtnTmpl: TemplateRef<Node>;
    editableHintTmpl: TemplateRef<Node>;
    confirmBtnTmpl: TemplateRef<Node>;
    inputElement: HTMLInputElement;

    enableKeyboardInput: boolean;
    preventOverlayClick: boolean;
    disableAnimation: boolean;
    disabled: boolean;
    appendToInput: boolean;
    hoursOnly: boolean;
    filter: (time: DateTime, granularity?: 'hours' | 'minutes') => boolean;

    format: number;
    minutesGap: number;

    minTime: DateTime;
    maxTime: DateTime;
    time: string;

    timepickerClass: string;
    theme: NgxMaterialTimepickerTheme;
    timepickerBaseRef: TimepickerRef;

    @Input()
    set defaultTime(time: string) {
        this.setDefaultTime(time);
    }

    private unsubscribe = new Subject();

    constructor(
        private timepickerService: NgxMaterialTimepickerService,
        private eventService: NgxMaterialTimepickerEventService
    ) {}

    @HostListener("keydown", ["$event"])
    onKeydown(e: any): void {
        this.eventService.dispatchEvent(e);
        e.stopPropagation();
    }

    ngOnInit(): void {
        this.animationState = !this.disableAnimation && AnimationState.ENTER;

        this.defineTime();

        this.selectedHour = this.timepickerService.selectedHour.pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.selectedMinute = this.timepickerService.selectedMinute.pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.selectedPeriod = this.timepickerService.selectedPeriod.pipe(
            shareReplay({ bufferSize: 1, refCount: true })
        );

        this.timepickerBaseRef.timeUpdated
            .pipe(takeUntil(this.unsubscribe))
            .subscribe(this.setDefaultTime.bind(this));
    }

    onHourChange(hour: ClockFaceTime): void {
        this.timepickerService.hour = hour;
    }

    onHourSelected(hour: number): void {
        if (!this.hoursOnly) {
            this.changeTimeUnit(TimeUnit.MINUTE);
        }
        this.timepickerBaseRef.hourSelected.next(hour);
    }

    onMinuteChange(minute: ClockFaceTime): void {
        this.timepickerService.minute = minute;
    }

    changePeriod(period: TimePeriod): void {
        this.timepickerService.period = period;
    }

    changeTimeUnit(unit: TimeUnit): void {
        this.activeTimeUnit = unit;
    }

    setTime(): void {
        this.timepickerBaseRef.timeSet.next(
            this.timepickerService.getFullTime(this.format)
        );
        this.close();
    }

    close(): void {
        if (this.disableAnimation) {
            this.timepickerBaseRef.close();
            return;
        }

        this.animationState = AnimationState.LEAVE;
    }

    animationDone(event: AnimationEvent): void {
        if (
            event.phaseName === "done" &&
            event.toState === AnimationState.LEAVE
        ) {
            this.timepickerBaseRef.close();
        }
    }

    ngOnDestroy(): void {
        this.unsubscribe.next();
        this.unsubscribe.complete();
    }

    private setDefaultTime(time: string): void {
        this.timepickerService.setDefaultTimeIfAvailable(
            time,
            this.minTime,
            this.maxTime,
            this.format,
            this.minutesGap
        );
    }

    private defineTime(): void {
        const minTime = this.minTime;

        if (minTime && !this.time) {
            const time = TimeAdapter.fromDateTimeToString(minTime, this.format);

            this.setDefaultTime(time);
        }
    }
}
