import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseUrl } from "../Componts/BaseUrl";
import { useSelector } from "react-redux";
import { BiSolidUpArrow, BiSolidDownArrow } from "react-icons/bi";
import { IoPulseOutline } from "react-icons/io5";
import { Loader } from "@react-three/drei";
import CoinChart from "../Componts/CoinChart";
const Detail = () => {
  const Parmas = useParams();
  const [detail, setdetail] = useState([]);
  const [loading, setloading] = useState(true);
  const currency = useSelector((state) => state.currency.currency);
  const Symbol = currency === "inr" ? "₹" : "$";
  const profit = detail.market_data?.price_change_percentage_24h > 0;
  const fetchcoindtails = async () => {
    try {
      const { data } = await axios.get(`${BaseUrl}${Parmas.id}`);
      setdetail(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      setloading(true);
    }
  };
  useEffect(() => {
    fetchcoindtails();
  }, [currency]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="md:flex min-h-[10vh]">
          <div className="md:w-[25%] min-h-[10vh] md:border-r-2 border-gray-500 flex justify-center flex-col mx-5 font-[Roboto]">
            <div className="">
              <img
                src={detail.image?.large}
                alt={detail.name}
                className="w-[150px] my-6"
              />
            </div>
            <div className="font-bold text-2xl">{detail.name}</div>
            {detail.market_data && (
              <div>
                <div className="font-bold my-3">
                  {Symbol}
                  {detail.market_data.current_price[currency]}
                </div>
                <div className="flex gap-1">
                  {profit ? (
                    <BiSolidUpArrow color="green" />
                  ) : (
                    <BiSolidDownArrow color="red" />
                  )}
                  {detail.market_data.price_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            )}

            <div className="my-2 font-bold text-xl flex gap-1">
              <IoPulseOutline color="orange" />#{detail.market_cap_rank}
            </div>
            <div className="">
              {detail.description && detail.description.en && (
                <p className="">{detail.description.en.split(".")[0]}</p>
              )}
            </div>
          </div>
          <div className="md:w-[75%]">
            <CoinChart currency={currency} />
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
