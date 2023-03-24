'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { coingecko } from "../pages/api/index";

const ConversionRatePlus = () => {
  const [conversionRate, setConversionRate] = useState(1);
  const [lastUpdated, setLastUpdated] = useState('');

  const [amount, setAmount] = useState(1);

  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await axios.get(`${coingecko}ids=ethereum&vs_currencies=${selectedCurrency.toLowerCase()}`);
        setConversionRate(response.data.ethereum[selectedCurrency.toLowerCase()]);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (error) {
        console.error(error);
      }
    };

  fetchConversionRate(); // Fetch conversion rate when component is mounted

    const intervalId = setInterval(() => {
      fetchConversionRate();
    }, 30000);

    return () => clearInterval(intervalId);
  }, [selectedCurrency]);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const convertedAmount = conversionRate && amount ? amount * conversionRate : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <h1 className="text-3xl font-bold text-gray-500">ETH to Fiat Converter</h1>
      <div className="flex flex-col items-center">
      <label htmlFor="amount">Amount:</label>
      <input 
        type="number" 
        id="amount" 
        name="desiredAmount" //name needs to add a random string to avoid browser autocomplete
        autoComplete="0xoff" // also, autoComplete needs to turn off with a random string as well.
        value={amount} 
        onChange={handleAmountChange} 
        className="block w-full text-center px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm lg:text-2xl"
      />

        <h2 className="ml-2 text-2xl font-bold text-indigo-600 mt-4">
        {(convertedAmount!=null) ? <p>{amount} ETH is worth {convertedAmount.toFixed(2)} {selectedCurrency}</p>
          : <p>Please give an amount</p>}
        </h2>
      </div>
      <p className="mt-2 text-gray-600">Last updated (PST): {lastUpdated}</p>
      <label htmlFor="currency" className="mt-4 text-gray-500">Select a currency:</label>
      <div className="relative mt-4">
        <select id="currency" name="currency" value={selectedCurrency} onChange={handleCurrencyChange} 
        className="block w-full px-4 py-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="JPY">JPY</option>
          {/* Add more options for other currencies */}
        </select>
      </div>
    </div>
  );
};

export default ConversionRatePlus;

