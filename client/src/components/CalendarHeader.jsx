import dayjs from "dayjs";
import axios from "axios";
import React, { useContext, useState } from "react";
import logo from "../assets/image.png";
import GlobalContext from "../context/GlobalContext";
import { auth, signInWithPopup, provider } from "../utils/auth";

export default function CalendarHeader() {
  const [googleuser, setgoogleuser] = useState("");
  const { monthIndex, setMonthIndex, setuser, setLogin,setShowEventModal,login,user } = useContext(GlobalContext);

  const headers = {
    "Content-Type": "application/json",
  };

  const userLogin = async () => {
    try {
      // await axios.post(
      //   "http://localhost:2000/login",
      //   {
      //     name: googleuser.displayName,
      //     email: "t@t.com",
      //     photo: googleuser.photoURL,
      //   },
      //   { headers }
      // );
      console.log("User login successful");
      setLogin(true);
      setShowEventModal(false);
       // Updates context login status
    } catch (err) {
      console.error("Error logging in user:", err);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const guser = result.user;
      setgoogleuser(guser);

      // Update user in context
      setuser({
        name: guser.displayName,
        email: guser.email,
        photo: guser.photoURL,
      });

      // Call userLogin to save to the database and set login status
      userLogin();
    } catch (error) {
      console.error("Error during login", error);
      alert("Failed to login. Please try again.");
    }
  };

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month()
    );
  }

  return (
    <div className="flex flex-row justify-between">
      <header className="px-4 py-2 flex items-center">
        <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
            </svg>
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            <svg focusable="false" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></path>
            </svg>
          </span>
        </button>
        <h2 className="ml-4 text-xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </header>
      {!login &&<button onClick={googleLogin} className="p-4">
        Login with Google
      </button>}
      {
        login && <h1 className="p-7" >{user.name} </h1>
      }
    </div>
  );
}
