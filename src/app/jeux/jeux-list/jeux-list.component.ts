/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbAccessChecker, NbRoleProvider } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Partie } from '../../@core/interfaces/jeux/partie';
import { JeuxService } from '../jeux.service';
import { CreatePartieDialogComponent } from './create-partie-dialog/create-partie-dialog.component';

@Component({
  selector: 'ngx-jeux-list',
  templateUrl: 'jeux-list.component.html',
  styleUrls: ['jeux-list.component.scss'],
})
export class JeuxListComponent implements OnInit {

  parties: Observable<Partie[]>;
  role;
  
  constructor(private dialogService: NbDialogService,
              private router: Router,
              private roleProvider: NbRoleProvider,
              public accessChecker: NbAccessChecker,
              private jeuxService: JeuxService) {}
  
  async ngOnInit() {
    this.parties = this.jeuxService.parties;
    this.role = await this.roleProvider.getRole().toPromise();
    
  }

  async addNewPartie() {
    const dataPartie = { status: 0, isAwnsering: false, waitingAwnser: false, players: []};
    this.dialogService.open(CreatePartieDialogComponent)
      .onClose.subscribe(name => name && this.jeuxService.addPartie({name, ...dataPartie}));
  }

  activatePartie(event) {
    this.jeuxService.activatePartie(event._id);
  }

  loadPartie(event) {
    this.router.navigate([`jeux/partie/${event}`]);
  }

  updatePartie(event) {
    this.router.navigate([`jeux/partie/edit/${event._id}`]);
  }

  canJoinPartie(partie) {
    return partie.status==1 && partie.players.length <= 0;
  }
}
