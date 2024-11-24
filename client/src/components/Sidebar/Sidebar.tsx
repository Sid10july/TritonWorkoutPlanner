// // // import { useState } from "react";
// // // import { Link } from "react-router-dom";
// // // import { SidebarProps } from "../../types/types";
// // // import { SidebarOption } from "./SidebarOption";
// // // import { dummyProfileData } from "../../constants/constants";
// // // import "./Sidebar.css";

// // // const optionStrings = [
// // //   { str: "Start Workout", path: "/" },
// // //   { str: "My Workouts", path: "/workout-planner" },
// // //   { str: "Exercise Library", path: "/exercise-library" },
// // //   { str: "Track Progress", path: "/" },
// // //   { str: "Change Preferences", path: "/" },
// // // ];

// // // export const Sidebar = (props: SidebarProps) => {
// // //   const [openLogout, setOpenLogout] = useState(false);

// // //   return (
// // //     <div className="sidebar">
// // //       <div className="sidebar-container pt-3">
// // //         <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
// // //         {optionStrings.map((option, id: number) => {
// // //           return (
// // //             <Link
// // //               to={option.path}
// // //               key={id}
// // //               className="sidebar-option"
// // //               onClick={() => props.sidebarClickHandler(id)}
// // //             >
// // //               <SidebarOption
// // //                 optionString={option.str}
// // //                 isCurrentPage={id === props.pageIndex}
// // //               />
// // //             </Link>
// // //           );
// // //         })}
// // //         <div
// // //           className="sidebar-account"
// // //           onClick={() => {
// // //             setOpenLogout(!openLogout);
// // //           }}
// // //         >
// // //           <img
// // //             src="/account_circle.png"
// // //             alt="profile icon"
// // //             className="sidebar-profile_icon"
// // //           ></img>
// // //           <p className="mb-0">
// // //             {dummyProfileData.username} (Streak 🔥: {dummyProfileData.streak})
// // //           </p>
// // //           <img
// // //             src="/arrow_drop_up.png"
// // //             alt="dropdown icon"
// // //             className="sidebar-dropdown_icon"
// // //           ></img>
// // //         </div>
// // //         {openLogout ? (
// // //           <div className="sidebar-logout">
// // //             <p
// // //               className="text-center mb-0 text-danger"
// // //               onClick={() => {
// // //                 // Will redirect user to the login page
// // //               }}
// // //             >
// // //               Log Out
// // //             </p>
// // //           </div>
// // //         ) : null}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;
// // import { useState } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { SidebarProps } from "../../types/types";
// // import { SidebarOption } from "./SidebarOption";
// // import { dummyProfileData } from "../../constants/constants";
// // import "./Sidebar.css";

// // const optionStrings = [
// //   { str: "Start Workout", path: "/" },
// //   { str: "My Workouts", path: "/workout-planner" },
// //   { str: "Exercise Library", path: "/exercise-library" },
// //   { str: "Track Progress", path: "/track-progress" },
// //   { str: "Change Preferences", path: "/change-preferences" },
// // ];

// // export const Sidebar = (props: SidebarProps) => {
// //   const [openLogout, setOpenLogout] = useState(false);
// //   const navigate = useNavigate();

// //   return (
// //     <div className="sidebar">
// //       <div className="sidebar-container pt-3">
// //         <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
// //         {optionStrings.map((option, id: number) => {
// //           return (
// //             <NavLink
// //               to={option.path}
// //               key={id}
// //               className={({ isActive }) =>
// //                 isActive
// //                   ? "sidebar-option sidebar-option-active"
// //                   : "sidebar-option"
// //               }
// //               onClick={() => props.sidebarClickHandler(id)}
// //             >
// //               <SidebarOption
// //                 optionString={option.str}
// //                 isCurrentPage={id === props.pageIndex}
// //               />
// //             </NavLink>
// //           );
// //         })}
// //         <div
// //           className="sidebar-account"
// //           onClick={() => {
// //             setOpenLogout(!openLogout);
// //           }}
// //         >
// //           <img
// //             src="/account_circle.png"
// //             alt="profile icon"
// //             className="sidebar-profile_icon"
// //           ></img>
// //           <p className="mb-0">
// //             {dummyProfileData.username} (Streak 🔥: {dummyProfileData.streak})
// //           </p>
// //           <img
// //             src="/arrow_drop_up.png"
// //             alt="dropdown icon"
// //             className="sidebar-dropdown_icon"
// //           ></img>
// //         </div>
// //         {openLogout ? (
// //           <div className="sidebar-logout">
// //             <p
// //               className="text-center mb-0 text-danger"
// //               onClick={() => {
// //                 navigate("/login"); // Redirect to login page on logout
// //               }}
// //             >
// //               Log Out
// //             </p>
// //           </div>
// //         ) : null}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// // import { useState } from "react";
// // import { NavLink, useNavigate } from "react-router-dom";
// // import { SidebarProps } from "../../types/types";
// // import { SidebarOption } from "./SidebarOption";
// // import { dummyProfileData } from "../../constants/constants";
// // import "./Sidebar.css";

