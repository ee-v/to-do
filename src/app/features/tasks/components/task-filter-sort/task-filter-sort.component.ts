import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { FilterSort } from '../../models/filter-sort.interface';
import { AnimationService } from 'src/app/core/services/animation.service';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-task-filter-sort',
  templateUrl: './task-filter-sort.component.html',
  styleUrls: ['./task-filter-sort.component.css']
})
export class TaskFilterSortComponent implements OnInit {
  @Input() isDesktop = false;
  @Output() taskFilteredBy = new EventEmitter<string>();
  @Output() taskSortedBy = new EventEmitter<string>();

  sortBy = '';
  filterBy = '';

  isSortCardShown = false;
  isFilterCardShown = false;
  isOverlayShown = false;

  filterOptions: { name: string, value: string }[];
  sortOptions: { name: string, value: string }[];

  constructor(
    private _localStorageService: LocalStorageService,
    private _animationService: AnimationService
  ) {
    this.filterOptions = [
      { name: 'Realizadas', value: 'done' },
      { name: 'Por hacer', value: 'toDo' }
    ];
    this.sortOptions = [
      { name: 'Recientemente agregadas', value: 'latestCreatedFirst' },
      { name: 'Más antiguas primero', value: 'oldestCreatedFirst' },
    ]
  }

  ngOnInit(): void {
    this.configFilterSort();
  }

  private configFilterSort(): void {
    const data = this._localStorageService.getItem<FilterSort>('filterSort');
    if (data) {
      this.filterBy = data.filterBy;
      this.sortBy = data.sortBy;
      this.onFilterSelected(this.filterBy);
      this.onSortSelected(this.sortBy);
    } else {
      this.saveConfig();
    }
  }

  private saveConfig(): void {
    const config: FilterSort = {
      filterBy: this.filterBy,
      sortBy: this.sortBy
    };
    this._localStorageService.setItem<FilterSort>('filterSort', config);
  }

  showFilterCard(): void {
    if (this.isFilterCardShown) {
      this.isFilterCardShown = false;
      this._animationService.restoreScroll();
      this.isOverlayShown = false;
      return;
    }
    this.isFilterCardShown = true;
    this.isSortCardShown = false;
    this.isOverlayShown = true;
    this._animationService.hideScroll();
  }

  showSortCard(): void {
    if (this.isSortCardShown) {
      this.isSortCardShown = false;
      this._animationService.restoreScroll();
      this.isOverlayShown = false;
      return;
    }
    this.isSortCardShown = true;
    this.isFilterCardShown = false;
    this._animationService.hideScroll();
    this.isOverlayShown = true;
  }

  closeTooltips(): void {
    this.isFilterCardShown = false;
    this.isSortCardShown = false;
    this._animationService.restoreScroll();
    this.isOverlayShown = false;
  }

  onFilterSelected(option: string): void {
    this.filterBy = option;
    this.saveConfig();
    this.isFilterCardShown = false;
    this.taskFilteredBy.emit(this.filterBy);
    this._animationService.restoreScroll();
    this.isOverlayShown = false;
  }

  onFilterCleared(): void {
    this.filterBy = '';
    this.saveConfig();
    this.isFilterCardShown = false;
    this.taskFilteredBy.emit('');
    this.taskSortedBy.emit(this.sortBy);
    this._animationService.restoreScroll();
    this.isOverlayShown = false;
  }

  onSortSelected(option: string): void {
    this.sortBy = option;
    this.saveConfig();
    this.isSortCardShown = false;
    this.taskSortedBy.emit(this.sortBy);
    this._animationService.restoreScroll();
    this.isOverlayShown = false;
  }

  onSortCleared(): void {
    this.sortBy = '';
    this.saveConfig();
    this.isSortCardShown = false;
    this.taskSortedBy.emit('');
    this._animationService.restoreScroll();
    this.isOverlayShown = false;
  }
}
