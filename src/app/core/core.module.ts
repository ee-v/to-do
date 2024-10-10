import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './components/alert/alert.component';
import { AnchorDirective } from './directives/anchor.directive';



@NgModule({
  declarations: [
    AlertComponent,
    AnchorDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AnchorDirective
  ]
})
export class CoreModule { }
