import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  template: `
    <div class="app-container">
      <aside class="sidebar">
        <div class="sidebar-brand">
          <span class="brand-logo">💪</span>
          <span class="brand-name">repit</span>
        </div>

        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">📅</span>
            <span class="nav-label">Сегодня</span>
          </a>
          <a routerLink="/profile" routerLinkActive="active" class="nav-item">
            <span class="nav-icon">👤</span>
            <span class="nav-label">Профиль</span>
          </a>
        </nav>

        <div class="sidebar-footer">
          <a routerLink="/profile" class="profile-link">
            <div class="profile-avatar">АК</div>
            <div class="profile-info">
              <span class="profile-name">Алексей Крылов</span>
              <span class="profile-caption">Ваш профиль</span>
            </div>
          </a>
        </div>
      </aside>

      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      min-height: 100vh;
      background: #f8fafc;
    }

    .sidebar {
      width: 240px;
      background: #ffffff;
      border-right: 1px solid #e2e8f0;
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
      position: sticky;
      top: 0;
      height: 100vh;
    }

    .sidebar-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 8px;
      margin-bottom: 32px;
    }

    .brand-logo {
      font-size: 24px;
    }

    .brand-name {
      font-size: 20px;
      font-weight: 700;
      color: #3B82F6;
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 8px;
      flex: 1;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 12px;
      text-decoration: none;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .nav-item:hover {
      background: #f1f5f9;
      color: #1e293b;
    }

    .nav-item.active {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .nav-icon {
      font-size: 18px;
    }

    .sidebar-footer {
      margin-top: auto;
      padding-top: 16px;
      border-top: 1px solid #e2e8f0;
    }

    .profile-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-radius: 12px;
      text-decoration: none;
      transition: background 0.2s ease;
    }

    .profile-link:hover {
      background: #f1f5f9;
    }

    .profile-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #3B82F6;
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      flex-shrink: 0;
    }

    .profile-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .profile-name {
      font-size: 14px;
      font-weight: 600;
      color: #1e293b;
    }

    .profile-caption {
      font-size: 12px;
      color: #94a3b8;
    }

    .app-main {
      flex: 1;
      min-width: 0;
    }

    @media (max-width: 768px) {
      .app-container {
        flex-direction: column;
      }

      .sidebar {
        width: 100%;
        height: auto;
        position: relative;
        border-right: none;
        border-bottom: 1px solid #e2e8f0;
        padding: 16px;
      }

      .sidebar-brand {
        margin-bottom: 16px;
      }

      .sidebar-nav {
        flex-direction: row;
      }

      .sidebar-footer {
        display: none;
      }
    }
  `]
})
export class AppComponent {
  title = 'repit';
}
