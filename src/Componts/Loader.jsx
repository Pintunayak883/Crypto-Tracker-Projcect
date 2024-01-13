import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <div className="flex items-center justify-center h-[20vh]">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
      </div>
    </>
  );
};

export default Loader;
