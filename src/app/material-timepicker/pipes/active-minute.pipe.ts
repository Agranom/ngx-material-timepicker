import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'activeMinute'
})
export class ActiveMinutePipe implements PipeTransform {

    transform(minute: number, currentMinute: number, gap: number, isClockFaceDisabled: boolean): boolean {
        if (minute == null || isClockFaceDisabled) {
            return false;
        }
        const defaultGap = 5;

        return ((currentMinute === minute) && (minute % (gap || defaultGap) === 0));
    }

}
