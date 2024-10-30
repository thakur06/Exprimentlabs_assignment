import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function AllEvents() {
    var numberArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const {
    showAllEvents,
    setShowAllEvents,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  console.log(daySelected)


  return (
    <div className="h-screen w-full  border border-bl fixed top-0 flex justify-center items-center">
      
            <button onClick={() => {console.log(showAllEvents);
              setShowAllEvents(false);
            }}>
              <span className=" bg-green-500 text-gray-400">
               X
              </span>
            </button>
                   <div className="text-center w-full text-blue-600 ">
        {numberArray.map((data)=>(
        <li>{data}</li>
      ))}
        </div>
            
          </div>
        
  );
}
