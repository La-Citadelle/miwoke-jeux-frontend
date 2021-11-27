/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private dialogService: NbDialogService,
              private router: Router,
              private jeuxService: JeuxService) {}
  
  async ngOnInit() {
    this.parties = this.jeuxService.parties;
  }

  async addNewPartie() {
    const dataPartie = { status: 0, isAwnsering: false, waitingAwnser: false};
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
}
