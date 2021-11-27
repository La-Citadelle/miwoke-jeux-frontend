import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Partie } from "../@core/interfaces/jeux/partie";

@Injectable({
  providedIn: 'root'
})
export class JeuxService {
  parties = this.socket.fromEvent<any[]>('parties');

  constructor(private socket: Socket) { }

  getPartie(id: string) {
    this.socket.emit('getPartie', id);
  }

  getParties() {
    this.socket.emit('getParties');
  }
  
  addPartie(options) {
    this.socket.emit('addPartie', options);
  }
  
  editPartie(partie: Partie) {
    this.socket.emit('editPartie', partie);
  }

  activatePartie(idPartie) {
    this.socket.emit('activatePartie', idPartie);
  }

  joinPartie(data) {
    this.socket.emit('joinPartie', data);
  }

  getRoomData(idPartie) {
    return this.socket.fromEvent<Partie>(`getPartie:${idPartie}`);
  }

  addQuestion(idPartie) {
    this.socket.emit('addQuestion', idPartie);
  }

  awnserQuestion(data) {
    this.socket.emit('awnserQuestion', data);
  }

  addPoint(data) {
    this.socket.emit('addPoint', data);
  }

  removeLife(data) {
    this.socket.emit('removeLife', data);
  }
}