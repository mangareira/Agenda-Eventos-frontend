import { MdAnalytics, MdAttachMoney, MdDashboard, MdEventNote, MdHelpCenter, MdOutlineSettings, MdPeople, MdSupervisedUserCircle, MdWork } from "react-icons/md";
export const menuItems = [
    {
        title: "Pages",
        list: [
          {
            title: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard />,
          },
          {
            title: "Users",
            path: "/dashboard/users",
            icon: <MdSupervisedUserCircle />,
          },
          {
            title: "Events",
            path: "/dashboard/events",
            icon: <MdEventNote />,
          },
          {
            title: "Transactions",
            path: "/dashboard/transactions",
            icon: <MdAttachMoney />,
          },
        ],
      },
      {
        title: "User",
        list: [
          {
            title: "Settings",
            path: "/dashboard/settings",
            icon: <MdOutlineSettings />,
          },
          {
            title: "Help",
            path: "/dashboard/help",
            icon: <MdHelpCenter />,
          },
        ],
      },
]