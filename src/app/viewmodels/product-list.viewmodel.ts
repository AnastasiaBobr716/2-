import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IProduct, IProductCreateRequest, IProductUpdateRequest } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { BaseViewModel } from './base.viewmodel';

@Injectable()
export class ProductListViewModel extends BaseViewModel implements OnDestroy {
  private _productsSubject = new BehaviorSubject<IProduct[]>([]);
  private _searchQuerySubject = new BehaviorSubject<string>('');
  private _destroy$ = new Subject<void>();

  readonly products$: Observable<IProduct[]> = this._productsSubject.asObservable();
  readonly searchQuery$: Observable<string> = this._searchQuerySubject.asObservable();

  constructor(private productService: ProductService) {
    super();
  }

  get products(): IProduct[] {
    return this._productsSubject.value;
  }

  get searchQuery(): string {
    return this._searchQuerySubject.value;
  }

  async loadProductsAsync(): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.productService.getProductsAsync().toPromise();
      if (response?.success) {
        this._productsSubject.next(response.data.items);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка загрузки продуктов');
    } finally {
      this.setLoading(false);
    }
  }

  async searchProductsAsync(query: string): Promise<void> {
    this._searchQuerySubject.next(query);
    if (!query.trim()) {
      await this.loadProductsAsync();
      return;
    }
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.productService.searchProductsAsync(query).toPromise();
      if (response?.success) {
        this._productsSubject.next(response.data);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка поиска продуктов');
    } finally {
      this.setLoading(false);
    }
  }

  async deleteProductAsync(id: number): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.productService.deleteProductAsync(id).toPromise();
      if (response?.success) {
        await this.loadProductsAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка удаления продукта');
    } finally {
      this.setLoading(false);
    }
  }

  async createProductAsync(request: IProductCreateRequest): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.productService.createProductAsync(request).toPromise();
      if (response?.success) {
        await this.loadProductsAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка создания продукта');
    } finally {
      this.setLoading(false);
    }
  }

  async updateProductAsync(request: IProductUpdateRequest): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.productService.updateProductAsync(request).toPromise();
      if (response?.success) {
        await this.loadProductsAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка обновления продукта');
    } finally {
      this.setLoading(false);
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
