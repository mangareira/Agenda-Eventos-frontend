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
            title: "Usuarios",
            path: "/dashboard/users",
            icon: <MdSupervisedUserCircle />,
          },
          {
            title: "Eventos",
            path: "/dashboard/events",
            icon: <MdEventNote />,
          },
          {
            title: "Transações",
            path: "/dashboard/transactions",
            icon: <MdAttachMoney />,
          },
        ],
      },
]