"use client";
import { CURRENCIES } from "./currencies";

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  label: string;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  selectedCurrency,
  onCurrencyChange,
  label,
}) => {
  return (
    <div className='flex flex-col items-start'>
      <label className='text-gray-700 text-sm font-medium mb-1'>{label}</label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className='w-full p-2 bg-white/20 backdrop-blur-md rounded-md border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        {CURRENCIES.map((currency) => (
          <option key={currency.currency} value={currency.currency}>
            {currency.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
