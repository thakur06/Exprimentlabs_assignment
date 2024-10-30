import React,{useContext} from "react";
import Day from "./Day";
import EventModal from "./EventModal";
import GlobalContext from "../context/GlobalContext";
import AllEvents from "./AllEvents";
export default function Month({ month }) {
  const {
    showAllEvents,
    setShowAllEvents,
    showEventModal,
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

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
    {showEventModal && <EventModal/>}
   
        {/* { showAllEvents &&
          <AllEvents/>
        } */}
    </>
  );
}
