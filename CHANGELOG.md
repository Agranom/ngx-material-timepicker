# Change Log

All notable changes to this project will be documented in this file

## 5.5.3 (2020-05-28)

### Fixes

* fix(ngx-material-timepicker): fix error cannot read property 'replace' of null on 24 Hrs format,
fixes [(#341)](https://github.com/Agranom/ngx-material-timepicker/issues/341)
* fix(ngx-material-timepicker): fix issue with displaying time `24:xx` instead of `00:xx` with default locale,
fixes [(#342)](https://github.com/Agranom/ngx-material-timepicker/issues/342)

## 5.5.2 (2020-05-11)

### Fixes

* fix(ngx-material-timepicker): avoid updating time after closing timepicker,
closes [(#326)](https://github.com/Agranom/ngx-material-timepicker/issues/326)

* fix(ngx-material-timepicker.module): fix NullInjectorError: No provider for InjectionToken TimeLocale for lazy loaded modules,
closes [(#335)](https://github.com/Agranom/ngx-material-timepicker/issues/335),
closes [(#259)](https://github.com/Agranom/ngx-material-timepicker/issues/259),

## 5.5.1 (2020-03-28)

### Fixes

* fix(ngx-material-timepicker): revert to angular 8 and rebuild the package,
closes [(#315)](https://github.com/Agranom/ngx-material-timepicker/issues/315)


## 5.5.0 (2020-03-25)

### Features

* feat(ngx-material-timepicker-field): add `min` and `max` time limits,
closes [(#184)](https://github.com/Agranom/ngx-material-timepicker/issues/184)

### Fixes

* feat(ngx-material-timepicker): fix error that shows after closing timepicker without time changed in 24 format,
fixes [(#311)](https://github.com/Agranom/ngx-material-timepicker/issues/311)


## 5.4.3 (2020-03-14)

### Fixes

* fix(ngx-material-timepicker): prevent typing numbers in editable dial,
fixes [(#305)](https://github.com/Agranom/ngx-material-timepicker/issues/305)


## 5.4.2 (2020-03-11)

### Fixes

* fix(ngx-material-timepicker): fix setting time between interval 00:00 - 00:59,
fixes [(#301)](https://github.com/Agranom/ngx-material-timepicker/issues/301)


## 5.4.1 (2020-03-07)

### Fixes

* fix(ngx-material-timepicker-field): fix bug cannot read property 'replace' of null,
fixes [(#295)](https://github.com/Agranom/ngx-material-timepicker/issues/295)

## 5.4.0 (2020-02-29)

### Fixes

* fix(ngx-material-timepicker): fix setting time from keyboard,
fixes [(#243)](https://github.com/Agranom/ngx-material-timepicker/issues/243),
[(#266)](https://github.com/Agranom/ngx-material-timepicker/issues/266)

* fix(ngx-material-timepicker-dial): + prevent selecting minutes when hoursOnly is true,
fixes [(#281)](https://github.com/Agranom/ngx-material-timepicker/issues/281)

* fix(ngx-material-timepicker): ! fix invalid DateTime in IE 11,
fixes [(#222)](https://github.com/Agranom/ngx-material-timepicker/issues/222)

* fix(ngx-material-timepicker): ! fix invalid DateTime when setting 00:++,
fixes [(#285)](https://github.com/Agranom/ngx-material-timepicker/issues/285)

## 5.3.0 (2019-12-22)

### Fixes

* fix(SSR): change HTMLInputElement types to any

### Features

* feat(ngx-material-timepicker): add export of standalone components,
closes [(#151)](https://github.com/Agranom/ngx-material-timepicker/issues/151)

* feat(ngx-material-timepicker-field): add `timeChanged` @Output event, that emits once time changes,
closes [(#207)](https://github.com/Agranom/ngx-material-timepicker/issues/207)

* feat(ngx-material-timepicker): add `timeChanged` @Output event, that emits once time changes


## 5.2.3 (2019-11-21)

### Fixes

* fix(ngx-material-timepicker-field): bug with setting time to null,
fixes [(#252)](https://github.com/Agranom/ngx-material-timepicker/issues/252)

* fix(ngx-material-timepicker-field): bug with changing time via keyboard,
fixes [(#243)](https://github.com/Agranom/ngx-material-timepicker/issues/243)

* fix(ngx-material-timepicker): fix bugs which occur when Ivy is enabled,
fixes [(#247)](https://github.com/Agranom/ngx-material-timepicker/issues/247)


## 5.2.2 (2019-11-02)

### Fixes

* fix(ngx-material-timepicker-field): display hours and minutes in 2-digit format,
fixes [(#241)](https://github.com/Agranom/ngx-material-timepicker/issues/241), [(#243)](https://github.com/Agranom/ngx-material-timepicker/issues/243)

* fix(ngx-material-timepicker): SSR support (changing window event types to `any`)


## 5.2.1 (2019-10-12)

### Fixes

* fix(ngx-material-timepicker): bug with formatting time while typing,
fixes [(#233)](https://github.com/Agranom/ngx-material-timepicker/issues/233)

* fix(ngx-material-timepicker-field): bug with setting time without interaction with a clock face,
fixes [(#211)](https://github.com/Agranom/ngx-material-timepicker/issues/211)


## 5.2.0 (2019-10-05)

### Features

* feat(ngx-material-timepicker): add `timepickerClass` property to set custom class for the timepicker,
closes [(#227)](https://github.com/Agranom/ngx-material-timepicker/issues/227)

* feat(ngx-material-timepicker): add `hoursOnly` property to prevent switching to minutes automatically,
closes [(#208)](https://github.com/Agranom/ngx-material-timepicker/issues/208)

* feat(ngx-material-timepicker): add `appendToInput` property that allows append timepicker to input (without modal),
closes [(#185)](https://github.com/Agranom/ngx-material-timepicker/issues/185)

### Fixes

* fix(ngx-timepicker-field): bug with changing minutes via input field,
fixes [(#229)](https://github.com/Agranom/ngx-material-timepicker/issues/229)

* fix(ngx-material-timepicker): bug with theming,
fixes [(#218)](https://github.com/Agranom/ngx-material-timepicker/issues/218)

* fix(ngx-material-timepicker): fix error `Cannot read property 'split' of null` when setting time as `null` or `undefined`,
fixes [(#215)](https://github.com/Agranom/ngx-material-timepicker/issues/215)

* fix(ngx-material-timepicker): clicking area for 00 and 12 in 24 format,
fixes [(#114)](https://github.com/Agranom/ngx-material-timepicker/issues/114)


## 5.1.1 (2019-09-17)

### Fixes

* fix(ngx-material-timepicker): fix appending an empty component to body,
fixes [(#130)](https://github.com/Agranom/ngx-material-timepicker/issues/130)


## 5.1.0 (2019-09-11)

### Features

* feat(ngx-material-timepicker-theme): add customization for editable dial,
closes [(#204)](https://github.com/Agranom/ngx-material-timepicker/issues/204)

* feat(ngx-material-field): add custom buttons, closes [(#200)](https://github.com/Agranom/ngx-material-timepicker/issues/200)

### Fixes

* fix(ngx-material-timepicker): your minutes (NaN) doesnt match your minutesGap when no time picked.

* fix(ngx-material-timepicker): dynamic format change, 
fixes [(#104)](https://github.com/Agranom/ngx-material-timepicker/issues/104),
fixes [(#198)](https://github.com/Agranom/ngx-material-timepicker/issues/198)

* fix(ngx-material-timepicker): incorrect typings, fixes [(#195)](https://github.com/Agranom/ngx-material-timepicker/issues/195)

* fix(ngx-material-timepicker): cutting timepicker when parent container has `overflow: hidden`,
fixes [(#130)](https://github.com/Agranom/ngx-material-timepicker/issues/130)

### Improvements

* improvement(ngx-material-timepicker): set default time equal to `min` time when `min` time is provided and default time isn't,
closes [(#203)](https://github.com/Agranom/ngx-material-timepicker/issues/203),
fixes [(#202)](https://github.com/Agranom/ngx-material-timepicker/issues/202)

## BREAKING CHANGES

## 5.0.0 (2019-09-06)

Add internationalization, so that it might affect on time format.

### Features

* feat(ngx-material-timepicker): add internationalization for timepicker. Default locale is set to `en-US`,
closes [(#154)](https://github.com/Agranom/ngx-material-timepicker/issues/154)

### Fixes

* fix(ngx-material-timepicker): add `@types/luxon` to dependencies, so that it will be installed with `ngx-material-timepicker`,
closes [(#189)](https://github.com/Agranom/ngx-material-timepicker/issues/189)

## 4.0.2 (2019-07-28)

### Fixes

* fix(autofocus): provide `{ preventScroll: true }` argument to `.focus()` method ,
closes [(#177)](https://github.com/Agranom/ngx-material-timepicker/issues/177)

* fix(ngx-timepicker-field): set default time only if it is provided,
closes [(#174)](https://github.com/Agranom/ngx-material-timepicker/issues/174)

### Improvements

* improvement(ngx-timepicker-field): provide css class for disabled timepicker,
closes [(#174)](https://github.com/Agranom/ngx-material-timepicker/issues/174)


## 4.0.1 (2019-07-15)

### Fixes

* fix(ngx-timepicker-field): fix bug when dynamically change format,
closes [(#170)](https://github.com/Agranom/ngx-material-timepicker/issues/170)

## BREAKING CHANGES

## 4.0.0 (2019-06-21)

Upgrade package to angular 8

## 3.3.1 (2019-06-21)

* fix(ngx-timepicker): downgrade angular to v7 and recompile package to fix warning,
 closes [(#158)](https://github.com/Agranom/ngx-material-timepicker/issues/158)
 
 * fix(time-formatter.pipe): handle null or empty input
  closes [(#160)](https://github.com/Agranom/ngx-material-timepicker/issues/160)

## 3.3.0 (2019-06-13)

### Features

* feat(ngx-timepicker): make the timepicker compatible with Angular 8,
 closes [(#148)](https://github.com/Agranom/ngx-material-timepicker/issues/148)
 
* feat(ngx-timepicker): remove `luxon` from `peerDependencies` and add to `dependencies`,
 closes [(#147)](https://github.com/Agranom/ngx-material-timepicker/issues/147)

## 3.2.2 (2019-06-09)

### Fixes

* fix(ngx-timepicker-field): add `ngx-timepicker-field`to public API

## 3.2.1 (2019-06-09)

### Fixes

* fix(ngx-material-timepicker): fix bug with module resolution,
 closes [(#152)](https://github.com/Agranom/ngx-material-timepicker/issues/152)

## 3.2.0 (2019-06-08)

### Features

* feat(ngx-timepicker-field): create `ngx-timepicker-field` component,
 closes [(#55)](https://github.com/Agranom/ngx-material-timepicker/issues/55)

## 3.1.0 (2019-05-13)

### Features

* feat(ngx-material-timepicker): add `disableAnimation` input to prevent timepicker animation,
 closes [(#134)](https://github.com/Agranom/ngx-material-timepicker/issues/134)


## 3.0.3 (2019-04-24)

### Fixes

* fix(ngx-material-timepicker): move functions from namespaces, closes [(#94)](https://github.com/Agranom/ngx-material-timepicker/issues/94)

* fix(ngx-material-timepicker): min/max time validation with 24-hours format,
closes [(#127)](https://github.com/Agranom/ngx-material-timepicker/issues/127)

* fix(ngx-material-timepicker-facet): set minutes angle step according to minutes gap,
closes [(#132)](https://github.com/Agranom/ngx-material-timepicker/issues/132)


## 3.0.2 (2019-03-23)

### Fixes

* fix(ngx-material-timepicker): fix issues with selecting time [(cf80399)](https://github.com/Agranom/ngx-material-timepicker/commit/cf80399e7d59187918e4ae6ac031c248bbaa2827),
closes [(#121)](https://github.com/Agranom/ngx-material-timepicker/issues/121), [(#122)](https://github.com/Agranom/ngx-material-timepicker/issues/121)

* fix(ngx-material-timepicker-period): disable to set period if it is not valid [(b7c3626)](https://github.com/Agranom/ngx-material-timepicker/commit/b7c36267a655b6a14bb9ba5b1e9ac0ebe1933cec),
closes [(#120)](https://github.com/Agranom/ngx-material-timepicker/issues/120)

### Improvements

* improvement(ngx-material-timepicker-component): provide `NgxMaterialTimepickerComponent` as public API [(159167a)](https://github.com/Agranom/ngx-material-timepicker/commit/159167a73975396edf1719befd6920fdae2d7ac2),
closes [(#119)](https://github.com/Agranom/ngx-material-timepicker/issues/119)

## BREAKING CHANGES

## 3.0.1 (2019-03-17)

* Decrease package size by changing momentJs to [luxon](https://moment.github.io/luxon/),
 closes [(#78)](https://github.com/Agranom/ngx-material-timepicker/issues/78)
 
* improvement(NgxMaterialTimepickerModule): remove forRoot() static method and add `provideIn` property to services,
closes [(#83)](https://github.com/Agranom/ngx-material-timepicker/issues/83) 

* Update peerDependencies

## 2.13.0 (2019-02-16)

### Features

* feat(ngx-material-timepicker): add `hourSelected` event emitter [(dd43874)](https://github.com/Agranom/ngx-material-timepicker/commit/dd4387407284788438a79283139a9a4f6e4fff44),
closes [(#108)](https://github.com/Agranom/ngx-material-timepicker/issues/108)

* feat(ngx-material-timepicker): add `opened` event emitter [(5bc9cc0)](https://github.com/Agranom/ngx-material-timepicker/commit/5bc9cc088482ba1aeee32af2c97a0ece86dc1205),
closes [(#112)](https://github.com/Agranom/ngx-material-timepicker/issues/112)

* feat(ngx-material-timepicker-dial): add possibility to set a custom hint template [(479f311)](https://github.com/Agranom/ngx-material-timepicker/commit/479f311cee74db79372263a19911cf5b0e73b8b8),
relates to [(#103)](https://github.com/Agranom/ngx-material-timepicker/issues/103)

### Fixes

* fix(clock face): fix bug with dead zone in 12 or 00 time section [(07a8618)](https://github.com/Agranom/ngx-material-timepicker/commit/07a861897842a8e7225a2a9d4613083481587df1),
 closes [(#109)](https://github.com/Agranom/ngx-material-timepicker/issues/109)

### Improvements

* improvement(ngx-material-timepicker-dial): show/hide dial hint onFocus/onBlur dial control [(c96da39)](https://github.com/Agranom/ngx-material-timepicker/commit/c96da391ef37931947d0db8b65b9a987bb59b4eb),
 relates to [(#103)](https://github.com/Agranom/ngx-material-timepicker/issues/103)

## 2.12.0 (2019-01-26)

### Features

* feat(ngx-material-timepicker): `preventOverlayClick` property was added to prevent closing the timepicker by overlay click,
closes [(#89)](https://github.com/Agranom/ngx-material-timepicker/issues/89)

### Fixes

* fix(ngx-material-timepicker): add readable error and preventing setting default time if default minute isn't allowed with provided minutesGap,
 closes [(#81)](https://github.com/Agranom/ngx-material-timepicker/issues/81) and
 closes [(#97)](https://github.com/Agranom/ngx-material-timepicker/issues/97)

### Improvements

* improvement(minutesGap): prevent setting null or undefined
* improvement(ngx-material-timepicker): change time by keyboard arrows including minutesGap, 
closes [(#103)](https://github.com/Agranom/ngx-material-timepicker/issues/103)

## 2.11.2 (2019-01-07)

### Fixes

* fix(ngx-material-timepicker): fix bug with circular dependencies, closes [(#91)](https://github.com/Agranom/ngx-material-timepicker/issues/91)

## 2.11.1 (2018-12-30)

### Fixes

* fix(NgxMaterialTimepickerTheme): add interfaces to public API, closes [(#85)](https://github.com/Agranom/ngx-material-timepicker/issues/85)
* fix(ngx-material-timepicker-dial): centered time position, closes [(#86)](https://github.com/Agranom/ngx-material-timepicker/issues/86)
* fix(ngx-material-timepicker): make horizontal position only for mobile devices with landscape orientation, closes [(#87)](https://github.com/Agranom/ngx-material-timepicker/issues/87)

## 2.11.0 (2018-12-22)

### Features

* feat(ngx-material-timepicker): add `NgxMaterialTimepickerDirective` for theming, closes [(#71)](https://github.com/Agranom/ngx-material-timepicker/issues/71)

## 2.10.0 (2018-11-30)

### Features

* feat(ngx-material-timepicker): add `@Input() defaultTime` to set default time for a timepicker dial only, closes [(#64)](https://github.com/Agranom/ngx-material-timepicker/issues/64)


## 2.9.0 (2018-11-24)

### Features

* feat(timepicker dial): add accessibility from keyboard and input restrictions for a dial, closes [(#56)](https://github.com/Agranom/ngx-material-timepicker/issues/56)

## 2.8.4 (2018-11-20)

### Fixes

* fix(ExpressionChangedAfterItHasBeenCheckedError): closes [(#56)](https://github.com/Agranom/ngx-material-timepicker/issues/56)

## 2.8.4 (2018-11-20)

### Fixes
 * fix(ExpressionChangedAfterItHasBeenCheckedError): closes [(#66)](https://github.com/Agranom/ngx-material-timepicker/issues/66)
 * fix(timepicker dial control): prevent auto showing keyboard on IOS, closes [(#68)](https://github.com/Agranom/ngx-material-timepicker/issues/68)

## 2.8.3 (2018-11-02)

### Fixes

* fix(timepicker output): fix format appearance, closes [(#62)](https://github.com/Agranom/ngx-material-timepicker/issues/62)
* fix(timepicker clock face): fix touch events, closes [(#61)](https://github.com/Agranom/ngx-material-timepicker/issues/61)
* fix(timepicker dial): change focus on dial (hour <=> minute)

## 2.8.2 (2018-10-29)

### Fixes

* fix(timepicker period): change text of warning text box and hide it after few seconds, closes [(#44)](https://github.com/Agranom/ngx-material-timepicker/issues/44)

## 2.8.1 (2018-10-24)

### Fixes

* fix(timepicker period): disable switching between periods if there are no available time to select, closes [(#44)](https://github.com/Agranom/ngx-material-timepicker/issues/44)


## 2.8.0 (2018-10-23)

### Features

* feat(ngx-material-timepicker): add option `minutesGap` that defines a gap between minutes, closes [(#51)](https://github.com/Agranom/ngx-material-timepicker/issues/51)

## 2.7.0 (2018-10-21)

### Features

* feat(ngx-material-timepicker): add flag `enableKeyboardInput` that enables or disables changing time through a keyboard on the timepicker dial without interaction with a clock face, closes [(#49)](https://github.com/Agranom/ngx-material-timepicker/issues/49)

### Fixes

* fix(timepicker hours): fix bug with wrong disabling hours on min or max ranges.

## 2.6.5 (2018-10-15)

### Fixes

* fix(timepicker minutes face): fix disabling minutes within min and max time range, closes [(#43)](https://github.com/Agranom/ngx-material-timepicker/issues/43)

## 2.6.4 (2018-10-10)

### Fixes

* fix(timepicker minutes face): fix bug with wrong disabling minutes, closes [(#44)](https://github.com/Agranom/ngx-material-timepicker/issues/44)

* ref(timepicker clock face): change clock face from hours to minutes only if user stop interacting with clock face (mouseup event) and time was changed


## 2.6.3 (2018-10-08)

### Fixes

* fix(timepicker minutes face): fix disabling minutes properly in a time range,
 closes [(#43)](https://github.com/Agranom/ngx-material-timepicker/issues/43)


## 2.6.2 (2018-10-07)

### Fixes

* fix(clock hand): change clock hand position if time is not available

## 2.6.1 (2018-10-07)

### Fixes

* fix(ngxTimepicker): fix bug with setting disabled time to input, closes [(#44)](https://github.com/Agranom/ngx-material-timepicker/issues/44)
* fix(time range): fix bug with `12 pm` selection, closes [(#43)](https://github.com/Agranom/ngx-material-timepicker/issues/43)

## 2.6.0 (2018-09-15)

### Features

* feat(ngx-material-timepicker-component): add closed output, that fires after timepicker was closed

### Fixes

* fix(timepicker clock face): reset time after cancelation timepicker [(3398591)](https://github.com/Agranom/ngx-material-timepicker/commit/3398591a5355aa1e30180c7b4f30ce5be9e5c5ce), closes [(#35)](https://github.com/Agranom/ngx-material-timepicker/issues/35)
* fix(timepicker clock hand): set different sizes for portrait and landscape orientations [(429ddfd)](https://github.com/Agranom/ngx-material-timepicker/commit/429ddfd06992eb4e3ea1bc2aea9caa653d48df59) 

## 2.5.4 (2018-09-03)

### Fixes

* fix(timepicker): fix time formatter for 24-hour format [(09a15c4)](https://github.com/Agranom/ngx-material-timepicker/commit/09a15c410992dc04426254c6d1d1823e4112ab4c), closes [(#30)](https://github.com/Agranom/ngx-material-timepicker/issues/30), 


## 2.5.3 (2018-08-28)

### Fixes

* fix(ngx timepicker directive): fix output value with reactive forms [(3eb6312)](https://github.com/Agranom/ngx-material-timepicker/commit/3eb63128bf1382d988789e5dcaeb2288751013a5), closes [(#30)](https://github.com/Agranom/ngx-material-timepicker/issues/30)


## 2.5.2 (2018-08-16)

### Fixes

* fix(timepicker hour face): change clock hand size to fit it for adaptive version[(2a2e0c4)](https://github.com/Agranom/ngx-material-timepicker/commit/2a2e0c4918eb4da5e2aa0fc734dab7316035acca)
* fix(timepicker hour face): fix bug which occurs if set 00 hour as default [(694ef21)](https://github.com/Agranom/ngx-material-timepicker/commit/694ef215ffa69ccfbe55e0b1dc70707feaad1a77), closes [(#28)](https://github.com/Agranom/ngx-material-timepicker/issues/28)

## 2.5.1 (2018-08-07)

### Fixes

* fix(timepicker directive): fix bug with wrong output when choose 12h in 24hours format face [(d5c9166)](https://github.com/Agranom/ngx-material-timepicker/commit/d5c916649856a915335db9e9677219e708cc9ee7), closes [(#24)](https://github.com/Agranom/ngx-material-timepicker/issues/24)


## 2.5.0 (2018-08-03)

### Feature

* feat(timepicker hours clock face): add 24-hours clock face [(f46bb49)](https://github.com/Agranom/ngx-material-timepicker/commit/f46bb49b43774db901026d8081a42216ad733a19), closes [(#14)](https://github.com/Agranom/ngx-material-timepicker/issues/14)

## 2.4.1 (2018-07-27)

### Fixes

* fix(ngxTimepicker): check value if null, empty or undefined [(395188c)](https://github.com/Agranom/ngx-material-timepicker/commit/395188ce9883cbfb173bbf51fa87586ae6c4145e), closes [(#21)](https://github.com/Agranom/ngx-material-timepicker/issues/21)


## 2.4.0 (2018-07-25)

### Features

* feat(ngx-material-timepicker-toggle): add possibility to open timepicker by button [(f4b65c9)](https://github.com/Agranom/ngx-material-timepicker/commit/f4b65c94c659dfceaad63b3560adde08a3423a2c), closes [(#13)](https://github.com/Agranom/ngx-material-timepicker/issues/16)

## 2.3.0 (2018-07-24)

### Features

* feat(timepicker): add possibility to set min and max time [(e084e28)](https://github.com/Agranom/ngx-material-timepicker/commit/e084e28f353420b9c74238a1b7e6688c61a7ee1b), closes [(#13)](https://github.com/Agranom/ngx-material-timepicker/issues/13)


## 2.2.5 (2018-07-10)

### Fixes

* fix(default time): fix bug which occurs when set value in 24-hours format [(24e7156)](https://github.com/Agranom/ngx-material-timepicker/commit/24e7156924e2ea785024936e429a3654c47d3612)

## 2.2.4 (2018-07-10)

### Fixes

* fix(timepicker format): change momentJs format to make 24-hours formatting workable [(6966dd9)](https://github.com/Agranom/ngx-material-timepicker/commit/6966dd94e119d62683d3f54855905b9e47a71c93), closes [(#12)](https://github.com/Agranom/ngx-material-timepicker/issues/12)

## 2.2.3 (2018-07-05)

### Fixes

* fix(default time): move NgxMaterialTimepickerService to component providers, so that each timepicker has its own default time [(409b032)](https://github.com/Agranom/ngx-material-timepicker/commit/409b032c52f030203578709dcf57b2a28ca2cd5d), closes [(#9)](https://github.com/Agranom/ngx-material-timepicker/issues/9)
* fix(focus anchor directive): wrap focusing element in setTimeout to avoid ExpressionChangedAfterItHasBeenCheckedError while using ngModel [(f9c86fa)](https://github.com/Agranom/ngx-material-timepicker/commit/f9c86fa2675347708598900265cd89cba72f4fdb), closes [(#10)](https://github.com/Agranom/ngx-material-timepicker/issues/10)
* fix(ie): remove css variables, because IE doesn't support it [(1fb090f)](https://github.com/Agranom/ngx-material-timepicker/commit/1fb090fbfdb01a8451e15eaf6a0cff43261a5da7)
* fix(ie, edge) change X and Y props to left and top in getBoundingClientRect [(798bda2)](https://github.com/Agranom/ngx-material-timepicker/commit/798bda26e3ee75f052be6a92d545726d5bd0c9ac)
* fix(adaptive): fix adaptive for orientation landscape (increase max width) [(6eac2ff)](https://github.com/Agranom/ngx-material-timepicker/commit/6eac2ff2552007c7736da6887f1943e48b471e68)

## 2.2.2 (2018-06-23)

### Feature

* (timepicker): user can change default time with input [(571ccb3)](https://github.com/Agranom/ngx-material-timepicker/commit/571ccb3785ee2f2cd5d8638a7fe76b949357c798), closes [(#7)](https://github.com/Agranom/ngx-material-timepicker/issues/7)
* refactoring 

## 2.1.2 (2018-05-27)

### BREAKING CHANGES

* upgrade to Angular 6 [(252e998)](https://github.com/Agranom/ngx-material-timepicker/commit/252e9987db9440c79b43b3cb1d202643926ebda1), closes [(#4)](https://github.com/Agranom/ngx-material-timepicker/issues/4) (angular 6 or higher is now required to use this package)

## 1.1.2 (2018-05-24)

### Bug fixes

* Remove BrowserAnimationsModule from NgxMaterialTimepickerModule imports [(2fb6b7d)](https://github.com/Agranom/ngx-material-timepicker/commit/2fb6b7d8475e166e4ca5c1be6bb1eb35e813d79e), closes [(#3)](https://github.com/Agranom/ngx-material-timepicker/issues/3) 

## 1.1.1 (2018-05-16)

### Bug fixes

* Fix error 'cannot find module' which occurs after deploying the previous version

## 1.1.0 (2018-05-16)

### Features

* add possibility to disable or enable closing popup with ESCAPE button [(b2a34bf)](https://github.com/Agranom/ngx-material-timepicker/commit/b2a34bfc2a2a39137f7116f9bcb0ecd2d527bdea)
* add landscape orientation skin [(159e8e6)](https://github.com/Agranom/ngx-material-timepicker/commit/159e8e683a29a0a53b31b6a452389a04707ab5e4)


### Bug Fixes

* **timepicker button:** add type button to prevent auto submitting a form [(2598aa1)](https://github.com/Agranom/ngx-material-timepicker/commit/2598aa1092034843c400c96937e89f4f735d02b1), closes [#1](https://github.com/Agranom/ngx-material-timepicker/issues/1)

# 1.0.0 (2018-03-20)

_Initial release_
