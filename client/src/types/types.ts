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
  id: number;
  goalString: string;
  goalMet: boolean;
  targetValue: number;
  inputChangeHandler: (id: number, value: number) => void;
};

export type Goal = {
  id: number;
  goalString: string;
  targetValue: number;
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