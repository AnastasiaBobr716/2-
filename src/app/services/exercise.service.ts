import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExercise, IExerciseCreateRequest, IExerciseUpdateRequest } from '../models/exercise.model';
import { IApiResponse, IPaginatedResponse } from '../models/api-response.model';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends BaseApiService {
  private mockExercises: IExercise[] = [
    {
      id: 1,
      name: 'Отжимания',
      description: 'Классические отжимания от пола',
      sets: 3,
      reps: 15,
      isCompleted: true,
      completedAt: new Date('2026-10-08T10:30:00')
    },
    {
      id: 2,
      name: 'Приседания',
      description: 'Приседания со штангой',
      sets: 4,
      reps: 12,
      weight: 60,
      isCompleted: true,
      completedAt: new Date('2026-10-08T10:45:00')
    },
    {
      id: 3,
      name: 'Планка',
      description: 'Статическое упражнение на кор',
      sets: 3,
      reps: 1,
      duration: 60,
      isCompleted: true,
      completedAt: new Date('2026-10-08T11:00:00')
    },
    {
      id: 4,
      name: 'Подтягивания',
      description: 'Подтягивания на турнике',
      sets: 3,
      reps: 10,
      isCompleted: false
    }
  ];

  private nextId = 5;

  getExercisesAsync(): Observable<IApiResponse<IPaginatedResponse<IExercise>>> {
    const response: IPaginatedResponse<IExercise> = {
      items: [...this.mockExercises],
      totalCount: this.mockExercises.length,
      page: 1,
      pageSize: 50
    };
    return this.simulateNetworkDelay(this.createSuccessResponse(response, 'Упражнения загружены'));
  }

  getExerciseByIdAsync(id: number): Observable<IApiResponse<IExercise>> {
    const exercise = this.mockExercises.find(e => e.id === id);
    if (!exercise) {
      return this.simulateError<IApiResponse<IExercise>>(
        this.createErrorResponse('NOT_FOUND', `Упражнение с ID ${id} не найдено`)
      );
    }
    return this.simulateNetworkDelay(this.createSuccessResponse(exercise, 'Упражнение найдено'));
  }

  createExerciseAsync(request: IExerciseCreateRequest): Observable<IApiResponse<IExercise>> {
    const newExercise: IExercise = {
      id: this.nextId++,
      ...request,
      isCompleted: false
    };
    this.mockExercises.push(newExercise);
    return this.simulateNetworkDelay(this.createSuccessResponse(newExercise, 'Упражнение создано'));
  }

  updateExerciseAsync(request: IExerciseUpdateRequest): Observable<IApiResponse<IExercise>> {
    const index = this.mockExercises.findIndex(e => e.id === request.id);
    if (index === -1) {
      return this.simulateError<IApiResponse<IExercise>>(
        this.createErrorResponse('NOT_FOUND', `Упражнение с ID ${request.id} не найдено`)
      );
    }
    this.mockExercises[index] = { ...this.mockExercises[index], ...request };
    return this.simulateNetworkDelay(this.createSuccessResponse(this.mockExercises[index], 'Упражнение обновлено'));
  }

  deleteExerciseAsync(id: number): Observable<IApiResponse<boolean>> {
    const index = this.mockExercises.findIndex(e => e.id === id);
    if (index === -1) {
      return this.simulateError<IApiResponse<boolean>>(
        this.createErrorResponse('NOT_FOUND', `Упражнение с ID ${id} не найдено`)
      );
    }
    this.mockExercises.splice(index, 1);
    return this.simulateNetworkDelay(this.createSuccessResponse(true, 'Упражнение удалено'));
  }

  toggleExerciseCompleteAsync(id: number): Observable<IApiResponse<IExercise>> {
    const index = this.mockExercises.findIndex(e => e.id === id);
    if (index === -1) {
      return this.simulateError<IApiResponse<IExercise>>(
        this.createErrorResponse('NOT_FOUND', `Упражнение с ID ${id} не найдено`)
      );
    }
    const exercise = this.mockExercises[index];
    exercise.isCompleted = !exercise.isCompleted;
    exercise.completedAt = exercise.isCompleted ? new Date() : undefined;
    return this.simulateNetworkDelay(this.createSuccessResponse(exercise, 'Статус обновлён'));
  }
}
