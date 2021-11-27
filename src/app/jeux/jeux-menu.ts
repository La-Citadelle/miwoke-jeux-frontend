import { NbMenuItem } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class JeuxMenu {

  getMenu(): Observable<NbMenuItem[]> {
    const jeuxMenu: NbMenuItem[] = [
      {
        title: 'Général',
        group: true,
      },
      {
        title: 'Jeux',
        icon: 'home-outline',
        link: '/jeux',
        children: undefined,
      }
    ];

    return of([...jeuxMenu]);
  }
}
