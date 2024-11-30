import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function GenPage({ dayFocus }) {
    const [fileContents, setFileContents] = useState({}); // fileCont and func that updates fileCont
    const fetchFileContent = async (dayFocus) => {
      try { // error handling while getting file data
        if (dayFocus === '(unselected)') {
          return null; // don't display anything  
        }
        const response = await fetch(`/${dayFocus}.txt`);
        if (!response.ok) { // throw error if bad file
          throw new Error('File not found');
        }
        const text = await response.text();
        return text;
      } catch (error) { // handles error
        console.error(`Error fetching file for ${dayFocus}:`, error);
        return 'No content available for this day.';
      }
    };
    useEffect(() => {// run whenever dayFocus changes 
      const fetchData = async () => {
        const updatedContent = {};
        for (const wkday in dayFocus) {
            const focus4Day = dayFocus[wkday];
            // Fetch the content for the current day
            const content = await fetchFileContent(focus4Day);
            // Store the fetched content in the newFileContents object
            updatedContent[wkday] = content;
        }
        setFileContents(updatedContent);
      };
      fetchData();
    }, [dayFocus]); 
    /** displays generated workout based on editPg
     * access files with same name as dropdown options (eventually do thro API) exist with corresponding exercises
     * display specific exercises based on selected focus 
     * update display real time when focus is changed
    */
    return (
      <div className="genPg">
        <h1>Generated plan</h1>
        <div className="wkdays">
          {Object.keys(dayFocus).map((dayOfWeek) => {
            const focusForDay = dayFocus[dayOfWeek];
            return (
              <div key={dayOfWeek} className="day">
                <div className="day-label">{dayOfWeek}</div>
                <p>Focus: {focusForDay}</p>
                <div className="file-content">
                  <pre>{fileContents[dayOfWeek]}</pre>
                </div>
              </div>
            );
          })}
        </div>
        <Link to="/editPg">
          <button>Edit Plan</button>
        </Link>
      </div>
    );
  }

  export default GenPage;