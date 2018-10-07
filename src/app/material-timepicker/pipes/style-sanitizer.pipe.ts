import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({
    name: 'styleSanitizer'
})
export class StyleSanitizerPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {
    }

    transform(value: string): any {
        if (!value) {
            return value;
        }
        return this.domSanitizer.bypassSecurityTrustStyle(value);
    }

}
