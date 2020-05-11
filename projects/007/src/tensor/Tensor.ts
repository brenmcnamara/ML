export default class Tensor {
  private _size: number[];

  private _vals: number[];

  constructor(vals: number[], size: number[]) {
    this._size = size;
    this._vals = vals;
  }

  static zeros(size: number[]): Tensor {
    const len = size.reduce((m, x) => m * x, 1);
    const vals = new Array(len);
    for (let i = 0; i < len; ++i) {
      vals[i] = 0;
    }
    return new Tensor(vals, size);
  }

  static zerosLike(t: Tensor): Tensor {
    return Tensor.zeros(t.size);
  }

  get size(): number[] {
    return this._size;
  }

  get vals(): number[] {
    return this._vals;
  }
}
