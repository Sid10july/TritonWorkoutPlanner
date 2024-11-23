import { Exercise } from "../types/types";

export function WorkoutCard({workout}: {workout:Exercise}){
    return (
        <div className="col-sm-12">
            <div
                className="card"
                style={{
                    margin: "10px",
                    padding: "15px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    width: "100%",
                }}
            >
                <div className="card-body">
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h5 className="card-title">{workout.name}</h5>
                        <input type="checkbox" />
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
                    <p className="card-text">
                        <strong>Instructions:</strong> {workout.instructions}
                    </p>
                </div>
            </div>
        </div>
    );
}