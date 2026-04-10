import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'documentation',
    loadChildren: () => import('./documentation/documentation.route').then((x) => x.documentationRoutes),
  },
  {
    path: '**',
    redirectTo: 'documentation',
  },
];
