import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="card profile-card">
        <div class="profile-header">
          <div class="avatar">АК</div>
          <div class="profile-info">
            <h1 class="profile-name">Алексей Крылов</h1>
            <span class="badge badge-active">Активный профиль</span>
          </div>
        </div>
      </div>

      <div class="card personal-data-card">
        <h2 class="card-title">Личные данные</h2>
        <div class="data-list">
          <div class="data-item">
            <span class="data-label">Имя</span>
            <span class="data-value">Алексей Крылов</span>
          </div>
          <div class="data-item">
            <span class="data-label">Email</span>
            <span class="data-value">alexey.krylov&#64;example.com</span>
          </div>
        </div>
      </div>

      <div class="card progress-card">
        <h2 class="card-title">Общий прогресс</h2>
        <div class="progress-section">
          <div class="progress-header">
            <span class="progress-value">82/100</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: 82%"></div>
          </div>
          <p class="progress-caption">Отличный темп</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 32px;
      max-width: 800px;
    }

    .card {
      background: #ffffff;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
      margin-bottom: 24px;
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: #1e293b;
      margin: 0 0 16px 0;
    }

    .profile-header {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #3B82F6;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      font-weight: 700;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .profile-name {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      margin: 0;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      width: fit-content;
    }

    .badge-active {
      background: #dcfce7;
      color: #166534;
    }

    .data-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .data-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f1f5f9;
    }

    .data-item:last-child {
      border-bottom: none;
    }

    .data-label {
      font-size: 14px;
      color: #64748b;
    }

    .data-value {
      font-size: 14px;
      font-weight: 500;
      color: #1e293b;
    }

    .progress-section {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .progress-header {
      display: flex;
      justify-content: flex-end;
    }

    .progress-value {
      font-size: 24px;
      font-weight: 700;
      color: #3B82F6;
    }

    .progress-bar {
      height: 12px;
      background: #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
    }

    .progress-fill {
      height: 100%;
      background: #3B82F6;
      border-radius: 6px;
      transition: width 0.3s ease;
    }

    .progress-caption {
      font-size: 14px;
      color: #64748b;
      margin: 0;
      text-align: center;
    }

    @media (max-width: 768px) {
      .profile-container {
        padding: 16px;
      }
    }
  `]
})
export class ProfileViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
