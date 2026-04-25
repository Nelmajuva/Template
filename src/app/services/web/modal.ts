import { Injectable } from '@angular/core';

import { Modal as ModalDirective } from '@eudoo-consultorias/directives';

@Injectable({
  providedIn: 'root',
})
export class Modal {
  private readonly registry = new Map<string, ModalDirective>();

  register(id: string, modal: ModalDirective): void {
    this.registry.set(id, modal);
  }

  unregister(id: string): void {
    this.registry.delete(id);
  }

  open(id: string): void {
    this.registry.get(id)?.open();
  }

  close(id: string): void {
    this.registry.get(id)?.close();
  }

  toggle(id: string): void {
    const modal = this.registry.get(id);
    if (!modal) return;

    modal.isOpen() ? modal.close() : modal.open();
  }

  get(id: string): ModalDirective | undefined {
    return this.registry.get(id);
  }
}
