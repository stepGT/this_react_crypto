import { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../API';
import { percentDifference } from '../utils';
import { IResult, TAssets, TCryptoData } from '../data';

interface IContext {
  assets: TAssets[];
  crypto: {
    result: TCryptoData[];
  };
  loading: boolean;
}

const CryptoContext = createContext<IContext>({
  assets: [],
  crypto: {
    result: [],
  },
  loading: false,
});

export function CryptoContextProvider({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<IResult>();
  const [assets, setAssets] = useState<TAssets[]>();

  useEffect(() => {
    const preload = async () => {
      setLoading(true);
      const dataCrypto = await fakeFetchCrypto();
      const dataAssets = await fetchAssets();
      //
      setCrypto(dataCrypto);
      setAssets(
        dataAssets.map((asset) => {
          const coin = dataCrypto.result.find((crypto) => crypto.id === asset.id)!;
          return {
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
          };
        }),
      );
      setLoading(false);
    };
    preload();
  }, []);

  return (
    // @ts-ignore
    <CryptoContext.Provider value={{ loading, crypto, assets }}>{children}</CryptoContext.Provider>
  );
}

export default CryptoContext;
