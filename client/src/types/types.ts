export type SidebarProps = {
  pageIndex: number;
  sidebarClickHandler: (pageIndex: number) => void;
};

export type SidebarOptionProps = {
  optionString: string;
  isCurrentPage: boolean;
};

export type TitleProps = {
  titleString: string;
};
