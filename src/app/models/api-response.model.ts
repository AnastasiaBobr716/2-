export interface IApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
  timestamp: Date;
}

export interface IPaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export interface IApiError {
  code: string;
  message: string;
  details?: string;
}
