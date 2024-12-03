import { Exercise } from "../types/types";

export function WorkoutCard({
  workout,
  handleAddWorkout
}: {
  workout: Exercise;
  handleAddWorkout: (key: string) => void;
}) {

  
  return (
    <div className="col-sm-12">
      <div
        className="card"
        style={{
            margin: "10px auto", // Center the card horizontally
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "100%", // Ensure the card takes up the maximum width of its container
            maxWidth: "100%", // Prevent overflow beyond its container
          }}
      >
        <div className="card-body" style={{ textAlign: "left" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h5 className="card-title"><strong>{workout.name}</strong></h5>
            {/* <input type="checkbox" onChange={()=>handleCheck(workout.name)}/> */}
            <button
              className="btn btn-primary"
              onClick={() => handleAddWorkout(workout.name)}
            >
              Add
            </button>
          </div>
          <p className="card-text">
            <strong>Type:</strong> {workout.type}
          </p>
          <p className="card-text">
            <strong>Muscle:</strong> {workout.muscle}
          </p>
          <p className="card-text">
            <strong>Difficulty:</strong> {workout.difficulty}
          </p>
          {/* <ExpandableInstructions instructions={workout.instructions} /> */}
          {workout.instructions!=='' && 
          <p className="card-text">
            <strong>Instructions:</strong> {workout.instructions}
          </p>}
        </div>
      </div>
    </div>
  );
}

export function WorkoutsSelected({
  workout,
  handleDeleteWorkout,
}: {
  workout: Exercise;
  handleDeleteWorkout: (key: string) => void;
}) {
  // What is the type of handleDeleteWorkout function
  return (
    <li
      key={workout.name}
      className="list-group-item d-flex justify-content-between align-items-center border rounded mb-2 py-3 px-4 bg-white"
      style={{ width: "100%"}}
    >
      <div className="workout-details">
        <h5 className="mb-0">{workout.name}</h5>
        <small className="text-muted">{workout.muscle}</small>
      </div>
      <div>
        <span className={`badge badge-danger me-3 text-dark`}>
          {workout.difficulty}
        </span>
        <button
          onClick={() => handleDeleteWorkout(workout.name)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

function getBadgeClass(difficulty: string): string {
  switch (difficulty.toLowerCase()) {
    case "beginner":
      return "success";
    case "intermediate":
      return "warning";
    case "expert":
      return "danger";
    default:
      return "secondary";
  }
}
