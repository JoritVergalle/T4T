import {Session} from './session.model';

export class Track {
  private _morning: Session;
  private _afternoon: Session;

  constructor() {
    this._morning = new Session(180);
    this._afternoon = new Session(240);
  }

  get morning(): Session {
    return this._morning;
  }

  get afternoon(): Session {
    return this._afternoon;
  }
}
