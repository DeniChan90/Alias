import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';

import { Player } from '../classes/player';

const TIMELIMIT = 60; // Seconds

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  step: string;
  playerTurn: string;
  time: {seconds: number, interval: any};
  word: string;
  words: {word: string, correct: boolean}[];

  constructor(public gs: GameService) {
    this.step = 'player-select';
    this.words = [];
  }

  ngOnInit() {}

  changeGameStep(step: string) {
    this.playerTurn = this.gs.player1.name;
    this.step = step;
  }

  startGame() {
    const timer = () => {
      this.time.seconds = this.time.seconds + 1;
      if (this.time.seconds === TIMELIMIT) {
        this.endTurn();
      }
    };

    this.time = {
      seconds : 0,
      interval: setInterval(timer, 1000)
    };

    this.gs.getWord().subscribe((word: string) => this.word = word);
  }

  skip() {
    this.words.push({word : this.word, correct : false});
    this.gs.getWord().subscribe((word: string) => this.word = word);
  }

  correctAnswer(correct: boolean) {
    if (this.playerTurn === this.gs.player1.name) {
      this.gs.player2.increaseScore();
    } else {
      this.gs.player1.increaseScore();
    }

    this.words.push({word : this.word, correct});
    this.gs.getWord().subscribe((word: string) => this.word = word);
  }

  endTurn() {
    if (this.playerTurn === this.gs.player2.name) {
      this.playerTurn = this.gs.player1.name;
    } else {
      this.playerTurn = this.gs.player2.name;
    }

    clearInterval(this.time.interval);
    this.time = null;
  }
}
