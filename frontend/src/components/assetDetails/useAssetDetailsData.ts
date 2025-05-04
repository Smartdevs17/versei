import { useState, useEffect } from 'react';

interface Transaction {
  id: number;
  type: string;
  address: string;
  dateTime: string;
  value: string;
}

interface Holder {
  id: number;
  address: string;
  value: string;
}

interface PriceDataPoint {
  timestamp: string;
  price: number;
}

interface AssetDetailsData {
  transactions: Transaction[];
  holders: Holder[];
  priceDataPoints: PriceDataPoint[];
  loading: boolean;
  error: string | null;
}

const useAssetDetailsData = (assetTitle: string): AssetDetailsData => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [holders, setHolders] = useState<Holder[]>([]);
  const [priceDataPoints, setPriceDataPoints] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [transactionsResponse, holdersResponse, priceResponse] = await Promise.all([
          new Promise<Transaction[]>((resolve) =>
            setTimeout(() => {
              resolve([
                {
                  id: 1,
                  type: 'Sent',
                  address: '0xBEF45762783492820',
                  dateTime: '12.09.2019 - 12:53 PM',
                  value: '$34,295',
                },
                {
                  id: 2,
                  type: 'Received',
                  address: '0xBEF45762783492820',
                  dateTime: '12.09.2019 - 12:53 PM',
                  value: '$34,295',
                },
                {
                  id: 3,
                  type: 'Received',
                  address: '0xBEF45762783492820',
                  dateTime: '12.09.2019 - 12:53 PM',
                  value: '$34,295',
                },
              ]);
            }, 1000)
          ),
          new Promise<Holder[]>((resolve) =>
            setTimeout(() => {
              resolve([
                {
                  id: 1,
                  address: '0xBEF45762783492820',
                  value: '$34,295',
                },
                {
                  id: 2,
                  address: '0xBEF45762783492820',
                  value: '$34,295',
                },
                {
                  id: 3,
                  address: '0xBEF45762783492820',
                  value: '$34,295',
                },
              ]);
            }, 1000)
          ),
          new Promise<PriceDataPoint[]>((resolve) =>
            setTimeout(() => {
              resolve(
                Array.from({ length: 60 }, (_, i) => ({
                  timestamp: (i + 1).toString(),
                  price: Math.random() * 50 + 25,
                }))
              );
            }, 1000)
          ),
        ]);

        setTransactions(transactionsResponse);
        setHolders(holdersResponse);
        setPriceDataPoints(priceResponse);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [assetTitle]);

  return { transactions, holders, priceDataPoints, loading, error };
};

export default useAssetDetailsData;