import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {

  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [user, setuser] = useState({});
  const [locator, setLocator] = useState(false);
  const [allevent, setalleventtype] = useState(1);
  const [login, setLogin] = useState(false);
  const [date, setDate] = useState(dayjs().format("DD-MM-YY"))
  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        user,
        setuser,
        login,
       setLogin,
       date,
       setDate,
       setShowAllEvents,
       showAllEvents,
       locator,
       setLocator,
       allevent,
       setalleventtype,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