// // const optionStrings = [
// //   { str: "Start Workout", path: "/" },
// //   { str: "My Workouts", path: "/workout-planner" },
// //   { str: "Exercise Library", path: "/exercise-library" },
// //   { str: "Track Progress", path: "/track-progress" },
// //   { str: "Change Preferences", path: "/change-preferences" },
// // ];

// // export const Sidebar = (props: SidebarProps) => {
// //   const [openLogout, setOpenLogout] = useState(false);
// //   const navigate = useNavigate();

// //   return (
// //     <div className="sidebar">
// //       <div className="sidebar-container pt-3">
// //         <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
// //         {optionStrings.map((option, id: number) => {
// //           return (
// //             <NavLink
// //               to={option.path}
// //               key={id}
// //               className={({ isActive }) =>
// //                 isActive
// //                   ? "sidebar-option sidebar-option-active"
// //                   : "sidebar-option"
// //               }
// //               onClick={() => props.sidebarClickHandler(id)}
// //             >
// //               <SidebarOption
// //                 optionString={option.str}
// //                 isCurrentPage={id === props.pageIndex}
// //               />
// //             </NavLink>
// //           );
// //         })}
// //         <div
// //           className="sidebar-account"
// //           onClick={() => {
// //             setOpenLogout(!openLogout);
// //           }}
// //         >
// //           <img
// //             src="/account_circle.png"
// //             alt="profile icon"
// //             className="sidebar-profile_icon"
// //           ></img>
// //           <p className="mb-0">
// //             {dummyProfileData.username} (Streak 🔥: {dummyProfileData.streak})
// //           </p>
// //           <img
// //             src="/arrow_drop_up.png"
// //             alt="dropdown icon"
// //             className="sidebar-dropdown_icon"
// //           ></img>
// //         </div>
// //         {openLogout ? (
// //           <div className="sidebar-logout">
// //             <p
// //               className="text-center mb-0 text-danger"
// //               onClick={() => {
// //                 navigate("/login"); // Redirect to login page on logout
// //               }}
// //             >
// //               Log Out
// //             </p>
// //           </div>
// //         ) : null}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// import { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { SidebarProps } from "../../types/types";
// import { SidebarOption } from "./SidebarOption";
// import { dummyProfileData } from "../../constants/constants";
// import "./Sidebar.css";

// const optionStrings = [
//   { str: "Start Workout", path: "/" },
//   { str: "My Workouts", path: "/workout-planner" },
//   { str: "Exercise Library", path: "/exercise-library" },
//   { str: "Track Progress", path: "/track-progress" },
//   { str: "Change Preferences", path: "/change-preferences" },
// ];

// export const Sidebar = (props: SidebarProps) => {
//   const [openLogout, setOpenLogout] = useState(false);

//   return (
//     <div className="sidebar">
//       <div className="sidebar-container pt-3">
//         <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
//         {optionStrings.map((option, id: number) => (
//           <NavLink
//             to={option.path}
//             key={id}
//             className={({ isActive }) =>
//               isActive
//                 ? "sidebar-option sidebar-option-active"
//                 : "sidebar-option"
//             }
//             onClick={() => props.sidebarClickHandler(id)}
//           >
//             <SidebarOption
//               optionString={option.str}
//               isCurrentPage={id === props.pageIndex}
//             />
//           </NavLink>
//         ))}
//         <div
//           className="sidebar-account"
//           onClick={() => {
//             setOpenLogout(!openLogout);
//           }}
//         >
//           <img
//             src="/account_circle.png"
//             alt="profile icon"
//             className="sidebar-profile_icon"
//           ></img>
//           <p className="mb-0">
//             {dummyProfileData.username} (Streak 🔥: {dummyProfileData.streak})
//           </p>
//           <img
//             src="/arrow_drop_up.png"
//             alt="dropdown icon"
//             className="sidebar-dropdown_icon"
//           ></img>
//         </div>
//         {openLogout && (
//           <div className="sidebar-logout">
//             <p
//               className="text-center mb-0 text-danger"
//               onClick={() => {
//                 window.location.href = "/login"; // Redirect to login page
//               }}
//             >
//               Log Out
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { SidebarOption } from "./SidebarOption";
// import { SidebarProps } from "../../types/types";
// import { dummyProfileData } from "../../constants/constants";
// import "./Sidebar.css";

