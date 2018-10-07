import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {NgxMaterialTimepickerFaceComponent} from '../../components/timepicker-face/ngx-material-timepicker-face.component';
import {ElementRef, NO_ERRORS_SCHEMA, SimpleChanges} from '@angular/core';
import {ClockFaceTime} from '../../models/clock-face-time.interface';
import {StyleSanitizerPipe} from '../../pipes/style-sanitizer.pipe';
import {TimeUnit} from '../../models/time-unit.enum';

describe('NgxMaterialTimepickerFaceComponent', () => {
    let fixture: ComponentFixture<NgxMaterialTimepickerFaceComponent>;
    let component: NgxMaterialTimepickerFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [NgxMaterialTimepickerFaceComponent, StyleSanitizerPipe],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(NgxMaterialTimepickerFaceComponent);

        component = fixture.componentInstance;
    });

    it('trackByTime should return time', () => {
        const time: ClockFaceTime = {time: 10, angle: 360};
        expect(component.trackByTime(1, time)).toBe(10);
    });

    it('should set clock hand position to 30deg', () => {
        component.selectedTime = {time: 1, angle: 30};
        component.format = 12;

        component.ngAfterViewInit();
        expect(getStyle(component.clockHand)('transform')).toBe('rotate(30deg)');
    });

    it('should decrease clock hand with format 24 and time more than 12', () => {
        component.selectedTime = {time: 13, angle: 30};
        component.format = 24;
        component.ngAfterViewInit();

        expect(getStyle(component.clockHand)('height')).toBe('75px');
        expect(getStyle(component.clockHand)('top')).toBe('calc(50% - 75px)');
    });

    it('should decrease clock hand with format 24 and time is \'00\' ', () => {
        component.selectedTime = {time: '00', angle: 30};
        component.format = 24;
        component.ngAfterViewInit();

        expect(getStyle(component.clockHand)('height')).toBe('75px');
        expect(getStyle(component.clockHand)('top')).toBe('calc(50% - 75px)');
    });

    it('should increase clock hand with format 24 and time less or equal 12', () => {
        component.selectedTime = {time: 12, angle: 30};
        component.format = 24;
        component.ngAfterViewInit();

        expect(getStyle(component.clockHand)('height')).toBe('103px');
        expect(getStyle(component.clockHand)('top')).toBe('calc(50% - 103px)');
    });


    it('should change selectedTime on faceTime and selectedTime changes', () => {
        component.selectedTime = {time: 12, angle: 30};
        component.faceTime = [{time: 11, angle: 30, disabled: false}, {time: 12, angle: 30, disabled: true}];
        const changes: SimpleChanges = {
            faceTime: {
                currentValue: [{time: 11, angle: 20}],
                previousValue: undefined,
                isFirstChange: () => null,
                firstChange: true
            },
            selectedTime: {
                currentValue: {time: 11, angle: 30},
                previousValue: undefined,
                isFirstChange: () => null,
                firstChange: true
            }
        };
        component.ngOnChanges(changes);

        expect(component.selectedTime).toEqual({time: 12, angle: 30, disabled: true});
    });

    it('should set clock hand position on selectedTime changes', () => {
        component.selectedTime = {time: 11, angle: 30};
        const changes: SimpleChanges = {
            selectedTime: {
                currentValue: {time: 11, angle: 30},
                previousValue: undefined,
                isFirstChange: () => null,
                firstChange: true
            }
        };
        component.ngOnChanges(changes);

        expect(getStyle(component.clockHand)('transform')).toBe('rotate(30deg)');
    });

    it('should select available time', fakeAsync(() => {
        component.selectedTime = {time: 11, angle: 30};
        component.faceTime = [{time: 11, angle: 30, disabled: true}, {time: 12, angle: 30, disabled: false}];
        const changes: SimpleChanges = {
            faceTime: {
                currentValue: [],
                previousValue: undefined,
                isFirstChange: () => null,
                firstChange: true
            }
        };
        let updatedTime: ClockFaceTime = {time: 1, angle: 20};
        component.timeChange.subscribe(time => updatedTime = time);
        component.ngOnChanges(changes);
        tick();
        expect(updatedTime).toEqual({time: 12, angle: 30, disabled: false});
    }));

    it('should not emit time if no one is available', fakeAsync(() => {
        component.selectedTime = {time: 11, angle: 30};
        component.faceTime = [{time: 11, angle: 30, disabled: true}, {time: 12, angle: 30, disabled: true}];
        const changes: SimpleChanges = {
            faceTime: {
                currentValue: [],
                previousValue: undefined,
                isFirstChange: () => null,
                firstChange: true
            }
        };
        let updatedTime: ClockFaceTime = {time: 1, angle: 20};
        component.timeChange.subscribe(time => updatedTime = time);
        component.ngOnChanges(changes);
        tick();
        expect(updatedTime).toEqual({time: 1, angle: 20});
    }));

    describe('Select time', () => {
        const mouseClickEvent = new MouseEvent('click');
        const mouseMoveEvent = new MouseEvent('mousemove');
        const hourFaceTime = [
            {time: 1, angle: 30, disabled: false},
            {time: 2, angle: 60, disabled: false},
            {time: 3, angle: 90, disabled: false},
            {time: 4, angle: 120, disabled: false},
            {time: 5, angle: 150, disabled: false},
            {time: 6, angle: 180, disabled: false},
            {time: 7, angle: 210, disabled: false},
            {time: 8, angle: 240, disabled: false},
            {time: 9, angle: 270, disabled: false},
            {time: 10, angle: 300, disabled: false},
            {time: 11, angle: 330, disabled: false},
            {time: 12, angle: 360, disabled: false},
            {time: 13, angle: 390, disabled: false},
            {time: 14, angle: 420, disabled: false},
            {time: 15, angle: 450, disabled: false},
            {time: 16, angle: 480, disabled: false},
            {time: 17, angle: 510, disabled: false},
            {time: 18, angle: 540, disabled: false},
            {time: 19, angle: 570, disabled: false},
            {time: 20, angle: 600, disabled: false},
            {time: 21, angle: 630, disabled: false},
            {time: 22, angle: 660, disabled: false},
            {time: 23, angle: 690, disabled: false},
            {time: 24, angle: 720, disabled: false},
        ];

        const minutesFaceTime = Array(60).fill(0).map((v, i) => {
            const index = (v + i);
            const angle = 360 / 60 * index;
            return {time: index === 0 ? '00' : index, angle: angle !== 0 ? angle : 360};
        });

        beforeEach(() => {
            component.onMousedown(mouseClickEvent);
        });

        it('should do nothing onMouseUp', fakeAsync(() => {
            let counter = 0;

            component.timeChange.subscribe(() => counter++);
            component.onMouseup(mouseClickEvent);
            component.selectTime(mouseMoveEvent);
            tick();
            expect(counter).toBe(0);
        }));

        it('should subtract angle from 180', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 160, clientY: 220};

            component.faceTime = hourFaceTime;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should add 180 to angle', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 140, clientY: 250};

            component.faceTime = hourFaceTime;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should subtract angle from 360', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 140, clientY: 100};

            component.faceTime = hourFaceTime;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should return angle', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 160, clientY: 200};

            component.faceTime = hourFaceTime;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should return 360 angle if it 0', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 150, clientY: 200};

            component.faceTime = hourFaceTime;
            component.timeChange.subscribe((time) => selectedTime = time);
            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should select hour from inner clock face', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 150, clientY: 200};

            component.faceTime = hourFaceTime;
            component.format = 24;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should select minute from list', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 150, clientY: 200};

            component.faceTime = minutesFaceTime;
            component.unit = TimeUnit.MINUTE;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime.angle).toBe(getAngle(mouseCords));
        }));

        it('should not emit timeChanged', fakeAsync(() => {
            let selectedTime: ClockFaceTime = {time: 1, angle: 5};
            const mouseCords: MouseEventInit = {clientX: 150, clientY: 200};

            hourFaceTime.forEach(h => h.disabled = true);
            component.faceTime = hourFaceTime;
            component.timeChange.subscribe((time) => selectedTime = time);

            component.selectTime(new MouseEvent('mousemove', mouseCords));
            tick();
            expect(selectedTime).toEqual({time: 1, angle: 5});
        }));

        function getAngle(mouseCords) {
            const clockFaceCords = component.clockFace.nativeElement.getBoundingClientRect();

            const centerX = clockFaceCords.left + clockFaceCords.width / 2; // 150
            const centerY = clockFaceCords.top + clockFaceCords.height / 2; // 216
            const arctangent = Math.atan(
                Math.abs(mouseCords.clientX - centerX) / Math.abs(mouseCords.clientY - centerY)) * 180 / Math.PI;

            const circleAngle = countAngleByCords(centerX, centerY, mouseCords.clientX, mouseCords.clientY, arctangent);
            const angleStep = component.unit === TimeUnit.MINUTE ? 6 : 30;
            const isInnerClockChosen = component.format && isInnerClockFace(centerX, centerY, mouseCords.clientX, mouseCords.clientY);

            return isInnerClockChosen
                ? roundAngle(circleAngle, angleStep) + 360
                : roundAngle(circleAngle, angleStep);

        }

        function isInnerClockFace(x0: number, y0: number, x: number, y: number): boolean {
            /*Detect whether time from the inner clock face or not (24 format only)*/
            return Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) < component.innerClockFaceSize;
        }
    });
});

function getStyle(element: ElementRef): (prop: string) => string {
    return (prop: string) => element.nativeElement.style[prop];
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



