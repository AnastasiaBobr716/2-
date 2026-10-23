import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IUser } from '../models/user.model';
import { IProduct } from '../models/product.model';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';
import { BaseViewModel } from './base.viewmodel';

export interface IDashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalProducts: number;
  productsInStock: number;
}

@Injectable()
export class DashboardViewModel extends BaseViewModel implements OnDestroy {
  private _statsSubject = new BehaviorSubject<IDashboardStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalProducts: 0,
    productsInStock: 0
  });
  private _recentUsersSubject = new BehaviorSubject<IUser[]>([]);
  private _recentProductsSubject = new BehaviorSubject<IProduct[]>([]);
  private _destroy$ = new Subject<void>();

  readonly stats$: Observable<IDashboardStats> = this._statsSubject.asObservable();
  readonly recentUsers$: Observable<IUser[]> = this._recentUsersSubject.asObservable();
  readonly recentProducts$: Observable<IProduct[]> = this._recentProductsSubject.asObservable();

  constructor(
    private userService: UserService,
    private productService: ProductService
  ) {
    super();
  }

  get stats(): IDashboardStats {
    return this._statsSubject.value;
  }

  get recentUsers(): IUser[] {
    return this._recentUsersSubject.value;
  }

  get recentProducts(): IProduct[] {
    return this._recentProductsSubject.value;
  }

  async loadDashboardDataAsync(): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const [usersResponse, productsResponse] = await Promise.all([
        this.userService.getUsersAsync().toPromise(),
        this.productService.getProductsAsync().toPromise()
      ]);

      if (usersResponse?.success && productsResponse?.success) {
        const users = usersResponse.data.items;
        const products = productsResponse.data.items;

        const stats: IDashboardStats = {
          totalUsers: users.length,
          activeUsers: users.filter(u => u.isActive).length,
          totalProducts: products.length,
          productsInStock: products.filter(p => p.inStock).length
        };

        this._statsSubject.next(stats);
        this._recentUsersSubject.next(users.slice(0, 5));
        this._recentProductsSubject.next(products.slice(0, 5));
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка загрузки данных дашборда');
    } finally {
      this.setLoading(false);
    }
  }

  async refreshDataAsync(): Promise<void> {
    await this.loadDashboardDataAsync();
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
