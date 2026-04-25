import { Component, inject, OnInit } from '@angular/core';

import { LucideX } from '@lucide/angular';

import { Modal as ModalService } from '@eudoo-consultorias/services/web';
import { Modal, ModalTrigger } from '@eudoo-consultorias/directives';
import { RoutingUtil } from '@eudoo-consultorias/utilities';

@Component({
  selector: 'app-modals',
  imports: [Modal, ModalTrigger, LucideX],
  templateUrl: './modals.html',
  styleUrl: './modals.scss',
})
export class Modals implements OnInit {
  private readonly modalService = inject(ModalService);

  ngOnInit(): void {
    RoutingUtil.scrollToTop();
  }

  openConfirm(): void {
    this.modalService.open('confirmModal');
  }

  closeConfirm(): void {
    this.modalService.close('confirmModal');
  }
}
