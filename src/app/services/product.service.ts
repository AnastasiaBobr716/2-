import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct, IProductCreateRequest, IProductUpdateRequest } from '../models/product.model';
import { IApiResponse, IPaginatedResponse } from '../models/api-response.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseApiService {
  private mockProducts: IProduct[] = [
    {
      id: 1,
      name: 'Ноутбук',
      description: 'Мощный ноутбук для работы и игр',
      price: 89990,
      category: 'Electronics' as any,
      inStock: true,
      createdAt: new Date('2024-01-10')
    },
    {
      id: 2,
      name: 'Футболка',
      description: 'Удобная хлопковая футболка',
      price: 1990,
      category: 'Clothing' as any,
      inStock: true,
      createdAt: new Date('2024-02-15')
    },
    {
      id: 3,
      name: 'Книга "Angular"',
      description: 'Полное руководство по Angular',
      price: 3500,
      category: 'Books' as any,
      inStock: false,
      createdAt: new Date('2024-03-20')
    },
    {
      id: 4,
      name: 'Кофемашина',
      description: 'Автоматическая кофемашина',
      price: 45990,
      category: 'Electronics' as any,
      inStock: true,
      createdAt: new Date('2024-04-05')
    },
    {
      id: 5,
      name: 'Шоколад',
      description: 'Молочный шоколад 70% какао',
      price: 450,
      category: 'Food' as any,
      inStock: true,
      createdAt: new Date('2024-05-01')
    }
  ];

  private nextId = 6;

  getProductsAsync(): Observable<IApiResponse<IPaginatedResponse<IProduct>>> {
    const response: IPaginatedResponse<IProduct> = {
      items: [...this.mockProducts],
      totalCount: this.mockProducts.length,
      page: 1,
      pageSize: 10
    };
    return this.simulateNetworkDelay(this.createSuccessResponse(response, 'Продукты загружены'));
  }

  getProductByIdAsync(id: number): Observable<IApiResponse<IProduct>> {
    const product = this.mockProducts.find(p => p.id === id);
    if (!product) {
      return this.simulateError<IApiResponse<IProduct>>(
        this.createErrorResponse('NOT_FOUND', `Продукт с ID ${id} не найден`)
      );
    }
    return this.simulateNetworkDelay(this.createSuccessResponse(product, 'Продукт найден'));
  }

  createProductAsync(request: IProductCreateRequest): Observable<IApiResponse<IProduct>> {
    const newProduct: IProduct = {
      id: this.nextId++,
      ...request,
      inStock: true,
      createdAt: new Date()
    };
    this.mockProducts.push(newProduct);
    return this.simulateNetworkDelay(this.createSuccessResponse(newProduct, 'Продукт создан'));
  }

  updateProductAsync(request: IProductUpdateRequest): Observable<IApiResponse<IProduct>> {
    const index = this.mockProducts.findIndex(p => p.id === request.id);
    if (index === -1) {
      return this.simulateError<IApiResponse<IProduct>>(
        this.createErrorResponse('NOT_FOUND', `Продукт с ID ${request.id} не найден`)
      );
    }
    this.mockProducts[index] = { ...this.mockProducts[index], ...request };
    return this.simulateNetworkDelay(this.createSuccessResponse(this.mockProducts[index], 'Продукт обновлён'));
  }

  deleteProductAsync(id: number): Observable<IApiResponse<boolean>> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index === -1) {
      return this.simulateError<IApiResponse<boolean>>(
        this.createErrorResponse('NOT_FOUND', `Продукт с ID ${id} не найден`)
      );
    }
    this.mockProducts.splice(index, 1);
    return this.simulateNetworkDelay(this.createSuccessResponse(true, 'Продукт удалён'));
  }

  searchProductsAsync(query: string): Observable<IApiResponse<IProduct[]>> {
    const filtered = this.mockProducts.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return this.simulateNetworkDelay(this.createSuccessResponse(filtered, `Найдено ${filtered.length} продуктов`));
  }
}
