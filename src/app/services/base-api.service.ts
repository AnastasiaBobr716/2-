import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { IApiResponse, IApiError } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {
  protected mockDelay = 500;

  protected createSuccessResponse<T>(data: T, message = 'Success'): IApiResponse<T> {
    return {
      data,
      success: true,
      message,
      timestamp: new Date()
    };
  }

  protected createErrorResponse(code: string, message: string, details?: string): IApiError {
    return { code, message, details };
  }

  protected simulateNetworkDelay<T>(result: T): Observable<T> {
    return of(result).pipe(delay(this.mockDelay));
  }

  protected simulateError<T>(error: IApiError): Observable<T> {
    return throwError(() => error).pipe(delay(this.mockDelay));
  }
}
