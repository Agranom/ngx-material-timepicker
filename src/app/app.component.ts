import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    simpleExamples: string = `
       <div class="12hr-example">
            <input placeholder="12hr format (default settings)" aria-label="12hr format" [ngxTimepicker]="default" readonly>
            <ngx-material-timepicker #default></ngx-material-timepicker>
       </div>
       
       <div class="24hr-example">
            <input placeholder="24hr format" aria-label="24hr format" [ngxTimepicker]="fullTime" [format]="24"  readonly>
            <ngx-material-timepicker #fullTime></ngx-material-timepicker>
       </div>
       
       <div class="disabled-example">
            <input placeholder="Disabled Time Picker" aria-label="disabled time picker" [ngxTimepicker]="disabled" [disabled]="true">
            <ngx-material-timepicker #disabled></ngx-material-timepicker>
       </div>
    `;
}
