import React,{useContext,useState,useEffect} from "react";
import Day from "./Day";
import EventModal from "./EventModal";
import GlobalContext from "../context/GlobalContext";
import { auth } from "../utils/auth";
export default function Month({ month }) {
  const {
    showAllEvents,
    setShowAllEvents,
    showEventModal,
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
    user,
    login
  } = useContext(GlobalContext);

  const canShowEventModal = showEventModal && login;
  return (
    <>
    <div className="flex-1 grid grid-cols-7 grid-rows-5">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
          ))}
        </React.Fragment>
      ))}
    </div>
    {canShowEventModal && <EventModal/>}
   
  
    </>
  );
}
