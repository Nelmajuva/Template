import { Component, OnInit } from '@angular/core';

import { LucideChevronDown } from '@lucide/angular';

import { AccordionItem, Accordion as AccordionDirective } from '@eudoo-consultorias/directives';
import { RoutingUtil } from '@eudoo-consultorias/utilities';

@Component({
  selector: 'app-accordion',
  imports: [LucideChevronDown, AccordionDirective, AccordionItem],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion implements OnInit {
  ngOnInit(): void {
    RoutingUtil.scrollToTop();
  }
}
