import { NgxMaterialTimepickerDialControlComponent } from './../timepicker-dial-control/ngx-material-timepicker-dial-control.component';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren
} from '@angular/core';
import { TimePeriod } from '../../models/time-period.enum';
import { TimeUnit } from '../../models/time-unit.enum';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { DateTime, Info } from 'luxon';
import { TIME_LOCALE } from '../../tokens/time-locale.token';
import { TimepickerTimeUtils } from '../../utils/timepicker-time.utils';
import { NgxMaterialTimepickerDialService } from '../../services/ngx-material-timepicker-dial-service';

@Component({
    selector: 'ngx-material-timepicker-dial',
    templateUrl: 'ngx-material-timepicker-dial.component.html',
    styleUrls: ['ngx-material-timepicker-dial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMaterialTimepickerDialComponent implements OnChanges {

    timeUnit = TimeUnit;

    hours: ClockFaceTime[];
    minutes: ClockFaceTime[];
    meridiems = Info.meridiems({locale: this.locale});

    isHintVisible: boolean;

    @Input() editableHintTmpl: TemplateRef<Node>;
    @ViewChildren('hhcomponent') hoursComponent: NgxMaterialTimepickerDialControlComponent;
    @ViewChildren('mmcomponent') minutesComponent: NgxMaterialTimepickerDialControlComponent;
    @Input() hour: number | string;
    @Input() minute: number | string;
    @Input() format: number;
    @Input() period: TimePeriod;
    @Input() activeTimeUnit: TimeUnit;
    @Input() minTime: DateTime;
    @Input() maxTime: DateTime;
    @Input() isEditable: boolean;
    @Input() minutesGap: number;
    @Input() hoursOnly: boolean;

    @Output() periodChanged = new EventEmitter<TimePeriod>();
    @Output() timeUnitChanged = new EventEmitter<TimeUnit>();
    @Output() hourChanged = new EventEmitter<ClockFaceTime>();
    @Output() minuteChanged = new EventEmitter<ClockFaceTime>();

    constructor(@Inject(TIME_LOCALE) private locale: string, private ngxMaterialTimepickerDialService: NgxMaterialTimepickerDialService) {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['period'] && changes['period'].currentValue
            || changes['format'] && changes['format'].currentValue) {
            const hours = TimepickerTimeUtils.getHours(this.format);

            this.hours = TimepickerTimeUtils.disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (changes['period'] && changes['period'].currentValue
            || changes['hour'] && changes['hour'].currentValue) {
            const minutes = TimepickerTimeUtils.getMinutes(this.minutesGap);

            this.minutes = TimepickerTimeUtils.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }

    changeTimeUnit(unit: TimeUnit): void {
        this.timeUnitChanged.next(unit);
    }

    changePeriod(period: TimePeriod): void {
        this.periodChanged.next(period);
    }

    changeHour(hour: ClockFaceTime): void {
        this.hourChanged.next(hour);
    }

    changeMinute(minute: ClockFaceTime): void {
        this.minuteChanged.next(minute);
    }

    showHint(): void {
        this.isHintVisible = true;
    }

    hideHint(): void {
        this.isHintVisible = false;
    }

     clickUp(): void {
        this.ngxMaterialTimepickerDialService.lastInputFocused.changeTimeByVirtualArrow(
            'ARROW_UP'
        );
    }
    clickDown(): void {
        this.ngxMaterialTimepickerDialService.lastInputFocused.changeTimeByVirtualArrow(
            'ARROW_DOWN'
        );
    }
}
