import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // calendar library
import dayGridPlugin from "@fullcalendar/daygrid"; //month view
import timeGridPlugin from "@fullcalendar/timegrid"; //weekly and daily view
import {dummySchedule, Week} from "../constants/constants";
import "./WorkoutCalendar.css";
import {gapi} from "gapi-script";
import { WorkoutsContext } from "../context/workouts-context";

export const WorkoutCalendar = () => {
//   const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; 
//   const CLIENT_ID = "361860920175-262hlsv8v6khml2cpvu1iq8o7bpl8ni0.apps.googleusercontent.com"; 
//   const API_KEY = process.env.REACT_APP_API_KEY;
//   const API_KEY = "AIzaSyAvDYFYmUmHBBtqTVbegLgo0pLtCTcqTBs";
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  const {weeklyWorkouts} = useContext(WorkoutsContext);

  // authenticate and initialize the Google Calendar API
  useEffect(() => {
    // load Google API client and initialize it
    const initClient = async () => {
      try {
        await gapi.load("client:auth2", async () => {
          try {
            await gapi.client.init({
              apiKey: process.env.REACT_APP_API_KEY, //api key for authentication
              clientId: process.env.REACT_APP_CLIENT_ID,
              //discovery document for the Google Calendar API
              discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
              ],
              scope: SCOPES, //defines permissions scope for accessing user calendar
            });
            console.log("Google API client initialized");
          } catch (error) {
            console.error("Error initializing client:", error);
          }
        });
      } catch (error) {
        console.error("Error loading client:", error);
      }
    };
    initClient(); //initialize API client
  }, [process.env.REACT_APP_API_KEY, process.env.REACT_APP_CLIENT_ID]);

  // Handle exporting events to Google Calendar
  const handleExport = async () => {
    // console.log(events);
    const calendar = gapi.client.calendar; //google API client

    //prepare formatting for list of events from dummy schedule
    const events = dummySchedule.map((workout) => ({
      summary: workout.title, //workout title
      start: {
        //start time and timezone
        dateTime: new Date(workout.start).toISOString(),
        timeZone: "America/Los_Angeles",
      },
      end: {
        //end time and timezone
        dateTime: new Date(workout.end).toISOString(),
        timeZone: "America/Los_Angeles",
      },
    }));

    //check if the user is signed in
    const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    if (!isSignedIn) {
      try {
        //if not signed in, prompt the user to sign in
        await gapi.auth2.getAuthInstance().signIn();
      } catch (error) {
        console.error("Error signing in:", error);
        alert("Failed to sign in. Please try again.");
        return;
      }
    }

    try {
      //create a new calendar called "Workout Planner"
      const calendarResponse = await calendar.calendars.insert({
        resource: { summary: "Workout Planner" }, // Calendar name
      });
      
      // get ID of newly created calendar "Workout Planner"
      const calendarId = calendarResponse.result.id; 
    
      // add all the dummy events to the new calendar
      for (const event of events) {
        await calendar.events.insert({
          calendarId: calendarId,
          resource: event, //details of each event
        });
      }
      alert("Events successfully exported to a new Workout Planner calendar!");
    } catch (error) {
      console.error("Error inserting events into Google Calendar:", error);
      alert("Failed to export events. Please try again.");
    }
  };
  
  //map the dummy workout schedule to the event format used by FullCalendar 
  const dummyEvents = dummySchedule.map((workout) => ({
    // title of the event is the workout title and workout time
    title: `Something`,
    start: workout.start, //start time
    end: workout.end, //end time
  }));
  /**
   * The start and end times are jst  the times and do not have dates, so we have to pass the dates
   */
  const events = weeklyWorkouts
  .filter((workout)=>workout.startTime!==workout.endTime)
  .map((workout) => (
    {
    // title of the event is the workout title and workout time
    title: `${workout.day}'s workouts`, // day - 
    // start: `2024-12-${2+index}T1${workout.startTime}`, //start time - 2024-11-20T07:00:00
    // end: `2024-12-${2+index}T2${workout.endTime}`, //end time - 2024-11-20T09:00:00
    daysOfWeek: [`${Week.findIndex(x=>x===workout.day)}`],
    startTime: `${workout.startTime}:00`,
    endTime: `${workout.endTime}:00`,
    color: 'green',
    startRecur: '2024-11-30',
    endRecur: '2025-02-01'
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
          className="export-button" onClick={handleExport}
        >
          Export to Google Calendar
        </button>
      </div>
    </div>
  );
};