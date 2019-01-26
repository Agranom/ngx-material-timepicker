import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { ClockFaceTime } from '../../models/clock-face-time.interface';
import { TimeUnit } from '../../models/time-unit.enum';

const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '103px',
        top: 'calc(50% - 103px)'
    }
};

@Component({
    selector: 'ngx-material-timepicker-face',
    templateUrl: './ngx-material-timepicker-face.component.html',
    styleUrls: ['./ngx-material-timepicker-face.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxMaterialTimepickerFaceComponent implements AfterViewInit, OnChanges, OnDestroy {

    timeUnit = TimeUnit;

    isClockFaceDisabled: boolean;
    innerClockFaceSize = 85;

    @Input() faceTime: ClockFaceTime[];
    @Input() selectedTime: ClockFaceTime;
    @Input() unit: TimeUnit;
    @Input() format: number;
    @Input() minutesGap: number;

    @Output() timeChange = new EventEmitter<ClockFaceTime>();
    @Output() timeSelected = new EventEmitter<null>();

    @ViewChild('clockFace') clockFace: ElementRef;
    @ViewChild('clockHand') clockHand: ElementRef;

    private isStarted: boolean;
    private touchStartHandler: () => any;
    private touchEndHandler: () => any;

    ngAfterViewInit() {
        this.setClockHandPosition();
        this.addTouchEvents();
    }

    ngOnChanges(changes: SimpleChanges) {
        const faceTimeChanges = changes['faceTime'];
        const selectedTimeChanges = changes['selectedTime'];

        if ((faceTimeChanges && faceTimeChanges.currentValue)
            && (selectedTimeChanges && selectedTimeChanges.currentValue)) {
            /* Set time according to passed an input value */
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (selectedTimeChanges && selectedTimeChanges.currentValue) {
            this.setClockHandPosition();
        }
        if (faceTimeChanges && faceTimeChanges.currentValue) {
            // To avoid an error ExpressionChangedAfterItHasBeenCheckedError
            setTimeout(() => this.selectAvailableTime());
        }
    }


    trackByTime(_, time: ClockFaceTime): string | number {
        return time.time;
    }

    @HostListener('mousedown', ['$event'])
    onMousedown(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        this.isStarted = true;
    }

    @HostListener('click', ['$event'])
    @HostListener('touchmove', ['$event.changedTouches[0]'])
    @HostListener('touchend', ['$event.changedTouches[0]'])
    @HostListener('mousemove', ['$event'])
    selectTime(e: MouseEvent | Touch): void {

        if (!this.isStarted && (e instanceof MouseEvent && e.type !== 'click')) {
            return;
        }
        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();

        /* Get x0 and y0 of the circle */
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        /* Counting the arctangent and convert it to from radian to deg */
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        /* Get angle according to quadrant */
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        /* Check if selected time from the inner clock face (24 hours format only) */
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        /* Round angle according to angle step */
        const angleStep = this.unit === TimeUnit.MINUTE ? 6 : 30;
        const roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);

        const selectedTime = this.faceTime.find(val => val.angle === roundedAngle);

        if (selectedTime && !selectedTime.disabled) {
            this.timeChange.next(selectedTime);

            /* To let know whether user ended interaction with clock face */
            if (!this.isStarted) {
                this.timeSelected.next();
            }
        }

    }

    @HostListener('mouseup', ['$event'])
    onMouseup(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        this.isStarted = false;
    }

    isHourSelected(hour: number): boolean {
        return (hour === this.selectedTime.time) && !this.isClockFaceDisabled;
    }

    isMinuteSelected(minute: number): boolean {
        return ((this.selectedTime.time === minute) && (minute % (this.minutesGap || 5) === 0)) && !this.isClockFaceDisabled;
    }

    ngOnDestroy() {
        this.removeTouchEvents();
    }

    private addTouchEvents(): void {
        this.touchStartHandler = this.onMousedown.bind(this);
        this.touchEndHandler = this.onMouseup.bind(this);

        this.clockFace.nativeElement.addEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.addEventListener('touchend', this.touchEndHandler);
    }

    private removeTouchEvents(): void {
        this.clockFace.nativeElement.removeEventListener('touchstart', this.touchStartHandler);
        this.clockFace.nativeElement.removeEventListener('touchend', this.touchEndHandler);
    }

    private setClockHandPosition(): void {
        if (this.format === 24) {
            if (this.selectedTime.time > 12 || this.selectedTime.time === 0) {
                this.decreaseClockHand();
            } else {
                this.increaseClockHand();
            }
        }

        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }

    private selectAvailableTime(): void {
        const currentTime = this.faceTime.find(time => this.selectedTime.time === time.time);
        this.isClockFaceDisabled = this.faceTime.every(time => time.disabled);

        if ((currentTime && currentTime.disabled) && !this.isClockFaceDisabled) {
            const availableTime = this.faceTime.find(time => !time.disabled);

            this.timeChange.next(availableTime);
        }
    }

    private isInnerClockFace(x0: number, y0: number, x: number, y: number): boolean {
        /* Detect whether time from the inner clock face or not (24 format only) */
        return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < this.innerClockFaceSize;
    }

    private decreaseClockHand(): void {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.small.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.small.top;
    }

    private increaseClockHand(): void {
        this.clockHand.nativeElement.style.height = CLOCK_HAND_STYLES.large.height;
        this.clockHand.nativeElement.style.top = CLOCK_HAND_STYLES.large.top;
    }
}

function roundAngle(angle: number, step: number): number {
    return Math.round(angle / step) * step;
}

function countAngleByCords(x0: number, y0: number, x: number, y: number, currentAngle: number): number {
    if (y > y0 && x >= x0) {// II quarter
        return 180 - currentAngle;
    } else if (y > y0 && x < x0) {// III quarter
        return 180 + currentAngle;
    } else if (y < y0 && x < x0) {// IV quarter
        return 360 - currentAngle;
    } else {// I quarter
        return currentAngle;
    }
}
