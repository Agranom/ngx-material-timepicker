import { InjectionToken } from '@angular/core';
import { TimeAdapter } from '../services/time-adapter';

export const TIME_LOCALE = new InjectionToken<string>('TimeLocale', {
    providedIn: 'root',
    factory: () => TimeAdapter.DEFAULT_LOCALE
});

export const NUMBERING_SYSTEM = new InjectionToken<string>('NumberingSystem', {
    providedIn: 'root',
    factory: () => TimeAdapter.DEFAULT_NUMBERING_SYSTEM
});
