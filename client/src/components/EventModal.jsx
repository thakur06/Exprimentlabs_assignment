import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
const headers = {
  "Content-Type": "application/json",
};

export default function EventModal() {
  const {
    showEventModal,
    setShowEventModal,
    daySelected,
    user,
    setLocator,
    locator
  } = useContext(GlobalContext);

  const eventdate = daySelected.format("YYYY-MM-DD");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(eventdate);
  const addevent = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

 
    let hash = 0;

    // Create a hash from the UUID string
    for (let i = 0; i < uuid.length; i++) {
        hash = (hash << 5) - hash + uuid.charCodeAt(i); // Use bitwise operations for hashing
        hash |= 0; // Convert to 32-bit integer
    }
  
    const id=Math.abs(hash)
    try {
      const response = await axios.post(
        "https://server-sigma-liard.vercel.app/addevent",
        {
          eventId: id,
          email: user.email,
          title: title,
          date: date,
          time: time,
          description: description,
        },
        { headers }
      );

      // Update the locator state and close the modal
      setLocator(!locator);
      setShowEventModal(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4" onSubmit={addevent}>
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <div>
            <button
              type="button" // Change type to "button" to prevent form submission
              onClick={() => {
                setShowEventModal(false);
              }}
            >
              <span className="material-icons-outlined font-semibold text-3xl text-red-600">
                X
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
          <div className="text-center text-gray-600 font-semibold text-3xl">Create event</div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />

        
            <input
              type="date"
              name="description"
              
              value={date}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="text"
              name="time"
              placeholder="Add time"
              value={time}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
