export const dummyExercisesList = [
  { id: 1, name: "Deadlift" },
  { id: 2, name: "Chinup" },
  { id: 3, name: "Swiss Ball Leg Curl" },
  { id: 4, name: "Burpee" },
  { id: 5, name: "Pushup" },
];

// Last time user worked out
export const dummyLastWorkout = [11, 21, 2024];

export const dummyWorkoutPlans = [
  {
    // Note: Sunday - Saturday is represented as 0 - 6
    day: 6,
    time: "3:30",
    am: false,
    exercises: [
      {
        name: "Incline Hammer Curls",
        type: "strength",
        muscle: "biceps",
        equipment: "dumbbell",
        difficulty: "beginner",
        instructions:
          "Seat yourself on an incline bench with a dumbbell in each hand. You should pressed firmly against he back with your feet together. Allow the dumbbells to hang straight down at your side, holding them with a neutral grip. This will be your starting position. Initiate the movement by flexing at the elbow, attempting to keep the upper arm stationary. Continue to the top of the movement and pause, then slowly return to the start position.",
      },
      {
        name: "Wide-grip barbell curl",
        type: "strength",
        muscle: "biceps",
        equipment: "barbell",
        difficulty: "beginner",
        instructions:
          "Stand up with your torso upright while holding a barbell at the wide outer handle. The palm of your hands should be facing forward. The elbows should be close to the torso. This will be your starting position. While holding the upper arms stationary, curl the weights forward while contracting the biceps as you breathe out. Tip: Only the forearms should move. Continue the movement until your biceps are fully contracted and the bar is at shoulder level. Hold the contracted position for a second and squeeze the biceps hard. Slowly begin to bring the bar back to starting position as your breathe in. Repeat for the recommended amount of repetitions.  Variations:  You can also perform this movement using an E-Z bar or E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes.",
      },
    ],
  },
  {
    day: 2,
    time: "7:30",
    am: true,
    exercises: [
      {
        name: "EZ-Bar Curl",
        type: "strength",
        muscle: "biceps",
        equipment: "e-z_curl_bar",
        difficulty: "intermediate",
        instructions:
          "Stand up straight while holding an EZ curl bar at the wide outer handle. The palms of your hands should be facing forward and slightly tilted inward due to the shape of the bar. Keep your elbows close to your torso. This will be your starting position. Now, while keeping your upper arms stationary, exhale and curl the weights forward while contracting the biceps. Focus on only moving your forearms. Continue to raise the weight until your biceps are fully contracted and the bar is at shoulder level. Hold the top contracted position for a moment and squeeze the biceps. Then inhale and slowly lower the bar back to the starting position. Repeat for the recommended amount of repetitions.  Variations: You can also perform this movement using an E-Z attachment hooked to a low pulley. This variation seems to really provide a good contraction at the top of the movement. You may also use the closer grip for variety purposes.",
      },
      {
        name: "Zottman Curl",
        type: "strength",
        muscle: "biceps",
        equipment: "None",
        difficulty: "intermediate",
        instructions:
          "Stand up with your torso upright and a dumbbell in each hand being held at arms length. The elbows should be close to the torso. Make sure the palms of the hands are facing each other. This will be your starting position. While holding the upper arm stationary, curl the weights while contracting the biceps as you breathe out. Only the forearms should move. Your wrist should rotate so that you have a supinated (palms up) grip. Continue the movement until your biceps are fully contracted and the dumbbells are at shoulder level. Hold the contracted position for a second as you squeeze the biceps. Now during the contracted position, rotate your wrist until you now have a pronated (palms facing down) grip with the thumb at a higher position than the pinky. Slowly begin to bring the dumbbells back down using the pronated grip. As the dumbbells close your thighs, start rotating the wrist so that you go back to a neutral (palms facing your body) grip. Repeat for the recommended amount of repetitions.",
      },
      {
        name: "Biceps curl to shoulder press",
        type: "strength",
        muscle: "biceps",
        equipment: "dumbbell",
        difficulty: "beginner",
        instructions:
          "Begin in a standing position with a dumbbell in each hand. Your arms should be hanging at your sides with your palms facing forward. Look directly ahead, keeping your chest up, with your feet shoulder-width apart. This will be your starting position. Initiate the movement by flexing the elbows to curl the weight. Do not use momentum or flex through the shoulder, instead use a controlled motion. Execute the pressing movement by extending the arm, flexing and abducting the shoulder to rotate the arm as you press above your head. Pause at the top of the motion before reversing the movement to return to the starting position. Complete the desired number of repetitions before switching to the opposite side.",
      },
    ],
  },
];

export const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Note: JavaScript's date object maps 0-6 to Sunday - Saturday
export const daysOfWeekJS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const recommendedExercises = {
  cardio: ["Running", "Cycling", "Jump Rope"],
  strength: ["Push-Ups", "Squats", "Lunges"],
  flexibility: ["Yoga", "Stretching", "Pilates"],
};

export const dummyProfileData = {
  username: "John",
  streak: 3,
};

export const dummyExerciseGoals = [
  { id: 0, goalString: "Weight", targetValue: 150 },
  { id: 1, goalString: "One rep max bench", targetValue: 210 },
  { id: 2, goalString: "Pull-ups", targetValue: 25 },
];
