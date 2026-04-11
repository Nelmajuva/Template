import { Component } from '@angular/core';

import { Accordion as AccordionDirective } from '../../../directives/accordion/accordion';
import { AccordionItem } from '../../../directives/accordion/accordion-item';

@Component({
  selector: 'app-accordion',
  imports: [AccordionDirective, AccordionItem],
  templateUrl: './accordion.html',
  styleUrl: './accordion.scss',
})
export class Accordion {}
