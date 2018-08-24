export class Player {
  public name: string;
  private _score: number;

  constructor(name: string) {
    this.name = name;
    this._score = 0;
  }

  increaseScore() {
    this._score += 1;
  }

  get score() {
    return this._score;
  }
}
