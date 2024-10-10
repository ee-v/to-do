import { ComponentFactory, ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private _factoryResolver: ComponentFactory<AlertComponent>;
  private _viewContainerRef: ViewContainerRef | null;

  constructor(
    private _componentFactory: ComponentFactoryResolver
  ) {
    this._factoryResolver = this._componentFactory.resolveComponentFactory(AlertComponent);
    this._viewContainerRef = null;
  }

  setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }

  info(message: string): void {
    this.createAlert('info', message);
  }

  success(message: string): void {
    this.createAlert('success', message);
  }

  warning(message: string): void {
    this.createAlert('warning', message);
  }

  error(message: string): void {
    this.createAlert('error', message);
  }

  private createAlert(type: string, message: string): void {
    if (this._viewContainerRef) {
      this._viewContainerRef.clear();
      const alertRef = this._viewContainerRef.createComponent(this._factoryResolver);
      alertRef.instance.type = type;
      alertRef.instance.message = message;
      alertRef.instance.onClose.subscribe(() => {
        alertRef.destroy();
      });
      setTimeout(() => {
        alertRef.instance.close();
      }, 5000);
    }
  }
}
