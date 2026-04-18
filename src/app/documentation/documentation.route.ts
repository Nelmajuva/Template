import { Routes } from '@angular/router';

export const documentationRoutes: Routes = [
  {
    path: 'buttons',
    loadComponent: () => import('./pages/buttons/buttons').then((x) => x.Buttons),
  },
  {
    path: 'accordion',
    loadComponent: () => import('./pages/accordion/accordion').then((x) => x.Accordion),
  },
  {
    path: 'alerts',
    loadComponent: () => import('./pages/alerts/alerts').then((x) => x.Alerts),
  },
  {
    path: '**',
    redirectTo: 'buttons',
  },
];
