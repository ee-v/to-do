import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private mediaQuery: MediaQueryList = window.matchMedia('(min-width: 1024px)');

  get isDesktop$(): Observable<boolean> {
    return fromEvent<MediaQueryListEvent>(this.mediaQuery, 'change').pipe(
      startWith(this.mediaQuery),
      map(event => event.matches)
    );
  }
}
