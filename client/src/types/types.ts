// export type SidebarProps = {
//   pageIndex: number;
//   sidebarClickHandler: (pageIndex: number) => void;
// };

// export type SidebarOptionProps = {
//   optionString: string;
//   isCurrentPage: boolean;
// };

// export type TitleProps = {
//   titleString: string;
// };
export type SidebarProps = {
  pageIndex: number;
  sidebarClickHandler: (pageIndex: number) => void;
  setIsLoggedIn: (loggedIn: boolean) => void; // Add setIsLoggedIn
};

export type SidebarOptionProps = {
  optionString: string;
  isCurrentPage: boolean;
};

export type InputFieldProps = {
  id: string;
  goalString: string;
  goalMet: boolean;
  targetValue: number;
  inputChangeHandler: (id: string, value: number) => void;
};

export type Goal = {
  _id: string;
  goal: string;
  value: number;
};

export type WorkoutPlan = {
  day: number;
  time: string;
  am: boolean;
  exercises: Exercise[];
};

export type Exercise = {
  name: string;
  type: string;
  muscle: string;
  equipment: string;
  difficulty: string;
  instructions: string;
};
