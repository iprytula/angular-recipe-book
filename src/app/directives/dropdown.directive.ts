import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  @HostListener('click', ['$event']) click(e) {
    if (e.target.classList.contains('show')) {
      this.renderer.removeClass(this.elRef.nativeElement, 'show');
      this.renderer.removeClass(
        this.renderer.nextSibling(this.elRef.nativeElement),
        'show'
      );
    } else {
      this.renderer.addClass(this.elRef.nativeElement, 'show');
      this.renderer.addClass(
        this.renderer.nextSibling(this.elRef.nativeElement),
        'show'
      );
    }
  }

  // @HostListener('document:click', ['$event']) clickout(e) {
  //   console.log(e.target.classList);
  // }
}
