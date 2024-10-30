import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const {
    setDaySelected,
    setShowEventModal,
    setShowAllEvents,
    showAllEvents,
    filteredEvents,
    setSelectedEvent,
    setDate,
    login,
    showEventModal,
  } = useContext(GlobalContext);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">{day.format("ddd").toUpperCase()}</p>
        )}
        <p className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer text-center text-emerald-800"
        onClick={() => {
          if(!login){
            alert("Please login to add events/meetings");
          }
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {" "}
        Add event
      </div>
    </div>
  );
}
