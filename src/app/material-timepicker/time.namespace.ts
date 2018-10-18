import {ClockFaceTime} from './models/clock-face-time.interface';

export namespace Time {

    export function generateHours(format: number): ClockFaceTime[] {
        return Array(format).fill(1).map((v, i) => {
            const angleStep = 30;
            const time = v + i;
            const angle = angleStep * time;
            return {time: time === 24 ? '00' : time, angle};
        });
    }
}
