/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from '../pages/miscellaneous/not-found/not-found.component';
import { JeuxComponent } from './jeux.component';
import { JeuxListComponent } from './jeux-list/jeux-list.component';
import { PartieComponent } from './partie/partie.component';

const routes: Routes = [{
  path: '',
  component: JeuxComponent,
  children: [
    {
      path: '',
      component: JeuxListComponent,
    },
    {
      path: 'partie/:id',
      component: PartieComponent,
    },
    {
      path: '**',
      redirectTo: 'jeux',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeuxRoutingModule {
}
