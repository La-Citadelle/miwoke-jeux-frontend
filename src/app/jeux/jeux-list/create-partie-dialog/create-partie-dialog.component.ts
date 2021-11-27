/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-create-partie-dialog',
  templateUrl: 'create-partie-dialog.component.html',
  styleUrls: ['create-partie-dialog.component.scss'],
})
export class CreatePartieDialogComponent {

  constructor(protected ref: NbDialogRef<CreatePartieDialogComponent>) {}

  cancel() {
    this.ref.close();
  }

  submit(name) {
    this.ref.close(name);
  }
}
