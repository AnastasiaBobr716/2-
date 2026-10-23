import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IExercise, IExerciseCreateRequest, IExerciseUpdateRequest } from '../models/exercise.model';
import { ExerciseService } from '../services/exercise.service';
import { BaseViewModel } from './base.viewmodel';

@Injectable()
export class ExerciseListViewModel extends BaseViewModel implements OnDestroy {
  private _exercisesSubject = new BehaviorSubject<IExercise[]>([]);
  private _showAddFormSubject = new BehaviorSubject<boolean>(false);
  private _destroy$ = new Subject<void>();

  readonly exercises$: Observable<IExercise[]> = this._exercisesSubject.asObservable();
  readonly showAddForm$: Observable<boolean> = this._showAddFormSubject.asObservable();

  constructor(private exerciseService: ExerciseService) {
    super();
  }

  get exercises(): IExercise[] {
    return this._exercisesSubject.value;
  }

  get showAddForm(): boolean {
    return this._showAddFormSubject.value;
  }

  get completedCount(): number {
    return this.exercises.filter(e => e.isCompleted).length;
  }

  get totalCount(): number {
    return this.exercises.length;
  }

  get progressPercent(): number {
    if (this.totalCount === 0) return 0;
    return Math.round((this.completedCount / this.totalCount) * 100);
  }

  async loadExercisesAsync(): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.exerciseService.getExercisesAsync().toPromise();
      if (response?.success) {
        this._exercisesSubject.next(response.data.items);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка загрузки упражнений');
    } finally {
      this.setLoading(false);
    }
  }

  async addExerciseAsync(request: IExerciseCreateRequest): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.exerciseService.createExerciseAsync(request).toPromise();
      if (response?.success) {
        await this.loadExercisesAsync();
        this.hideAddForm();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка создания упражнения');
    } finally {
      this.setLoading(false);
    }
  }

  async toggleCompleteAsync(id: number): Promise<void> {
    this.clearError();
    try {
      const response = await this.exerciseService.toggleExerciseCompleteAsync(id).toPromise();
      if (response?.success) {
        const exercises = this.exercises.map(e =>
          e.id === id ? response.data : e
        );
        this._exercisesSubject.next(exercises);
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка обновления статуса');
    }
  }

  async deleteExerciseAsync(id: number): Promise<void> {
    this.setLoading(true);
    this.clearError();
    try {
      const response = await this.exerciseService.deleteExerciseAsync(id).toPromise();
      if (response?.success) {
        await this.loadExercisesAsync();
      }
    } catch (error: any) {
      this.setError(error.message || 'Ошибка удаления упражнения');
    } finally {
      this.setLoading(false);
    }
  }

  openAddForm(): void {
    this._showAddFormSubject.next(true);
  }

  hideAddForm(): void {
    this._showAddFormSubject.next(false);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
