import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ExampleSourceCodeComponent } from './example-source-code/example-source-code.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from './material-timepicker/ngx-material-timepicker.module';


@NgModule({
    declarations: [
        AppComponent,
        ExampleSourceCodeComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NgxMaterialTimepickerModule.setLocale('ar-AE'),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
