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
       
       <div class="default-time-example">
            <input aria-label="default time" [ngxTimepicker]="defaultTime" [value]="'05:11 pm'"  readonly>
            <ngx-material-timepicker #defaultTime></ngx-material-timepicker>
       </div>
       
       <div class="disabled-example">
            <input placeholder="Disabled Time Picker" aria-label="disabled time picker" [ngxTimepicker]="disabled" [disabled]="true">
            <ngx-material-timepicker #disabled></ngx-material-timepicker>
       </div>
    `;

    minMaxExamples: string = `
        <div class="min-time-example">
            <input placeholder="Min time 03:15 am"
                [ngxTimepicker]="min" [min]="'03:15 am'" readonly>
            <ngx-material-timepicker #min></ngx-material-timepicker>
        </div>
        
        <div class="max-time-example">
            <input placeholder="Max time 06:18 pm"
                [ngxTimepicker]="max" max="06:18 pm" readonly>
            <ngx-material-timepicker #max></ngx-material-timepicker>
        </div>
        
        <div class="time-range-example">
            <input placeholder="Time range from 12:10 am to 08:11 pm"
                [ngxTimepicker]="range" min="12:10 am" max="08:11 pm" readonly>
            <ngx-material-timepicker #range></ngx-material-timepicker>
        </div>`;

    customSettings: string = `
        <div class="custom-buttons-example">
            <input placeholder="Custom buttons" aria-label="Custom buttons" [ngxTimepicker]="timepickerWithButtons" readonly>
            <ngx-material-timepicker #timepickerWithButtons [cancelBtnTmpl]="cancelBtn"
                                             [confirmBtnTmpl]="confirmBtn"></ngx-material-timepicker>
                                             
            <ng-template #cancelBtn>
                <button style="margin-right: 10px;">Cancel tmpl</button>
            </ng-template>
            <ng-template #confirmBtn>
                <button>Confirm tmpl</button>
            </ng-template>
         </div>
    `;
}
