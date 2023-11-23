import React from "react";
import "../index.css";

function Item({ data }) {
  console.log("data", data)
  return (
    <div className="shadow-md bg-white text-left px-8 py-12 m-auto">
      <p className="text-4xl font-bold">{data.activity}</p>
      <div className="flex gap-x-6 bg-slate-200 px-4 py-4 my-4 rounded-l mt-auto ">
        <span className="text-sm text-white px-6 py-2 bg-emerald-700 rounded-xl">
          {data.type}
        </span>
        <span className="text-sm text-white px-6 py-2 bg-stone-700 rounded-xl">
          {data.participants} participant(s)
        </span>
        <span className="text-sm text-white px-6 py-2 bg-lime-700 rounded-xl">
          {data.price}$
        </span>
      </div>
      {data.accessibility && (
        <div className=" flex relative w-full sm:w-1/2 bg-gray-200 rounded  text-xs ">
          <p className=" text-white bg-red-600 font-bold"> Accessibility:</p>
          <div
            className="absolute top-0  rounded shim-blue w-full "
            style={{ width: data.accessibility * 100 + "%" }}
          >
            {data.accessibility}
          </div>
        </div>
      )}
      {data.link && (
        <a href={data.link} className="text-2xl p-10" target="_blank">
          link: {data.link}
        </a>
      )}
    </div>
  );
}

export default Item;
