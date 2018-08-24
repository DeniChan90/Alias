import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Player } from '../classes/player';

@Injectable()
export class GameService {
  //// TODO: Should be a list to be able tohave any number of players

  player1: Player;
  player2: Player;

  constructor(private http: Http) {}

  getWord() {
    return this.http.get('/api/get_word/').pipe(
        map((res: Response) => res.text())
      );
  }
}
