import { Directive, Input, HostListener, inject } from '@angular/core';

import { Modal as ModalService } from '@eudoo-consultorias/services/web';

@Directive({
  selector: '[appModalTrigger]',
})
export class ModalTrigger {
  @Input({ required: true })
  appModalTrigger!: string;

  @Input()
  modalAction: 'open' | 'close' | 'toggle' = 'open';

  private readonly modalService = inject(ModalService);

  @HostListener('click')
  onClick(): void {
    switch (this.modalAction) {
      case 'close':
        this.modalService.close(this.appModalTrigger);
        break;
      case 'toggle':
        this.modalService.toggle(this.appModalTrigger);
        break;
      default:
        this.modalService.open(this.appModalTrigger);
    }
  }
}
