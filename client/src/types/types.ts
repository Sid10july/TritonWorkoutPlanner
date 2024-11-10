export type SidebarProps = {
  pageIndex: number;
  sidebarClickHandler: (pageIndex: number) => void;
};

export type SidebarOptionProps = {
  optionString: string;
  isCurrentPage: boolean;
};
