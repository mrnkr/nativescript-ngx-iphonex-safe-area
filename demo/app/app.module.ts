import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptAnimationsModule } from "nativescript-angular/animations";
import { AppComponent } from "./app.component";

import { ArrayPipe } from './array.pipe';

import { NgiPhoneXSafeAreaModule } from 'nativescript-ngx-iphonex-safe-area';
import { NgDebounceTapModule } from 'nativescript-ngx-debounce-tap';

import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

@NgModule({
	bootstrap: [
		AppComponent
	],
	imports: [
		NativeScriptModule,
		NgiPhoneXSafeAreaModule,
		NativeScriptAnimationsModule,
		NgDebounceTapModule,
		TNSFontIconModule.forRoot({
			'ion': './assets/ionicons.css'
		})
	],
	declarations: [
		AppComponent,
		ArrayPipe
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
