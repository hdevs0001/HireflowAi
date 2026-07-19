export interface NavItem {
  label: string;
  href: string;
}
export const adminNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    label: "Candidates",
    href: "/admin/candidate",
  },
  {
    label: "Widgets",
    href: "/admin/widget",
  },
  {
    label: "User",
    href: "/admin/user",
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
  },
  {
    label: "Settings",
    href: "/admin/settings",
  },
];

export const hrNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/hr/dashboard",
  },
  {
    label: "Candidates",
    href: "/hr/candidate",
  },
  {
    label: "Interviews",
    href: "/hr/interviews",
  },
  {
    label: "Analytics",
    href: "/hr/analytics",
  },
];

export const superUserNav: NavItem[] = [
  {
    label: "Dashboard",
    href: "/superuser/dashboard",
  },
];
