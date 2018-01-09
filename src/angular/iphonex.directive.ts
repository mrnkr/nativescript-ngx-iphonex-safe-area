import { Directive, Input, ElementRef, Renderer, OnInit, OnDestroy } from '@angular/core';

import { on, off, orientationChangedEvent, OrientationChangedEventData } from 'application';

import { getDeviceName, getScreenOrientation } from '../device-info';

@Directive({
  selector: '[iPhoneX]'
})
export class iPhoneXDirective implements OnInit, OnDestroy {
  @Input() mind: string[];
  @Input() padding: boolean;

  constructor(
    private el: ElementRef,
    private renderer: Renderer
  ) {}

  ngOnInit() {
    if (getDeviceName() === 'iPhoneX') {
      // Make sure if mind was not provided the fallback value takes everything into consideration
      if (!this.mind) {
        this.mind = ['left', 'right', 'bottom'];
      }

      // Set the appropriate classes
      this.renderer.setElementClass(this.el.nativeElement, 'safe-' + (this.padding ? 'padding' : 'margin') + '-left', this.mind.indexOf('left') !== -1);
      this.renderer.setElementClass(this.el.nativeElement, 'safe-' + (this.padding ? 'padding' : 'margin') + '-right', this.mind.indexOf('right') !== -1);
      this.renderer.setElementClass(this.el.nativeElement, 'safe-' + (this.padding ? 'padding' : 'margin') + '-bottom', this.mind.indexOf('bottom') !== -1);

      // Set initial screen orientation
      if (getScreenOrientation() === 'landscape') {
        this.renderer.setElementClass(this.el.nativeElement, 'landscape', true);
      } else {
        this.renderer.setElementClass(this.el.nativeElement, 'portrait', true);
      }

      // Subscribe to orientation changes
      on(orientationChangedEvent, (args: OrientationChangedEventData) => {
        if (args.newValue === 'landscape') {
          this.renderer.setElementClass(this.el.nativeElement, 'landscape', true);
          this.renderer.setElementClass(this.el.nativeElement, 'portrait', false);
        } else {
          this.renderer.setElementClass(this.el.nativeElement, 'landscape', false);
          this.renderer.setElementClass(this.el.nativeElement, 'portrait', true);
        }
      });
    }
  }

  ngOnDestroy() {
    // Unsubscribe from the event
    if (getDeviceName() === 'iPhoneX') {
      off(orientationChangedEvent);
    }
  }
}
