import { Routes } from '@angular/router';
import {Graph2Component} from './graphique/graph-2/graph-2.component';

export const routes: Routes = [
  { path: '', redirectTo: 'graph', pathMatch: 'full' },
  {
    path: 'graph',
    children:[
      { path: '', redirectTo: '1', pathMatch: 'full' },
      {path: '1', loadComponent: () => import('./graphique/graph-1/graph-1.component').then(m => m.Graph1Component)},
      {path: '2', loadComponent: () => import('./graphique/graph-2/graph-2.component').then(m => m.Graph2Component)},
      {path: '3', loadComponent: () => import('./graphique/graph-3/graph-3.component').then(m => m.Graph3Component)},
      {path: '4', loadComponent: () => import('./graphique/graph-4/graph-4.component').then(m => m.Graph4Component)},
    ],
  },
 ];
