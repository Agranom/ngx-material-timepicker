import {AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {TimeUnit} from '../../models/time-unit.enum';

@Component({
    selector: 'ngx-material-timepicker-face',
    templateUrl: './ngx-material-timepicker-face.component.html',
    styleUrls: ['./ngx-material-timepicker-face.component.scss']
})
export class NgxMaterialTimepickerFaceComponent implements AfterViewInit {

    timeUnit = TimeUnit;

    @Input() faceTime: ClockFaceTime[];
    @Input() selectedTime: ClockFaceTime;
    @Input() unit: TimeUnit;
    @Output() timeChange = new EventEmitter<ClockFaceTime>();

    @ViewChild('clockFace') clockFace: ElementRef;
    @ViewChild('clockHand') clockHand: ElementRef;


    ngAfterViewInit() {
        this.setClockHandPosition();
        this.setListeners();
    }

    private setListeners(): void {
        const mouseMoveListener = this.moveClockStick.bind(this);
        const clockFaceElement = this.clockFace.nativeElement;

        clockFaceElement.addEventListener('mousedown', (e: MouseEvent) => {
            e.preventDefault();
            clockFaceElement.addEventListener('mousemove', mouseMoveListener);
        });

        clockFaceElement.addEventListener('mouseup', (e: MouseEvent) => {
            e.preventDefault();
            clockFaceElement.removeEventListener('mousemove', mouseMoveListener);
        });

        clockFaceElement.addEventListener('click', mouseMoveListener);
    }

    private moveClockStick(e: MouseEvent): void {
        e.preventDefault();

        const clockFaceCords = this.clockFace.nativeElement.getBoundingClientRect();

        //Get x0 and y0 of the circle
        const centerX = clockFaceCords.x + clockFaceCords.width / 2;
        const centerY = clockFaceCords.y + clockFaceCords.height / 2;
        //Counting the arctangent and convert it to from radian to deg
        const arctangent = Math.atan(Math.abs(e.clientX - centerX) / Math.abs(e.clientY - centerY)) * 180 / Math.PI;
        //Get angle according to quadrant
        const circleAngle = countAngleByCords(centerX, centerY, e.clientX, e.clientY, arctangent);
        //Round angle according to angle step
        const roundedAngle = roundAngle(circleAngle, 360 / this.faceTime.length);
        const selectedTime = this.faceTime.find(val => val.angle === roundedAngle);

        this.clockHand.nativeElement.style.transform = `rotate(${roundedAngle}deg)`;
        this.timeChange.next(selectedTime);
    }

    private setClockHandPosition() {
        this.clockHand.nativeElement.style.transform = `rotate(${this.selectedTime.angle}deg)`;
    }

}

function roundAngle(angle: number, step: number): number {
    const roundedAngle = Math.round(angle / step) * step;
    return roundedAngle === 0 ? 360 : roundedAngle;
}

function countAngleByCords(x0: number, y0: number, x: number, y: number, currentAngle: number): number {
    if (y > y0 && x >= x0) {
        return 90 - currentAngle + 90;
    } else if (y > y0 && x < x0) {
        return 180 + currentAngle;
    } else if (y < y0 && x < x0) {
        return 90 - currentAngle + 270;
    } else {
        return currentAngle;
    }
}
