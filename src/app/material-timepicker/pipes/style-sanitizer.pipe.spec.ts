import { StyleSanitizerPipe } from './style-sanitizer.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Type } from '@angular/core';

describe('StyleSanitizerPipe', () => {
    let pipe: StyleSanitizerPipe;

    beforeEach(() => {
        pipe = new StyleSanitizerPipe(TestBed.get(DomSanitizer as Type<DomSanitizer>));
    });

    it('should do nothing if value is undefined', () => {
        expect(pipe.transform(undefined)).toBeUndefined();
    });

    it('should return safe style', () => {
        expect(pipe.transform('height: 20px')).toBeDefined();
    });
});