// const optionStrings = [
//   { str: "Start Workout", path: "/" },
//   { str: "My Workouts", path: "/workout-planner" },
//   { str: "Exercise Library", path: "/exercise-library" },
//   { str: "Track Progress", path: "/" },
//   { str: "Change Preferences", path: "/change-preferences" },
// ];

// export const Sidebar = (props: SidebarProps) => {
//   const [openLogout, setOpenLogout] = useState(false);

//   return (
//     <div className="sidebar">
//       <div className="sidebar-container pt-3">
//         <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
//         {optionStrings.map((option, id: number) => {
//           return (
//             <Link
//               to={option.path}
//               key={id}
//               className="sidebar-option"
//               onClick={() => props.sidebarClickHandler(id)}
//             >
//               <SidebarOption
//                 optionString={option.str}
//                 isCurrentPage={id === props.pageIndex}
//               />
//             </Link>
//           );
//         })}
//         <div
//           className="sidebar-account"
//           onClick={() => {
//             setOpenLogout(!openLogout);
//           }}
//         >
//           <img
//             src="/account_circle.png"
//             alt="profile icon"
//             className="sidebar-profile_icon"
//           ></img>
//           <p className="mb-0">
//             {dummyProfileData.username} 🔥: {dummyProfileData.streak}
//           </p>
//           <img
//             src="/arrow_drop_up.png"
//             alt="dropdown icon"
//             className="sidebar-dropdown_icon"
//           ></img>
//         </div>
//         {openLogout ? (
//           <div className="sidebar-logout">
//             <p
//               className="text-center mb-0 text-danger"
//               onClick={() => {
//                 // Will redirect user to the login page
//               }}
//             >
//               Log Out
//             </p>
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.tsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SidebarProps } from "../../types/types"; // Ensure SidebarProps includes setIsLoggedIn
import { SidebarOption } from "./SidebarOption";
import { dummyProfileData } from "../../constants/constants";
import "./Sidebar.css";

const optionStrings = [
  { str: "Start Workout", path: "/" },
  { str: "My Workouts", path: "/workout-planner" },
  { str: "Exercise Library", path: "/exercise-library" },
  { str: "Track Progress", path: "/track-progress" },
  { str: "Change Preferences", path: "/change-preferences" },
];

export const Sidebar = (props: SidebarProps) => {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="sidebar-container pt-3">
        <p className="sidebar-title fs-2 mb-3">Triton Workout Planner</p>
        {optionStrings.map((option, id: number) => (
          <NavLink
            to={option.path}
            key={id}
            className={({ isActive }) =>
              isActive
                ? "sidebar-option sidebar-option-active"
                : "sidebar-option"
            }
            onClick={() => props.sidebarClickHandler(id)}
          >
            <SidebarOption
              optionString={option.str}
              isCurrentPage={id === props.pageIndex}
            />
          </NavLink>
        ))}
        <div
          className="sidebar-account"
          onClick={() => {
            setOpenLogout(!openLogout);
          }}
        >
          <img
            src="/account_circle.png"
            alt="profile icon"
            className="sidebar-profile_icon"
          />
          <p className="mb-0">
            {dummyProfileData.username} (Streak 🔥: {dummyProfileData.streak})
          </p>
          <img
            src="/arrow_drop_up.png"
            alt="dropdown icon"
            className="sidebar-dropdown_icon"
          />
        </div>
        {openLogout && (
          <div className="sidebar-logout">
            <p
              className="text-center mb-0 text-danger"
              onClick={() => {
                props.setIsLoggedIn(false); // Update authentication state
                navigate("/login"); // Redirect to login page
              }}
            >
              Log Out
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;