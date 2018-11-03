export class Talk {
  private _title: string;
  private _length: number;

  constructor(title: string, length: number) {
    this._title = title;
    this._length = length;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get length(): number {
    return this._length;
  }

  set length(value: number) {
    this._length = value;
  }
}
