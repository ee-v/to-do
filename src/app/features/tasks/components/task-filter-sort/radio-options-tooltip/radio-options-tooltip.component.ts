import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-radio-options-tooltip',
  templateUrl: './radio-options-tooltip.component.html'
})
export class RadioOptionsTooltipComponent implements OnInit {
  @Input() isShown!: boolean;
  @Input() options!: { name: string, value: string }[];
  @Input() name!: string;
  @Input() label?: string;
  @Input() selected?: string;
  @Output() optionSelected = new EventEmitter<string>();
  @Output() selectionCleared = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(option: string): void {
    this.optionSelected.emit(option);
  }

  clearSelection(): void {
    this.selectionCleared.emit();
  }

}
