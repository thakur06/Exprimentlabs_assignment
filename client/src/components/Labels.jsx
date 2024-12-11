import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import UpdateEvent from "./UpdateEvent";
import dayjs from "dayjs";
export default function Labels() {
  const {
    user,
    login,
    showAllEvents,
    setShowAllEvents,
    locator,
    setLocator,
    allevent,
    setalleventtype,
    monthIndex,
  } = useContext(GlobalContext); // Access user and login status
  const [tasks, setTasks] = useState([]);
  const [updateId, setupdateId] = useState(null);
  const headers = {
    "Content-Type": "application/json",
  };

  const fetchEvents = async () => {
    if (user?.email) {
      try {
        await axios
          .post(
            "https://server-sigma-liard.vercel.app/fetchevent",
            { email: user.email },
            { headers }
          )
          .then((res) => {
            setTasks(res.data);
     
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await axios
        .post(
          "https://server-sigma-liard.vercel.app/deleteevent",

          { email: user.email, eventId: eventId },
          { headers }
        )
        .then((res) => {
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const isWithinCurrentWeek = (taskDate) => {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    const [year,month,day] = taskDate.split("-");
    const taskDateObj = new Date(year, month - 1, day);

    return taskDateObj >= startOfWeek && taskDateObj <= endOfWeek;
  };
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  // Filter tasks for the current month
  const filteredTasksMonth = tasks.filter((task) => {
    const currentStreak = dayjs(new Date(dayjs().year(), monthIndex)).format(
      "YYYY-MM"
    );

    const [year, month, day] = task.date.split("-");

    const [this_year,this_month] = currentStreak.split("-");

    return year === this_year && month === this_month;
  });

  // Filter tasks for the current week
  const filteredTasksWeek = tasks.filter((task) =>
    isWithinCurrentWeek(task.date)
  );

  useEffect(() => {
    fetchEvents(); // Fetch events when the login status changes
  }, [user, locator]); // Depend on login status and user email

  return (
    <React.Fragment>
      <p className="text-gray-500 font-bold mt-10">EVENTS / MEETINGS</p>
      <label>
        <input
          type="radio"
          name="options"
          value="option1"
          checked={allevent === 1}
          onChange={() => setalleventtype(1)}
        />
        All Events
      </label>

      <label>
        <input
          type="radio"
          name="options"
          value="option2"
          checked={allevent === 2}
          onChange={() => setalleventtype(2)}
        />
        monthly events
      </label>

      <label>
        <input
          type="radio"
          name="options"
          value="option3"
          checked={allevent === 3}
          onChange={() => setalleventtype(3)}
        />
        weekly events
      </label>
      <div className="h-[11.5rem] overflow-y-scroll">
        {allevent === 1 &&
          tasks.map((task, idx) => (
            <div className="border border-gray-500 p-3 mt-3"
              key={task.id}
              onClick={() => {
               
                setupdateId(task.id);
              }}
            >
                 <li className="font-bold text-black">{task.title}</li>
              <li className="ml-6 text-green-700">{task.date}</li>
              <li className="mb-3 ml-8 text-orange-700">{task.description}</li>
              <div className="flex text-center flex-row">
              <span
                className="border border-red-700 p-1 bg-red-700 text-white rounded-lg  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's onClick
                  deleteEvent(task.id, user.email);
                  setLocator(!locator);
                }}
              >
                delete event
              </span>
              <span
                className="border to-blue-700 p-1 bg-blue-700 text-white rounded-lg  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's onClick
                  setShowAllEvents(true);
                  setupdateId(task.id);
                }}
              >
                update event
              </span>
              </div>
            </div>
          ))}

        {allevent === 2 &&
          filteredTasksMonth.map((task, idx) => (
            <div className="border border-gray-500 p-3 mt-3"
              key={task.id}
              onClick={() => {

                setupdateId(task.id);
              }}
            >
                     <li className="font-bold text-black">{task.title}</li>
              <li className="ml-6 text-green-700">{task.date}</li>
              <li className="ml-8 text-orange-700 mb-3">{task.description}</li>
              <div className="flex text-center flex-row">
              <span
                className="border border-red-700 p-1 bg-red-700 text-white rounded-lg  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's onClick
                  deleteEvent(task.id, user.email);
                  setLocator(!locator);
                }}
              >
                delete event
              </span>
            
              <span
                className="border to-blue-700 p-1 bg-blue-700 text-white rounded-lg  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's onClick
                  setShowAllEvents(true);
                  setupdateId(task.id);
                }}
              >
                update event
              </span>
              </div>
            </div>
          ))}

        {allevent === 3 &&
          filteredTasksWeek.map((task, idx) => (
            <div className="border border-gray-500 p-3 mt-3"
              key={task.id}
              onClick={() => {
                setShowAllEvents(true);
                setupdateId(task.id);
              }}
            >
            <li className="font-bold text-black">{task.title}</li>
              <li className="ml-6 text-green-700">{task.date}</li>
              <li className="ml-8 mb-3 text-orange-700">{task.description}</li>
              <div className="flex text-center flex-row">
              <span
                className="border border-red-700 p-1 bg-red-700 text-white rounded-lg  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's onClick
                  deleteEvent(task.id, user.email);
                  setLocator(!locator);
                }}
              >
               delete event
              </span>
              <span
                className="border to-blue-700 p-1 bg-blue-700 text-white rounded-lg  cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents triggering the parent div's onClick
                  setShowAllEvents(true);
                  setupdateId(task.id);
                }}
              >
                update event
              </span>
            </div>
            </div>
          ))}
      </div>
      {showAllEvents && <UpdateEvent updateId={updateId} />}
    </React.Fragment>
  );
}
