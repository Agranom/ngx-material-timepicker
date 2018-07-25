# ngx-material-timepicker

Handy [material design](https://material.io/guidelines/components/pickers.html#pickers-time-pickers) timepicker for Angular 6.0+

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
  ngxTimepicker: NgxMaterialTimepickerComponent | The timepicker that this input is associated with. | 
| @Input()
  disabled: boolean | Weather the timepicker popup should be disabled. |
| @Input()
  value: string | Set default time for timepicker. |
| @Input()
  format: number | `12` or `24` . Select time format that returns timepicker. `12` (AM/PM) format by default. |
| @Input()
  min: string or Moment | Set min time for timepicker (`11:15 pm` or `moment().hour(11).minute(15)` ) |
| @Input()
  max: string or Moment | Set max time for timepicker (`11:15 pm` or `moment().hour(11).minute(15)` ) |
| @Input()
  disableClick: boolean | Set `true` to disable opening timepicker by clicking on the input |

  
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
| @Input()
  ESC: boolean | Disable or enable closing timepicker by ESC. |
| @Output()
  timeSet: EventEmitter<string> | Emits time when that was set. |
  
**NgxMaterialTimepickerToggleComponent**

Component responsible for opening the timepicker.

Selector: `ngx-material-timepicker-toggle`

**Properties**


| Name | Description |
|------|-------------|
| @Input()
  for: NgxMaterialTimepickerComponent |  Timepicker instance that the button will toggle | 
| @Input()
  disabled: boolean | Whether the toggle button is disabled |
  
**NgxMaterialTimepickerToggleIconDirective**

Can be used to override the icon of a `NgxMaterialTimepickerToggleComponent`.

Selector: `[ngxMaterialTimepickerToggleIcon]`

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

