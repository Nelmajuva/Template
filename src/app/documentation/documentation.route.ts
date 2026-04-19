import { Routes } from '@angular/router';

export const documentationRoutes: Routes = [
  {
    path: 'accordion',
    loadComponent: () => import('./pages/accordion/accordion').then((x) => x.Accordion),
  },
  {
    path: 'alerts',
    loadComponent: () => import('./pages/alerts/alerts').then((x) => x.Alerts),
  },
  {
    path: 'buttons',
    loadComponent: () => import('./pages/buttons/buttons').then((x) => x.Buttons),
  },
  {
    path: 'forms',
    loadComponent: () => import('./pages/forms/forms').then((x) => x.Forms),
  },
  {
    path: 'modals',
    loadComponent: () => import('./pages/modals/modals').then((x) => x.Modals),
  },
  {
    path: '**',
    redirectTo: 'buttons',
  },
];
