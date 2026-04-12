import { Component } from '@angular/core';

import { LucideChevronDown } from '@lucide/angular';

import { AccordionItem, Accordion as AccordionDirective } from '@eudoo-consultorias/directives';

@Component({
  selector: 'app-accordion',
  imports: [LucideChevronDown, AccordionDirective, AccordionItem],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {}
