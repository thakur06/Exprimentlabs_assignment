import { useContext, useState,useEffect } from "react";
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import Sidebar from "./Components/Sidebar";
import { getMonth } from "./utils/cal";
import GlobalContext from "./context/GlobalContext";
function App() {
  const {monthIndex}=useContext(GlobalContext);
const [currMonth, setcurrMonth] = useState(getMonth());
useEffect(() => {
  setcurrMonth(getMonth(monthIndex));

}, [monthIndex])

  return <>
  <div className="flex flex-col">
  <CalendarHeader/>
    <div className="flex flex-1">
     <Sidebar/>
      <Month month={currMonth}/>
    </div>
  </div>
  </>;
}

export default App;
