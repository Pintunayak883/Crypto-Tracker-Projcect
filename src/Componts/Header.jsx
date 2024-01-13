import React, { useState } from "react";
import { setCurrency } from "../Redux/CurrencySlice";
import { useDispatch } from "react-redux";
import { FaBitcoin } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleCurrencyChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCurrency(selectedValue);
    dispatch(setCurrency(selectedValue));
  };

  return (
    <>
      <div className="flex items-center justify-between md:px-[100px] px-2 py-3 bg-[#14161A] shadow-md">
        <div className="">
          <NavLink
            to={"/"}
            className="flex items-center gap-2 text-gold-500 text-2xl font-[montserrat] font-bold text-[#EEBC1D]"
          >
            <FaBitcoin size={45} /> Coin Master
          </NavLink>
        </div>

        <div className="">
          <select
            className="bg-transparent md:text-xl border border-gray-300 py-1 px-3 font-[poppins] font-bold rounded-md"
            onChange={handleCurrencyChange}
            value={selectedCurrency}
          >
            <option
              value="inr"
              className="bg-[#515151] font-[poppins] md:text-xl rounded-md"
            >
              INR
            </option>
            <option
              value="usd"
              className="bg-[#515151] font-[poppins] md:text-xl rounded-md"
            >
              USD
            </option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Header;
