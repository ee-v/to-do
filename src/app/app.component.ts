import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from './core/animations/animations';
import { AnimationService } from './core/services/animation.service';
import { AlertService } from './core/services/alert.service';
import { AnchorDirective } from './core/directives/anchor.directive';
import { BreakpointService } from './core/services/breakpoint.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(AnchorDirective) anchor!: AnchorDirective;

  title = 'ToDo';
  isDesktop = false;

  constructor(
    private _animationService: AnimationService,
    private _alertService: AlertService,
    private _breakPointService: BreakpointService
  ) { }
  ngOnInit(): void {
    this._breakPointService.isDesktop$.subscribe((isDesktop) => {
      this.isDesktop = isDesktop;
    });
  }

  ngAfterViewInit(): void {
    this._alertService.setViewContainerRef(this.anchor.viewContainerRef);
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }

  onStart(): void {
    this._animationService.hideScroll();
  }

  onDone(): void {
    this._animationService.restoreScroll();
  }
}
