import {ClockFaceTime} from './models/clock-face-time.interface';

export namespace TimepickerTime {

    export function getHours(format: number): ClockFaceTime[] {
        return Array(format).fill(1).map((v, i) => {
            const angleStep = 30;
            const time = v + i;
            const angle = angleStep * time;
            return {time: time === 24 ? '00' : time, angle};
        });
    }

    export function getMinutes(): ClockFaceTime[] {
        const minutes = 60;
        const angleStep = 360 / minutes;

        return Array(minutes).fill(0).map((v, i) => {
            const index = (v + i);
            const angle = angleStep * index;
            return {time: index === 0 ? '00' : index, angle: angle !== 0 ? angle : 360};
        });
    }
}
