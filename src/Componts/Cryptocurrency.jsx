import React, { useState } from "react";
import BasicTable from "./CoinTabel";
const Cryptocurrency = () => {
  const [search, setsearch] = useState("");
  return (
    <>
      <div className="md:mx-16 mx-2">
        <h4
          className="font-[montserrat] text-[34px] text-[#ffffff] text-center my-8"
          style={{ fontWeight: "400" }}
        >
          Cryptocurrency Prices by Market Cap
        </h4>
        <div className="max-w-[100%] ">
          <input
            type="search"
            placeholder="Search For a Crypto Currency.."
            className="min-w-[100%] bg-transparent p-5  border-b-2 border-gray-500 text-xl outline-none"
            onChange={(e) => setsearch(e.target.value)}
          />
          <BasicTable search={search} />
        </div>
      </div>
    </>
  );
};

export default Cryptocurrency;
