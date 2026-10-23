import { Routes } from '@angular/router';
import { DashboardViewComponent } from './views/dashboard/dashboard-view.component';
import { ProfileViewComponent } from './views/profile/profile-view.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    title: 'Сегодня — repit'
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
    title: 'Профиль — repit'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
