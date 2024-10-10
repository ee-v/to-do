import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private _renderer: Renderer2;

  constructor(private _rendererFactory: RendererFactory2) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
  }

  hideScroll(): void {
    const scrollBarWidth = this.getScrollBarWidth();
    this._renderer.setStyle(document.body, 'overflow', 'hidden');
    if (scrollBarWidth > 0) {
      this._renderer.setStyle(document.body, 'padding-right', `${scrollBarWidth}px`);
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollBarWidth}px`);
    }
  }

  restoreScroll(): void {
    this._renderer.removeStyle(document.body, 'overflow');
    this._renderer.removeStyle(document.body, 'padding-right');
    document.documentElement.style.removeProperty('--scrollbar-width');
  }

  private getScrollBarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }
}
