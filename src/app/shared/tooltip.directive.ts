import {
  ContentChild,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({selector: '[appTooltipDirective]'})
export class TooltipDirective {

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef) {
  }

  // @ts-ignore
  @Input() tooltipTemplate: TemplateRef<any>;

  @HostListener('mouseenter') onMouseEnter(): void {
    const view = this.viewContainerRef.createEmbeddedView(this.tooltipTemplate);
    view.rootNodes.forEach(node =>
      this.renderer.appendChild(this.elementRef.nativeElement, node));
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }
}
