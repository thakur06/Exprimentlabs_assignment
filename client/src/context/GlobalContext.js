import React from "react";
import dayjs from "dayjs";
const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: () => {},
  showAllEvents: false,
  setShowAllEvents: () => {},
  updateLabel: () => {},
  filteredEvents: [],
  user: {},
  setuser: () => {},
  login: false,
  setLogin: () => {},
  date:null,
  setDate: () => {},
  locator:false,
  setLocator:()=>{},
  allevent: 1,
  setalleventtype: (index) => {},
});

export default GlobalContext;
