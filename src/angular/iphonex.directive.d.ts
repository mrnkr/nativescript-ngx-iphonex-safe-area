import { ElementRef, Renderer, OnInit, OnDestroy } from '@angular/core';
export declare class iPhoneXDirective implements OnInit, OnDestroy {
    private el;
    private renderer;
    mind: string[];
    padding: boolean;
    constructor(el: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
