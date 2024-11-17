export type SidebarProps = {
  pageIndex: number;
  sidebarClickHandler: (pageIndex: number) => void;
};

export type SidebarOptionProps = {
  optionString: string;
  isCurrentPage: boolean;
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
