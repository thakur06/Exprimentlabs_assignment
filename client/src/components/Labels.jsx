import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Labels() {
  var numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">Label</p>
    <div className="h-[11.5rem] overflow-y-scroll">
      {numberArray.map((data)=>(
        <li>{data}</li>
      ))}
    </div>
    </React.Fragment>
  );
}
