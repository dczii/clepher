"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";

interface ExchangeRateData {
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": string;
    "2. From_Currency Name": string;
    "3. To_Currency Code": string;
    "4. To_Currency Name": string;
    "5. Exchange Rate": string;
    "6. Last Refreshed": string;
    "7. Time Zone": string;
    "8. Bid Price": string;
    "9. Ask Price": string;
  };
}

type CurrencyExchangeProps = {
  fromCurrency: string;
  toCurrency: string;
};

const CurrencyExchange = ({ fromCurrency, toCurrency }: CurrencyExchangeProps) => {
  const [exchangeData, setExchangeData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        setLoading(true);
        const APIKEY = process.env.NEXT_PUBLIC_ALPHAVANTAGE_API_KEY;
        const response = await fetch(
          `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${APIKEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data?.Information) {
          setError(data?.Information || "");
        } else {
          setExchangeData(data);
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch exchange data");
        setLoading(false);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  if (loading)
    return (
      <div className='w-full h-20 flex justify-center items-center'>
        <Loader />
      </div>
    );
  if (error)
    return (
      <div>
        <p className='text-red-800'>{error}</p>
      </div>
    );

  return (
    <div>
      {exchangeData && (
        <div className='p-6 max-w-lg mx-auto bg-white/50 rounded-lg shadow-lg backdrop-blur-md border border-gray-200'>
          <h1 className='text-2xl font-semibold text-gray-800 mb-4'>Currency Exchange Rate</h1>

          <p>
            <strong>From:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["1. From_Currency Code"]} -{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["2. From_Currency Name"]}
          </p>
          <p>
            <strong>To:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["3. To_Currency Code"]} -{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["4. To_Currency Name"]}
          </p>
          <p>
            <strong>Exchange Rate:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}
          </p>
          <p>
            <strong>Last Refreshed:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["6. Last Refreshed"]}
          </p>
          <p>
            <strong>Time Zone:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["7. Time Zone"]}
          </p>
          <p>
            <strong>Bid Price:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["8. Bid Price"]}
          </p>
          <p>
            <strong>Ask Price:</strong>{" "}
            {exchangeData["Realtime Currency Exchange Rate"]["9. Ask Price"]}
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyExchange;
