"use client";
import { useState } from "react";

import CurrencyExchange from "@/components/CurrencyExchange";
import CurrencySelector from "@/components/CurrencySelector";

export default function Home() {
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("JPY");
  return (
    <div className='py-10'>
      <div className='max-w-[500px] bg-gray-50 text-black rounded-lg mx-auto flex flex-col gap-5 p-5'>
        <div className='text-3xl font-bold text-green-500'>Exchange Rate Viewer</div>
        <CurrencySelector
          selectedCurrency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          label='From'
        />
        <CurrencySelector
          selectedCurrency={toCurrency}
          onCurrencyChange={setToCurrency}
          label='To'
        />
        <CurrencyExchange fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>
    </div>
  );
}
