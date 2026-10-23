import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExerciseListViewModel } from '../../viewmodels/exercise-list.viewmodel';
import { ExerciseService } from '../../services/exercise.service';
import { IExerciseCreateRequest } from '../../models/exercise.model';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [ExerciseListViewModel],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1 class="dashboard-title">Сегодня</h1>
        <p class="dashboard-subtitle">Добро пожаловать, Алексей!</p>
      </header>

      <div class="dashboard-grid">
        <div class="dashboard-main">
          <div class="card workout-card">
            <div class="card-header">
              <h2 class="card-title">Тренировка завершена</h2>
              <span class="badge badge-success">100%</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 100%"></div>
            </div>
            <p class="progress-text">4 / 4 упражнений выполнено</p>
          </div>

          <div class="card activity-card">
            <div class="card-header">
              <h2 class="card-title">Активность за неделю</h2>
              <span class="badge badge-streak">7 дней подряд</span>
            </div>
            <div class="week-scale">
              <div class="day-item" *ngFor="let day of weekDays">
                <div class="day-circle" [class.active]="day.active">
                  <span class="day-letter">{{ day.label }}</span>
                </div>
                <span class="day-name">{{ day.name }}</span>
              </div>
            </div>
          </div>

          <div class="card exercises-card">
            <div class="card-header">
              <h2 class="card-title">Упражнения</h2>
              <button class="btn-add" (click)="viewModel.openAddForm()" title="Добавить упражнение">
                <span class="plus-icon">+</span>
              </button>
            </div>

            <div class="add-form" *ngIf="viewModel.showAddForm">
              <div class="form-group">
                <label class="form-label">Название</label>
                <input type="text" class="form-input" [(ngModel)]="newExercise.name" placeholder="Например: Отжимания">
              </div>
              <div class="form-group">
                <label class="form-label">Описание</label>
                <input type="text" class="form-input" [(ngModel)]="newExercise.description" placeholder="Краткое описание">
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Подходы</label>
                  <input type="number" class="form-input" [(ngModel)]="newExercise.sets" min="1" placeholder="3">
                </div>
                <div class="form-group">
                  <label class="form-label">Повторения</label>
                  <input type="number" class="form-input" [(ngModel)]="newExercise.reps" min="1" placeholder="12">
                </div>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" (click)="addExercise()">Добавить</button>
                <button class="btn btn-secondary" (click)="viewModel.hideAddForm()">Отмена</button>
              </div>
            </div>

            <div class="exercises-list" *ngIf="!viewModel.showAddForm">
              <div class="exercise-item" *ngFor="let exercise of viewModel.exercises" [class.completed]="exercise.isCompleted">
                <button class="btn-check" (click)="toggleComplete(exercise.id)" [class.checked]="exercise.isCompleted">
                  <span class="check-icon" *ngIf="exercise.isCompleted">✓</span>
                </button>
                <div class="exercise-info">
                  <span class="exercise-name">{{ exercise.name }}</span>
                  <span class="exercise-desc">{{ exercise.description }}</span>
                </div>
                <div class="exercise-meta">
                  <span class="exercise-sets">{{ exercise.sets }}x{{ exercise.reps }}</span>
                  <span class="exercise-weight" *ngIf="exercise.weight">{{ exercise.weight }} кг</span>
                </div>
              </div>
              <div class="exercises-empty" *ngIf="viewModel.exercises.length === 0">
                Нет упражнений. Нажмите + чтобы добавить.
              </div>
            </div>
          </div>
        </div>

        <aside class="dashboard-sidebar">
          <div class="card metric-card">
            <div class="metric-value">24</div>
            <div class="metric-label">мин</div>
          </div>
          <div class="card metric-card">
            <div class="metric-value">28</div>
            <div class="metric-label">ккал</div>
          </div>
          <div class="card metric-card">
            <div class="metric-value">4</div>
            <div class="metric-label">тренировки</div>
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-header {
      margin-bottom: 24px;
    }

    .dashboard-title {
      font-size: 28px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .dashboard-subtitle {
      font-size: 16px;
      color: #64748b;
      margin: 0;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 24px;
    }

    .dashboard-main {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .dashboard-sidebar {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .card {
      background: #ffffff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge-success {
      background: #dcfce7;
      color: #166534;
    }

    .badge-streak {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .progress-bar {
      height: 8px;
      background: #e2e8f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: #3B82F6;
      border-radius: 4px;
      transition: width 0.3s ease;
    }

    .progress-text {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    .week-scale {
      display: flex;
      justify-content: space-between;
      gap: 8px;
    }

    .day-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .day-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e2e8f0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .day-circle.active {
      background: #3B82F6;
    }

    .day-letter {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
    }

    .day-circle.active .day-letter {
      color: #ffffff;
    }

    .day-name {
      font-size: 12px;
      color: #64748b;
    }

    .metric-card {
      text-align: center;
      padding: 20px;
    }

    .metric-value {
      font-size: 32px;
      font-weight: 700;
      color: #3B82F6;
      line-height: 1;
      margin-bottom: 4px;
    }

    .metric-label {
      font-size: 14px;
      color: #64748b;
    }

    .btn-add {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #3B82F6;
      color: #ffffff;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
      line-height: 1;
    }

    .btn-add:hover {
      background: #2563eb;
      transform: scale(1.05);
    }

    .plus-icon {
      margin-top: -2px;
    }

    .add-form {
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .form-group {
      margin-bottom: 12px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    .form-label {
      display: block;
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      margin-bottom: 4px;
    }

    .form-input {
      width: 100%;
      padding: 10px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-size: 14px;
      color: #1e293b;
      background: #ffffff;
      transition: border-color 0.2s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: #3B82F6;
    }

    .form-actions {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }

    .btn {
      padding: 10px 20px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.2s ease;
    }

    .btn-primary {
      background: #3B82F6;
      color: #ffffff;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #e2e8f0;
      color: #64748b;
    }

    .btn-secondary:hover {
      background: #cbd5e1;
    }

    .exercises-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .exercise-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: #f8fafc;
      border-radius: 12px;
      transition: all 0.2s ease;
    }

    .exercise-item:hover {
      background: #f1f5f9;
    }

    .exercise-item.completed {
      background: #f0fdf4;
    }

    .btn-check {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 2px solid #cbd5e1;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.2s ease;
    }

    .btn-check:hover {
      border-color: #3B82F6;
    }

    .btn-check.checked {
      background: #22c55e;
      border-color: #22c55e;
    }

    .check-icon {
      color: #ffffff;
      font-size: 14px;
      font-weight: 700;
    }

    .exercise-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .exercise-name {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }

    .exercise-item.completed .exercise-name {
      color: #166534;
      text-decoration: line-through;
    }

    .exercise-desc {
      font-size: 12px;
      color: #64748b;
    }

    .exercise-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }

    .exercise-sets {
      font-size: 14px;
      font-weight: 600;
      color: #3B82F6;
    }

    .exercise-weight {
      font-size: 12px;
      color: #64748b;
    }

    .exercises-empty {
      text-align: center;
      padding: 32px;
      color: #94a3b8;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .dashboard-sidebar {
        flex-direction: row;
        flex-wrap: wrap;
      }

      .metric-card {
        flex: 1;
        min-width: 100px;
      }
    }
  `]
})
export class DashboardViewComponent implements OnInit {
  weekDays = [
    { label: 'П', name: 'Пн', active: true },
    { label: 'В', name: 'Вт', active: true },
    { label: 'С', name: 'Ср', active: true },
    { label: 'Ч', name: 'Чт', active: true },
    { label: 'П', name: 'Пт', active: true },
    { label: 'С', name: 'Сб', active: true },
    { label: 'В', name: 'Вс', active: true }
  ];

  newExercise: IExerciseCreateRequest = {
    name: '',
    description: '',
    sets: 3,
    reps: 12
  };

  constructor(
    public viewModel: ExerciseListViewModel,
    private exerciseService: ExerciseService
  ) {}

  ngOnInit(): void {
    this.viewModel.loadExercisesAsync();
  }

  async addExercise(): Promise<void> {
    if (!this.newExercise.name.trim()) return;
    await this.viewModel.addExerciseAsync(this.newExercise);
    this.newExercise = { name: '', description: '', sets: 3, reps: 12 };
  }

  async toggleComplete(id: number): Promise<void> {
    await this.viewModel.toggleCompleteAsync(id);
  }
}
