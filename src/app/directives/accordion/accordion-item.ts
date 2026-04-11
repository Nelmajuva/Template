import { Directive, Input, signal, computed, ElementRef, inject, PLATFORM_ID, effect } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appAccordionItem]',
  exportAs: 'appAccordionItem',
})
export class AccordionItem {
  @Input() disabled = false;

  readonly _open = signal(false);
  readonly open = this._open.asReadonly();
  readonly isOpen = computed(() => this._open());

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly htmlElement: ElementRef<HTMLElement> = inject(ElementRef);

  constructor() {
    if (this.isBrowser) {
      effect(() => {
        const open = this._open();
        const body = this.htmlElement.nativeElement.querySelector<HTMLElement>('.accordion-body-inner');

        if (!body) return;

        if (open) body.style.maxHeight = body.scrollHeight + 'px';
        else body.style.maxHeight = '0';
      });
    }
  }

  toggle: () => void = () => this.setOpen(!this._open());

  setOpen(value: boolean): void {
    this._open.set(value);
    this._recalcHeight();
  }

  _recalcHeight(): void {
    if (!this.isBrowser) return;
    const body = this.htmlElement.nativeElement.querySelector<HTMLElement>('.accordion-body-inner');

    if (!body) return;

    if (this._open()) body.style.maxHeight = body.scrollHeight + 'px';
    else body.style.maxHeight = '0';
  }
}
