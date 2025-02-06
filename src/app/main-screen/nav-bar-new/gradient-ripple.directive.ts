import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appGradientRipple]'
})
export class GradientRippleDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // Delay to ensure ripple element is created
    setTimeout(() => {
      const rippleContainer = this.el.nativeElement.querySelector('.mat-ripple-element');
      if (rippleContainer) {
        this.renderer.setStyle(rippleContainer, 'background-image', 'linear-gradient(90deg, #E67C73, #7986CB)');
        this.renderer.setStyle(rippleContainer, 'background-blend-mode', 'overlay');
        this.renderer.setStyle(rippleContainer, 'opacity', '0.3');
        this.renderer.setStyle(rippleContainer, 'border-radius', '50px');
      }
    }, 0);
  }
}
