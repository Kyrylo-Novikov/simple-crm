import { Routes } from '@angular/router';

import { Dashboard } from './components/dashboard/dashboard';
import { User } from './components/user/user';
import { UserDetail } from './components/user-detail/user-detail';

export const routes: Routes = [
  { path: '', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'user', component: User },
  { path: 'user/:id', component: UserDetail },
];
