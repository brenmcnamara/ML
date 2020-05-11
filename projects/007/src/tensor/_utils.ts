import Tensor from './Tensor';

export function _isSameSize(a: Tensor, b: Tensor): boolean {
  const { size: sizeA } = a;
  const { size: sizeB } = b;

  if (sizeA.length !== sizeB.length) {
    return false;
  }

  for (let i = 0; i < sizeA.length; ++i) {
    if (sizeA[i] !== sizeB[i]) {
      return false;
    }
  }

  return true;
}

export class IncompatibleTensorDimensions extends Error {}
