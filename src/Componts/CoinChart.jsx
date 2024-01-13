import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "./BaseUrl";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Loader from "./Loader";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinChart = ({ currency }) => {
  const [days, setdays] = useState("1");
  const [chartdata, setchartdata] = useState([]);
  const Params = useParams();
  const ChartData = async () => {
    try {
      const { data } = await axios.get(
        `${BaseUrl}/${Params.id}/market_chart?vs_currency=${currency}&days=${days}`
      );
      setchartdata(data.prices);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    ChartData();
  }, [Params.id, currency, days]);

  const Mydata = {
    labels: chartdata.map((value) => {
      const date = new Date(value[0]);
      const time =
        date.getHours() > 12
          ? `${date.getHours() - 12} : ${date.getMinutes()}PM`
          : `${date.getHours()}:${date.getMinutes()}AM`;
      return days === 1 ? time : date.toLocaleDateString();
    }),
    datasets: [
      {
        label: `Price in Past ${days} Days in ${currency}`,
        data: chartdata.map((value) => value[1]),
        borderColor: "orange",
        borderWidth: "3",
      },
    ],
  };
  return (
    <>
      <div className="">
        {chartdata.length === 0 ? (
          <Loader />
        ) : (
          <div className="">
            <Line
              data={Mydata}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
              style={{ marginTop: "5rem" }}
            />

            <div className="flex gap-4 px-5 my-2">
              <button
                className="bg-[#EEBC1D]  p-3 rounded-lg text-black font-bold font-[Roboto]"
                onClick={() => setdays("1")}
              >
                24 Hours
              </button>
              <button
                className="bg-[#EEBC1D]  p-3 rounded-lg text-black font-bold font-[Roboto]"
                onClick={() => setdays("30")}
              >
                1 Month
              </button>
              <button
                className="bg-[#EEBC1D]  p-3 rounded-lg text-black font-bold font-[Roboto]"
                onClick={() => setdays("365")}
              >
                1 Year
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CoinChart;
