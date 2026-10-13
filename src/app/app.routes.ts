import { Routes } from '@angular/router';
import { ListeOfs } from './ofs/liste-ofs/liste-ofs';

export const routes: Routes = [
  { path: '', redirectTo: 'ofs', pathMatch: 'full' },
  { path: 'ofs', component: ListeOfs, title: 'Liste des OFs' },
  {
    path: 'ofs/:numero',
    // Chargement « à la demande » : le code de la fiche n'est téléchargé qu'à sa première ouverture.
    loadComponent: () => import('./ofs/fiche-of/fiche-of').then((m) => m.FicheOf),
    title: 'Fiche OF',
  },
  { path: '**', redirectTo: 'ofs' },
];
