import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switch';


export interface PagingState {
  currentPage(): number;
  itemsPerPage(): number;
  totalItems(): number;
  totalPages(): number;
  offset(): number;
}

export interface PagingActions  {
  navigateToPage(pageNumber: number): void;
  updateItemsPerPage(itemsPerPage: number): void;
  updateTotalItems(totalItems: number): void;
}

export interface Paging extends PagingState, PagingActions {}

export class PagingImpl implements Paging {
  _currentPage = 1;
  _itemsPerPage = 1;
  _totalItems = 0;
  _totalPages = 1;
  _offset = 0;

  constructor(itemsPerPage?: number) {
    this._itemsPerPage = itemsPerPage || 1;
  }

  currentPage(): number {
    return this._currentPage;
  }

  itemsPerPage(): number {
    return this._itemsPerPage;
  }

  totalItems(): number {
    return this._totalItems;
  }

  totalPages(): number {
    return this._totalPages;
  }

  offset(): number {
    return this._offset;
  }
  navigateToPage(pageNumber: number): void {
    this._currentPage = pageNumber;
  }

  updateTotalItems(totalItems: number): void {
    this._totalPages = Math.ceil(totalItems / this._itemsPerPage) || 1;
  }

  updateItemsPerPage(itemsPerPage: number): void {
    this._itemsPerPage = itemsPerPage;
    this._currentPage = this._offset / this._itemsPerPage + 1;
    this.updateTotalPages();
    this.updateOffset();
  }

  private updateOffset() {
    this._offset = (this._currentPage - 1) * this._itemsPerPage
  }

  private updateTotalPages() {
    this._totalPages = Math.ceil(this._totalItems / this._itemsPerPage) || 1;
  }
}

export interface Data<T> {
  totalCount: number;
  items: T[];
}

export interface DataHolder<T> {
  items(): T[];
}

export interface PagingService<T> {
  fetchData(pagingState: PagingState): Observable<Data<T>>;
}

export class PagingEngine<T> implements PagingState, DataHolder<T> {
  private _items: T[] = [];
  dataSubject = new Subject<Observable<Data<T>>>();

  private paging: Paging = new PagingImpl();
  constructor(itemsPerPage, private fetchData) {
    this.paging.updateItemsPerPage(itemsPerPage);
    this.dataSubject.switch().subscribe(data => {
        this._items = data.items;
        this.paging.updateTotalItems(data.totalCount)
    });
  }

  postViewUpdate() {
    this.dataSubject.next(this.fetchData(this.paging));
  }

  navigateToPage(pageNumber: number): void {
    this.paging.navigateToPage(pageNumber);
    this.postViewUpdate()
  }

  updateItemsPerPage(itemsPerPage: number): void {
    this.paging.updateItemsPerPage(itemsPerPage);
    this.postViewUpdate();
  }

  items(): T[] {
    return this._items;
  }

  currentPage(): number {
    return this.paging.currentPage();
  }

  itemsPerPage(): number {
    return this.paging.itemsPerPage();
  }

  totalItems(): number {
    return this.paging.totalItems();
  }

  totalPages(): number {
    return this.paging.totalPages();
  }

  offset(): number {
    return this.paging.offset();
  }
}
