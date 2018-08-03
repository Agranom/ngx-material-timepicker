import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';

const CLOCK_HAND_STYLES = {
    small: {
        height: '75px',
        top: 'calc(50% - 75px)'
    },
    large: {
        height: '95px',
        top: 'calc(50% - 95px)'
    }
};

@Component({
    selector: 'ngx-material-timepicker-face',
    templateUrl: './ngx-material-timepicker-face.component.html',
    styleUrls: ['./ngx-material-timepicker-face.component.scss']
})
export class NgxMaterialTimepickerFaceComponent implements AfterViewInit, OnChanges {

    timeUnit = TimeUnit;

    isClockFaceDisabled: boolean;
    innerClockFaceSize = 85;

    @Input() faceTime: ClockFaceTime[];
    @Input() selectedTime: ClockFaceTime;
    @Input() unit: TimeUnit;
    @Input() format: number;
    @Output() timeChange = new EventEmitter<ClockFaceTime>();

    @ViewChild('clockFace') clockFace: ElementRef;
    @ViewChild('clockHand') clockHand: ElementRef;

    private isStarted: boolean;

    ngAfterViewInit() {
        this.setClockHandPosition();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ((changes['faceTime'] && changes['faceTime'].currentValue)
            && (changes['selectedTime'] && changes['selectedTime'].currentValue)) {
            //Set time according to passed an input value
            this.selectedTime = this.faceTime.find(time => time.time === this.selectedTime.time);
        }
        if (changes['selectedTime'] && changes['selectedTime'].currentValue) {
            this.setClockHandPosition();
        }
        if (changes['faceTime'] && changes['faceTime'].currentValue) {
            this.selectAvailableTime();
        }
    }


    trackByTime(_, time: ClockFaceTime): string | number {
        return time.time;
    }

    @HostListener('touchstart', ['$event'])
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

        //Get x0 and y0 of the circle
        const centerX = clockFaceCords.left + clockFaceCords.width / 2;
        const centerY = clockFaceCords.top + clockFaceCords.height / 2;
        //Counting the arctangent and convert it to from radian to deg
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        //Get angle according to quadrant
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        //Check if selected time from the inner clock face (24 hours format only)
        const isInnerClockChosen = this.format && this.isInnerClockFace(centerX, centerY, e.clientX, e.clientY);
        //Round angle according to angle step
        const angleStep = this.unit === TimeUnit.MINUTE ? 6 : 30;
        const roundedAngle = isInnerClockChosen
            ? roundAngle(circleAngle, angleStep) + 360
            : roundAngle(circleAngle, angleStep);

        const selectedTime = this.faceTime.find(val => val.angle === roundedAngle);

        if (!selectedTime.disabled) {
            this.timeChange.next(selectedTime);
        }

    }

    @HostListener('touchend', ['$event'])
    @HostListener('mouseup', ['$event'])
    onMouseup(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        this.isStarted = false;
    }

    private setClockHandPosition(): void {
        if (this.format === 24 && this.selectedTime.time > 12) {
            this.decreaseClockHand();
        } else if (this.format === 24 && this.selectedTime.time <= 12) {
            this.increaseClockHand();
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
        //Detect whether time from the inner clock face or not (24 format only)
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
    const roundedAngle = Math.round(angle / step) * step;
    return roundedAngle === 0 ? 360 : roundedAngle;
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
