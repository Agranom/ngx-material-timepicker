// import * as _moment from 'moment';
import {TimeAdapter} from '../services/time-adapter';

// const moment = _moment;

describe('TimeAdapter', () => {

    it('shout convert string time  into Moment type time', () => {
        const stringTime = '11:20 am';
        const momentTime = TimeAdapter.convertTimeToMoment(stringTime);

        expect(momentTime.isValid()).toBeTruthy();
        expect(momentTime.hour()).toBe(11, 'wrong hours');
        expect(momentTime.minute()).toBe(20, 'wrong hours');
    });

    it('should be invalid if pass incorrect value', () => {
        const time = 'time';
        expect(TimeAdapter.convertTimeToMoment(time).isValid()).toBeFalsy();
    });

    it('should return time in am/pm format', () => {
        expect(TimeAdapter.formatTime('23:00')).toEqual('11:00 pm');
        expect(TimeAdapter.formatTime('12:20 am')).toEqual('12:20 am');
        expect(TimeAdapter.formatTime('12:20 am', 33)).toEqual('12:20 am');
    });

    it('should return time in 24-hours format', () => {
        expect(TimeAdapter.formatTime('11:00 pm', 24)).toEqual('23:00');
        expect(TimeAdapter.formatTime('18:10', 24)).toEqual('18:10');
    })
});
