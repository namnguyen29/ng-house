import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private readonly element = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  public highlightColor = input('');

  @HostBinding('style.color')
  public get color(): string {
    return this.highlightColor();
  }

  @HostListener('mouseenter')
  public onMouseEnter(): void {
    this.highlight('green');
  }

  @HostListener('mouseleave')
  public onMouseLeave(): void {
    this.highlight('');
  }

  private highlight(color: string): void {
    this.renderer.setStyle(this.element.nativeElement, 'background-color', color);
  }
}
