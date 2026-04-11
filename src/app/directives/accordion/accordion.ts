import { Directive, ContentChildren, QueryList, AfterContentInit, Input, inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { AccordionItem } from './accordion-item';

@Directive({
  selector: '[appAccordion]',
  exportAs: 'appAccordion',
})
export class Accordion implements AfterContentInit, AfterViewInit {
  @Input() multi = false;
  @Input() defaultOpen: number | null = 0;

  @ContentChildren(AccordionItem)
  private items!: QueryList<AccordionItem>;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  ngAfterContentInit(): void {
    this.items.forEach((item, index) => {
      item.setOpen(this.defaultOpen === index);
      item.toggle = () => this.toggle(item);
    });
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.items.forEach((item) => item['_recalcHeight']?.());
    }
  }

  toggle(target: AccordionItem): void {
    const isOpen = target.open();
    if (!this.multi) {
      this.items.forEach((item) => {
        if (item !== target) item.setOpen(false);
      });
    }

    target.setOpen(!isOpen);
  }

  openAt(index: number): void {
    const item = this.items.get(index);
    if (item && !item.open()) item.setOpen(true);
  }

  closeAt(index: number): void {
    const item = this.items.get(index);
    if (item) item.setOpen(false);
  }

  closeAll(): void {
    this.items.forEach((item) => item.setOpen(false));
  }
}
