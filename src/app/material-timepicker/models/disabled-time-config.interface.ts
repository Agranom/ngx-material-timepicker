import {Moment} from 'moment';
import {TimePeriod} from './time-period.enum';

    export interface DisabledTimeConfig {
    min: Moment;
    max: Moment;
    format: number;
    period?: TimePeriod;
}
