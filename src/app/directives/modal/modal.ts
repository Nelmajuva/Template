import { isPlatformBrowser } from '@angular/common';
import { Directive, Input, signal, ElementRef, inject, PLATFORM_ID, HostListener, OnInit, OnDestroy, Renderer2 } from '@angular/core';

import { Modal as ModalService } from '@eudoo-consultorias/services/web';

@Directive({
  selector: '[appModal]',
  exportAs: 'appModal',
})
export class Modal implements OnInit, OnDestroy {
  @Input({ required: true })
  appModal!: string;

  @Input()
  dismissOnBackdrop = true;

  @Input()
  dismissOnEscape = true;

  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private readonly elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly modalService = inject(ModalService);

  readonly isOpen = signal(false);

  private backdrop: HTMLElement | null = null;
  private closing = false;
  private escListener?: () => void;

  ngOnInit(): void {
    this.modalService.register(this.appModal, this);
  }

  ngOnDestroy(): void {
    this.modalService.unregister(this.appModal);
    this.removeBackdrop();
    this.escListener?.();

    if (this.isBrowser) {
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
    }
  }

  open(): void {
    if (!this.isBrowser || this.closing || this.isOpen()) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const el = this.elementRef.nativeElement;
    el.style.display = 'flex';
    document.body.classList.add('modal-open');

    this.createBackdrop();
    this.bindEscKey();

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('modal-show');
        this.isOpen.set(true);
      });
    });
  }

  close(): void {
    if (!this.isBrowser || this.closing || !this.isOpen()) return;
    this.closing = true;

    const el = this.elementRef.nativeElement;
    el.classList.remove('modal-show');
    el.classList.add('modal-hiding');
    this.backdrop?.classList.remove('backdrop-show');
    this.escListener?.();
    this.escListener = undefined;

    setTimeout(() => {
      el.style.display = 'none';
      el.classList.remove('modal-hiding');
      document.body.classList.remove('modal-open');
      document.body.style.removeProperty('padding-right');
      this.removeBackdrop();
      this.isOpen.set(false);
      this.closing = false;
    }, 300);
  }

  @HostListener('click', ['$event'])
  onOverlayClick(event: MouseEvent): void {
    if (this.dismissOnBackdrop && event.target === this.elementRef.nativeElement) {
      this.close();
    }
  }

  private createBackdrop(): void {
    const backdrop = this.renderer.createElement('div') as HTMLElement;
    this.renderer.addClass(backdrop, 'modal-backdrop');
    document.body.appendChild(backdrop);
    this.backdrop = backdrop;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        backdrop.classList.add('backdrop-show');
      });
    });
  }

  private removeBackdrop(): void {
    if (this.backdrop?.parentNode) {
      this.backdrop.parentNode.removeChild(this.backdrop);
      this.backdrop = null;
    }
  }

  private bindEscKey(): void {
    if (!this.dismissOnEscape) return;
    this.escListener = this.renderer.listen('document', 'keydown.escape', () => {
      this.close();
    });
  }
}
