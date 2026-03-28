import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    lable: "Dashboard",
    icons: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    lable: "Income",
    icons: LuWalletMinimal,
    path: "/income",
  },

   {
    id: "03",
    lable: "Expense",
    icons: LuHandCoins,
    path: "/expense",
  },

   {
    id: "04",
    lable: "LogOut",
    icons: LuLogOut,
    path: "logout",
  },
];
