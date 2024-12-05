import React, { useContext, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // calendar library
import dayGridPlugin from "@fullcalendar/daygrid"; //month view
import timeGridPlugin from "@fullcalendar/timegrid"; //weekly and daily view
import {dummySchedule, Week} from "../constants/constants";
import "./WorkoutCalendar.css";
import {gapi} from "gapi-script";
import { WorkoutsContext } from "../context/workouts-context";

export const WorkoutCalendar = () => {
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
    
    // Sign out any currently signed-in user
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance.isSignedIn.get()) {
      await authInstance.signOut();
    }

    // Prompt the user to sign in and choose an account
    await authInstance.signIn();

    const calendar = gapi.client.calendar; //google API client

    //prepare formatting for list of events from dummy schedule
    // const events = WeeklyWorkoutEvents.map((workout) => ({
    //   summary: workout.title, //workout title
    //   start: {
    //     //start time and timezone
    //     dateTime: new Date(workout.startTime).toISOString(),
    //     timeZone: "America/Los_Angeles",
    //   },
    //   end: {
    //     //end time and timezone
    //     dateTime: new Date(workout.endTime).toISOString(),
    //     timeZone: "America/Los_Angeles",
    //   },
    // }));

    const events = WeeklyWorkoutEvents.map((workout) => {
        // Parse the start and end times
        const [startHour, startMinute] = workout.startTime.split(':').map(Number);
        const [endHour, endMinute] = workout.endTime.split(':').map(Number);
    
        // Calculate the first occurrence based on startRecur and daysOfWeek
        const startDate = new Date(workout.startRecur);
        const firstOccurrenceDayIndex = parseInt(workout.daysOfWeek[0], 10);
        const dayDifference = (firstOccurrenceDayIndex - startDate.getDay() + 7) % 7;
        startDate.setDate(startDate.getDate() + dayDifference);
        startDate.setHours(startHour, startMinute, 0, 0);
    
        const endDate = new Date(startDate);
        endDate.setHours(endHour, endMinute, 0, 0);
    
        return {
          summary: workout.title, // Workout title
          start: {
            dateTime: startDate.toISOString(),
            timeZone: "America/Los_Angeles",
          },
          end: {
            dateTime: endDate.toISOString(),
            timeZone: "America/Los_Angeles",
          },
          recurrence: [
            `RRULE:FREQ=WEEKLY;BYDAY=${['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][firstOccurrenceDayIndex]};UNTIL=${new Date(
              workout.endRecur
            ).toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
          ],
        };
      });

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
        // List existing calendars to check if "Workout Planner" exists
        const calendarListResponse = await calendar.calendarList.list();
        const existingCalendar = calendarListResponse.result.items.find(
          (cal: any) => cal.summary === "Workout Planner"
        );
    
        let calendarId;
    
        if (existingCalendar) {
          // If calendar exists, use its ID
          calendarId = existingCalendar.id;
    
          // Optionally clear all existing events in this calendar
          const eventsListResponse = await calendar.events.list({
            calendarId,
            showDeleted: false,
            singleEvents: true,
            maxResults: 2500,
          });
    
          for (const existingEvent of eventsListResponse.result.items) {
            await calendar.events.delete({
              calendarId,
              eventId: existingEvent.id,
            });
          }
        } else {
          // If calendar does not exist, create a new one
          const calendarResponse = await calendar.calendars.insert({
            resource: { summary: "Workout Planner" },
          });
          calendarId = calendarResponse.result.id;
        }
    
        // Add all events to the calendar
        for (const event of events) {
          await calendar.events.insert({
            calendarId,
            resource: event,
          });
        }
    
        alert("Events successfully exported to the Workout Planner calendar!");
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
  const WeeklyWorkoutEvents = weeklyWorkouts
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
          events={WeeklyWorkoutEvents} //pass the events made with the dummy schedule
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