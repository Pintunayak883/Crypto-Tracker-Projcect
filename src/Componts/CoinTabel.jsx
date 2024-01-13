import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { BaseUrl } from "./BaseUrl";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const CoinTabel = ({ search }) => {
  const currency = useSelector((state) => state.currency.currency);
  const Symbol = currency === "inr" ? "₹" : "$";
  const Navigate = useNavigate();
  const [list, setlist] = useState([]);
  const [loading, setloading] = useState(true);
  const fetchCoinlist = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=$1&sparkline=false&locale=en`
      );
      setlist(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(true);
    }
  };

  useEffect(() => {
    fetchCoinlist();
  }, [currency]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <table className="w-full text-sm text-left rtl:text-right mt-10 ">
            <thead className="text-[14px] font-[montserrat] text-[#000000] uppercase bg-[#EEBC1D]">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Coin
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  24h Change
                </th>
                <th scope="col" className="px-6 py-3">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody>
              {list
                .filter((data) => {
                  if (data == "") {
                    return data;
                  } else if (
                    data.name.toLowerCase().includes(search.toLowerCase()) ||
                    data.symbol.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return data;
                  }
                })
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <tr
                      onClick={() => Navigate(`/detail/${row.id}`)}
                      className="border-b border-gray-300 bg-transparent hover:bg-[#131111] cursor-pointer"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 flex items-center gap-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <div className="">
                          <img
                            src={row?.image}
                            alt={row.name}
                            className="h-[60px]"
                          />
                        </div>
                        <div className="flex flex-col">
                          <span
                            className="text-[22px] font-[Roboto] py-1"
                            style={{ fontWeight: "400" }}
                          >
                            {row.symbol}
                          </span>
                          <span
                            className="text-[14px] font-[Roboto] text-[#a9a9a9]"
                            style={{ fontWeight: "400" }}
                          >
                            {row.name}
                          </span>
                        </div>
                      </th>
                      <td
                        className="px-6 py-4 text-[14px] font-[Roboto]"
                        style={{ fontWeight: "400" }}
                      >
                        {Symbol}{" "}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </td>
                      <td
                        className="px-6 py-4 text-[14px] font-[Roboto]"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td
                        className="px-6 py-4 text-[14px] font-[Roboto]"
                        style={{ fontWeight: "400" }}
                      >
                        {Symbol}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6)
                        )}
                        M
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default CoinTabel;
