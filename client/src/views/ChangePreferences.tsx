// import React, { useState } from "react";
// import "./ChangePreferences.css";

// export const ChangePreferences: React.FC = () => {
//   const [goals, setGoals] = useState([
//     { goal: "Goal #1", value: 40 },
//     { goal: "Goal #2", value: 35 },
//     { goal: "Goal #3", value: 70 },
//   ]);
//   const [newGoal, setNewGoal] = useState({ goal: "", value: "" });

//   const handleAddGoal = () => {
//     if (newGoal.goal.trim() && newGoal.value) {
//       setGoals([...goals, { ...newGoal, value: parseInt(newGoal.value) }]);
//       setNewGoal({ goal: "", value: "" });
//     }
//   };

//   const handleInputChange = (index: number, field: string, value: string) => {
//     const updatedGoals = [...goals];
//     updatedGoals[index] = {
//       ...updatedGoals[index],
//       [field]: field === "value" ? parseInt(value) : value,
//     };
//     setGoals(updatedGoals);
//   };

//   return (
//     <div className="preferences-container">
//       {/* Title Section */}
//       <h1 className="title-container">Change Preferences</h1>

//       {/* Form Section */}
//       <div className="content-container">
//         <h2 className="preferences-subtitle">My Goals</h2>
//         <div className="goals-list">
//           {goals.map((goal, index) => (
//             <div className="goal-item" key={index}>
//               <input
//                 type="text"
//                 className="goal-input"
//                 value={goal.goal}
//                 onChange={(e) =>
//                   handleInputChange(index, "goal", e.target.value)
//                 }
//               />
//               <input
//                 type="number"
//                 className="value-input"
//                 value={goal.value}
//                 onChange={(e) =>
//                   handleInputChange(index, "value", e.target.value)
//                 }
//               />
//             </div>
//           ))}
//           <div className="goal-item">
//             <input
//               type="text"
//               className="goal-input"
//               placeholder="Goal"
//               value={newGoal.goal}
//               onChange={(e) => setNewGoal({ ...newGoal, goal: e.target.value })}
//             />
//             <input
//               type="number"
//               className="value-input"
//               placeholder="Value"
//               value={newGoal.value}
//               onChange={(e) =>
//                 setNewGoal({ ...newGoal, value: e.target.value })
//               }
//             />
//             <button className="add-button" onClick={handleAddGoal}>
//               +
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChangePreferences;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ChangePreferences.css";

interface Goal {
  _id: string; // Match the backend MongoDB's ObjectId
  goal: string;
  value: number;
}

interface ChangePreferencesProps {
  userId: string;
}

const ChangePreferences: React.FC<ChangePreferencesProps> = ({ userId }) => {
  const [goals, setGoals] = useState<Goal[]>([]); // State to hold the list of goals
  const [newGoal, setNewGoal] = useState(""); // State for the new goal's name
  const [newValue, setNewValue] = useState<number | "">(""); // State for the new goal's value

  // Fetch goals from the backend when the component mounts
  useEffect(() => {
    axios
      .get(`/api/goals/${userId}`)
      .then((response) => setGoals(response.data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, [userId]);

  // Function to add a new goal
  const addGoal = () => {
    if (!newGoal || newValue === "") return; // Ensure input is valid
    const newGoalData = {
      _id: Date.now().toString(),
      goal: newGoal,
      value: Number(newValue),
    }; // Temporary UI goal
    setGoals((prevGoals) => [...prevGoals, newGoalData]); // Add new goal to the UI
    setNewGoal(""); // Clear input fields
    setNewValue("");

    // Send the new goal to the backend
    axios
      .post(`/api/goals/${userId}`, { goal: newGoal, value: Number(newValue) })
      .then((response) => setGoals(response.data)) // Update UI with the response from the backend
      .catch((error) => console.error("Error adding goal:", error));
  };

  // Function to delete a goal
  const deleteGoal = (goalId: string) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal._id !== goalId)); // Remove the goal from UI
    // Send delete request to the backend
    axios
      .delete(`/api/goals/${userId}/${goalId}`)
      .then((response) => setGoals(response.data)) // Update UI with the response from the backend
      .catch((error) => console.error("Error deleting goal:", error));
  };

  return (
    <div className="change-preferences">
      {/* Title Section with Separator */}
      <div className="title-container">
        <h1 className="title">Change Preferences</h1>
      </div>

      {/* Goals Section */}
      <div className="goals-container">
        <h2>My Goals</h2>
        <div className="goals-list">
          {goals.map((goal) => (
            <div key={goal._id} className="goal-item">
              <input
                type="text"
                value={goal.goal}
                readOnly
                className="goal-input"
              />
              <input
                type="number"
                value={goal.value}
                readOnly
                className="goal-input"
              />
              <button
                className="delete-button"
                onClick={() => deleteGoal(goal._id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add Goal Section */}
        <div className="add-goal">
          <input
            type="text"
            placeholder="New Goal"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          />
          <input
            type="number"
            placeholder="Value"
            value={newValue}
            onChange={(e) =>
              setNewValue(e.target.value ? Number(e.target.value) : "")
            }
          />
          <button className="add-button" onClick={addGoal}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePreferences;
