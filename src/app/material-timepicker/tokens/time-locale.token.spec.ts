import { Injector } from '@angular/core';
import { TIME_LOCALE } from './time-locale.token';

describe('TimeLocaleToken', () => {

    it('should return provided locale', () => {
        const locale = 'en-GB';
        const injector = Injector.create({providers: [{provide: TIME_LOCALE, useValue: locale}]});
        const actual = injector.get(TIME_LOCALE);

        expect(actual).toBe(locale);
    });
});
