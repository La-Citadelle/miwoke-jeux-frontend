/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './@auth/guards/auth.guard';
import { AdminGuard } from './@auth/guards/admin.guard';

const routes: Routes = [
  {
    path: 'jeux',
    canActivate: [AuthGuard],
    loadChildren: () => import('./jeux/jeux.module')
      .then(m => m.JeuxModule),
  },
  {
    path: 'pages',
    canActivate: [AdminGuard],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./@auth/auth.module')
      .then(m => m.AuthModule),
  },
  { path: '', redirectTo: 'jeux', pathMatch: 'full' },
  { path: '**', redirectTo: 'jeux' },
];

const config: ExtraOptions = {
    useHash: false,
    relativeLinkResolution: 'legacy',
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
