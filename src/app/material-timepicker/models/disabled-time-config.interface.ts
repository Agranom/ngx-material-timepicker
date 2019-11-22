import { TimePeriod } from "./time-period.enum";
import { DateTime } from "luxon";

export interface DisabledTimeConfig {
    min: DateTime;
    max: DateTime;
    format: number;
    period?: TimePeriod;
    filter?: (time: DateTime, granularity?: 'hours' | 'minutes') => boolean;
}
