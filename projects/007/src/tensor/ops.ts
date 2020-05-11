import Tensor from './Tensor';

import { _isSameSize, IncompatibleTensorDimensions } from './_utils';

export function add(a: Tensor, b: Tensor) {
  if (!_isSameSize(a, b)) {
    throw new IncompatibleTensorDimensions();
  }

  const c = Tensor.zerosLike(a);

  for (let i = 0; i < a.vals.length; ++i) {
    c.vals[i] = a.vals[i] + b.vals[i];
  }
  return c;
}
