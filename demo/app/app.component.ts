import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ViewChild, ElementRef } from "@angular/core";
import { style, state, animate, transition, trigger } from '@angular/animations';
import { Page } from 'ui/page';
import { isAndroid } from 'platform';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';
import { TNSFancyAlert } from 'nativescript-fancyalert';
import * as SocialShare from "nativescript-social-share";

@Component({
	selector: "ns-app",
	templateUrl: "app.component.xml",
	animations: [
		trigger('fadeInOut', [
			state('active', style({opacity: 1, transform: 'translateX(0)'})),
			transition('void => *', [
				style({
					opacity: 0,
					transform: 'translateX(-100%)'
				}),
				animate('0.3s ease-in')
			]),
			transition('* => void', [
				animate('0.3s 0.1s ease-out', style({
					opacity: 0,
					transform: 'translateX(100%)'
				}))
			])
		])
	]
})
export class AppComponent implements OnInit, AfterViewInit {
	@ViewChild('self') self: ElementRef;

	private visible = true;
	private mind = ['left', 'right', 'bottom'];
	private props = {
		left: true,
		right: true,
		bottom: true,
		padding: false
	};

	constructor(
		private page: Page,
		private fonticon: TNSFontIconService,
		private changeDetectorRef: ChangeDetectorRef
	) {}

	ngOnInit() {
		console.log('If you reading this... Hello human! Promise you will tell me if you run into any bugs!');
		console.log('Should you fix a bug yurself, post a PR on Github in exchange for a cookie!');
		this.page.backgroundSpanUnderStatusBar = true;
		this.page.actionBarHidden = isAndroid;
	}

	ngAfterViewInit() {
		if (isAndroid) {
			let show = () => {
				TNSFancyAlert.showNotice('You bored huh?', 
																 "This plugin is clearly useless on Android, but I swear it won't break your app either...", 
																 "We'll see bout that!");
			}

			try {
				show();
			} catch (e) {
				setTimeout(show, 10);
			}
		}
	}

	private showInfo(): void {
		TNSFancyAlert.showInfo('Well, hello there!', 
													 'Not much to say, just got bored and made this simple but really useful plugin... Hope you like it!', 
													 'Thanks!');
	}

	private share(): void {
		SocialShare.shareUrl("https://github.com/mrnkr", "Check out this and my other repos!");
	}

	private onCheckedChange(key: string, value: boolean): void {
		this.props[key] = value;
		
		if (key !== 'padding') {
			this.mind = [];
			if (this.props.left) this.mind.push('left');
			if (this.props.right) this.mind.push('right');
			if (this.props.bottom) this.mind.push('bottom');
		}
	}

	private reload(): void {
		this.visible = false;
		this.changeDetectorRef.detectChanges();

		setTimeout(() => {
			this.visible = true;
			this.changeDetectorRef.detectChanges();
		}, 300);
	}
}
