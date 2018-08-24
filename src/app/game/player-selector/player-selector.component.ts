import { Component, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';

import { Player } from '../../classes/player';

@Component({
  selector: 'app-player-selector',
  templateUrl: './player-selector.component.html',
  styleUrls: ['./player-selector.component.css']
})
export class PlayerSelectorComponent {
  player1: string;
  player2: string;

  @Output() nextStep: EventEmitter<string>;

  constructor(public gs: GameService) {
    this.nextStep = new EventEmitter();
  }

  startGame() {
    if (this.player1 === this.player2) {
      return;
     }

    this.gs.player1 = new Player(this.player1);
    this.gs.player2 = new Player(this.player2);
    this.nextStep.emit('game');
  }
}
