import { useState } from "react";
import { Sidebar } from "../components/Sidebar";

export const Homepage = () => {
  const [pageIndex, setPageIndex] = useState(0);

  function handleSidebarClick(pageIndex: number) {
    setPageIndex(pageIndex);
  }

  return (
    <Sidebar pageIndex={pageIndex} sidebarClickHandler={handleSidebarClick} />
  );
};
