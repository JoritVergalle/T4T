import {Talk} from './talk.model';

export class Session {
  private _talks: Talk[];
  private _maxTime: number;

  constructor(time: number) {
    this._talks = new Array<Talk>();
    this._maxTime = time;
  }

  get talks(): Talk[] {
    return this._talks;
  }

  addTalk(talk: Talk) {
    this._talks.push(talk);
  }

  get maxTime(): number {
    return this._maxTime;
  }

  set maxTime(value: number) {
    this._maxTime = value;
  }
}
