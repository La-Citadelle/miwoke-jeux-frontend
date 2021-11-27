
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { 
  NbAccordionModule,
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule
} from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { CreatePartieDialogComponent } from './jeux-list/create-partie-dialog/create-partie-dialog.component';
import { JeuxComponent } from './jeux.component';
import { JeuxListComponent } from './jeux-list/jeux-list.component';
import { JeuxMenu } from './jeux-menu';
import { JeuxRoutingModule } from './jeux-routing.module';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';
import { NbSecurityModule } from '@nebular/security';
import { PartieComponent } from './partie/partie.component';
import { ThemeModule } from '../@theme/theme.module';

const JEUX_COMPONENTS = [
  JeuxComponent,
  JeuxListComponent,
  CreatePartieDialogComponent,
  PartieComponent
];

const IMPORTS = [
    JeuxRoutingModule,
    FormsModule,
    MiscellaneousModule,
    NbAccordionModule,
    NbActionsModule,
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbMenuModule,
    NbSecurityModule,
    ThemeModule,
    AuthModule.forRoot(),
  ];

@NgModule({
  imports: [...IMPORTS],
  declarations: [...JEUX_COMPONENTS],
  providers: [
    JeuxMenu
  ],
})
export class JeuxModule {
}
