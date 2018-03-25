import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgxMaterialTimepickerModule} from "./material-timepicker/ngx-material-timepicker.module";
import {ExampleSourceCodeComponent} from './example-source-code/example-source-code.component';


@NgModule({
    declarations: [
        AppComponent,
        ExampleSourceCodeComponent
    ],
    imports: [
        BrowserModule,
        NgxMaterialTimepickerModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
