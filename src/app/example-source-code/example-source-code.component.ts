import {Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-example-source-code',
    templateUrl: './example-source-code.component.html',
    styleUrls: ['./example-source-code.component.scss'],
    animations: [
        trigger('slideToggle', [
            state('inactive', style({height: 0})),
            state('active', style({height: '*'})),
            transition('inactive <=> active', [
                animate(300)
            ])
        ])
    ]
})
export class ExampleSourceCodeComponent {

    animationState = 'inactive';

    @Input() sourceCode: string;

    toggleAnimState(): void {
        this.animationState = this.animationState === 'inactive' ? 'active' : 'inactive';
    }

}
