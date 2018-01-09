
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { iPhoneXDirective } from './iphonex.directive';

@NgModule({
    imports: [
      NativeScriptModule
    ],
    declarations: [
      iPhoneXDirective
    ],
    exports: [
      iPhoneXDirective
    ]
})
export class NgiPhoneXSafeAreaModule { }