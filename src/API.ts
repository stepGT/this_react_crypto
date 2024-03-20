import { cryptoAssets, cryptoData } from './data';
import { TAssets, IResult } from './data';

export function fakeFetchCrypto() {
  return new Promise<IResult>((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 2000);
  });
}

export function fetchAssets() {
  return new Promise<TAssets[]>((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 2000);
  });
}
