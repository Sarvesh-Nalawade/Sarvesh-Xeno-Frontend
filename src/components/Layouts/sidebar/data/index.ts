import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Orders",
        url: "/order",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Customers",
        url: "/customers",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Products",
        url: "/products",
        icon: Icons.HomeIcon,
        items: [],
      },
      {
        title: "Profile",
        url: "/profile",
        icon: Icons.User,
        items: [],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Authentication",
        icon: Icons.Authentication,
        items: [
          {
            title: "Sign In",
            url: "/auth/sign-in",
          },
        ],
      },
    ],
  },
];
