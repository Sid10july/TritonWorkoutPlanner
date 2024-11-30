import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // calendar library
import dayGridPlugin from "@fullcalendar/daygrid"; //month view
import timeGridPlugin from "@fullcalendar/timegrid"; //weekly and daily view
import {dummySchedule} from "../constants/constants";
import "./WorkoutCalendar.css";
import {gapi} from "gapi-script";

export const WorkoutCalendar = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID; 
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SCOPES = "https://www.googleapis.com/auth/calendar";

  // authenticate and initialize the Google Calendar API
  useEffect(() => {
    // load Google API client and initialize it
    const initClient = async () => {
      try {
        await gapi.load("client:auth2", async () => {
          try {
            await gapi.client.init({
              apiKey: API_KEY, //api key for authentication
              clientId: CLIENT_ID,
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
  }, [API_KEY, CLIENT_ID]);

  // Handle exporting events to Google Calendar
  const handleExport = async () => {
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
          className="export-button" onClick={handleExport}
        >
          Export to Google Calendar
        </button>
      </div>
    </div>
  );
};