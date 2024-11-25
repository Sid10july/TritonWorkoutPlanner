import React from "react";
import FullCalendar from "@fullcalendar/react"; // calendar library
import dayGridPlugin from "@fullcalendar/daygrid"; //month view
import timeGridPlugin from "@fullcalendar/timegrid"; //weekly and daily view
import {dummySchedule} from "../constants/constants";
import "./WorkoutCalendar.css";

export const WorkoutCalendar = () => {
  //map the dummy workout schedule to the event format used by FullCalendar 
  const events = dummySchedule.map((workout) => ({
    // title of the event is the workout title and workout time
    title: `${workout.title}`,
    start: workout.start, //start time
    end: workout.end, //end time
  }));

  //handles the event click
  const handleEventClick = (info: any) => {
    //send an alert with the event title and start and end times
    alert(`Event: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${info.event.end}`);
  };

  return (
    <div className="calendar-container">
      <h1 className="title-container">Workout Calendar</h1>
      <div className="content-container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]} //enable month view 
          initialView="dayGridMonth" //view set to month view
          events={events} //pass the events made with the dummy schedule
          eventClick={handleEventClick} //handle event clicks
          editable={false} //disable editing events
          headerToolbar={{
            left: "prev,next today", //navigation buttons 
            center: "title", //title of the calendar in the center
            //month, weekly, and day view buttons on the right
            right: "dayGridMonth,timeGridWeek,timeGridDay", 
          }}
        />
        <button
          className="export-button"
        >
          Export to Google Calendar
        </button>
      </div>
    </div>
  );
};