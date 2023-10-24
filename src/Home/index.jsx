import { useEffect, useState } from "react";
import { FetchData } from "../Api";

export default function Home() {
  const [money1, setMoney1] = useState("USD");
  const [money2, setMoney2] = useState("TRY");
  const [conversionRate, setConversionRate] = useState(1);
  const [baseCode, setBaseCode] = useState("USD");
  const [targetCode, setTargetCode] = useState("TRY");
  const [conversionResult, setConversionResult] = useState("");

  const handleMoney1Change = (e) => {
    setMoney1(e.target.value);
  };

  const handleMoney2Change = (e) => {
    setMoney2(e.target.value);
  };

  // money1 ve money2 her güncellendiğinde useEffect çalışır.

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchData(money1, money2, conversionRate);

        setBaseCode(money1);
        setTargetCode(money2);
        setConversionResult(data.conversion_result);
      } catch (error) {
        console.error('API isteği başarısız: ', error);
      }
    }

    fetchData();
  }, [money1, money2, conversionRate]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen border border-black">
      <div>
      <div>
      {conversionRate} {baseCode} Parası : {conversionResult} {targetCode}
      </div>
        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="price"
              id="price"
              value={conversionRate}
              onChange={(e) => setConversionRate(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={money1}
                onChange={handleMoney1Change}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
                <option>TRY</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="priceInput2"
              id="priceInput2"
              value={conversionResult}
              onChange={(e) => setConversionResult(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="0.00"
            ></input>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currencySelect2" className="sr-only">
                Currency
              </label>
              <select
                id="currencySelect2"
                name="currencySelect2"
                value={money2}
                onChange={handleMoney2Change}
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                <option>USD</option>
                <option>CAD</option>
                <option>EUR</option>
                <option>TRY</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
