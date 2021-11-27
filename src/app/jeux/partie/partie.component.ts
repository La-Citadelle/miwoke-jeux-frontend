import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NbAuthService } from "@nebular/auth";
import { Observable, Subscription } from "rxjs";
import { UserData } from "../../@core/interfaces/common/users";
import { Partie } from "../../@core/interfaces/jeux/partie";
import { JeuxService } from "../jeux.service";

@Component({
  selector: 'ngx-partie',
  styleUrls: ['./partie.component.scss'],
  templateUrl: './partie.component.html',
})
export class PartieComponent implements OnInit {
  partie: Observable<Partie>;
  idPartie: string;
  currentPlayer
  players;
  constructor(private jeuxService: JeuxService,
              private route: ActivatedRoute,
              private usersService: UserData) { }
  
  
  async ngOnInit() {
    this.idPartie = this.route.snapshot.paramMap.get('id');
    this.currentPlayer = await this.usersService.getCurrentUser().toPromise();
    this.addPlayerToPartie();
    this.partie = this.jeuxService.getRoomData(this.idPartie);
  }
  
  async addPlayerToPartie() {
    const data = {
      idPartie: this.idPartie,
      currentPlayer: this.currentPlayer
    };
    this.jeuxService.joinPartie(data);
  }

  addQuestion() {
    this.jeuxService.addQuestion(this.idPartie);
  }

  awnserQuestion() {
    this.jeuxService.awnserQuestion({idPartie: this.idPartie, currentPlayer: this.currentPlayer});
  }

  addPoint() {
    this.jeuxService.addPoint(this.idPartie);
  }

  removeLife() {
    this.jeuxService.removeLife(this.idPartie);
  }
}