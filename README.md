# ngx-material-timepicker

Handy [material design](https://material.io/guidelines/components/pickers.html#pickers-time-pickers) timepicker for Angular 4.0+

## Demo

https://agranom.github.io/ngx-material-timepicker/

## Getting started

Install timepicker through npm:
```angular2html
npm install --save ngx-material-timepicker
```
Next import the timepicker module into your apps module:
```typescript
import {NgModule} from '@angular/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  imports: [NgxMaterialTimepickerModule.forRoot()]
})
export class MyModule {}
```
Finally connect the timepicker to an input via a template property:
```angular2html
<input [ngxTimepicker]="picker">
<ngx-material-timepicker #picker></ngx-material-timepicker>
```
The timepicker opens once you click on the input 
## Documentation

#### API reference for Angular Material Timepicker
```typescript
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
```
**NgxTimepicker**

Directive responsible for managing the timepicker popup and setting value to input

Selector: `ngxTimepicker`

**Properties**

| Name | Description |
|------|-------------|
| @Input()
  ngxTimepicker: NgxMaterialTimepicker | The timepicker that this input is associated with. | 
| @Input()
  disabled: boolean | Weather the timepicker popup should be disabled. |
| @Input()
  value: string | Set default time for timepicker. |
| @Input()
  format: number | `12` or `24` . Select time format that returns timepicker. `12` (AM/PM) format by default. |
| @Input()
  ESC: boolean | Disable or enable closing timepicker by ESC. |
  
**NgxMaterialTimepickerComponent**

Component responsible for visualisation the timepicker

Selector: `ngx-material-timepicker`

**Properties**


| Name | Description |
|------|-------------|
| @Input()
  cancelBtnTmpl: TemplateRef<Node> |  Set if you want to change cancel button to your custom one. | 
| @Input()
  confirmBtnTmpl: TemplateRef<Node> | Set if you want to change confirm button to your custom one. |
| @Output()
  timeSet: EventEmitter<string> | Emits time when that was set. |

## Changes

Work is in progress.

## Development

### Prepare your environment

Install local dev dependencies: `npm install` while current directory is this repo.
 
### Development server

Run `npm start` to start a development server on a port 4200.

Open `http//:localhost:4200` on your browser.

## Tests

Work is in progress.

## License

MIT

