import {
  FilePlusCorner,
  Group,
  Home,
  MailPlus,
  SquareUser,
  UserRoundPlus,
  Users,
} from "lucide-react";

export function getMainNavItems(): {
  title: string;
  href: string;
  icon: keyof typeof navIcons;
}[] {
  return [
    { title: "Dashboard", href: "/dashboard", icon: "home" },
    { title: "All Workspaces", href: "/workspaces", icon: "group" },
    { title: "Profile", href: "/profile", icon: "squareUser" },
  ];
}

export function getWorkspaceNavItems(workspaceId: string): {
  title: string;
  href: string;
  icon: keyof typeof navIcons;
}[] {
  return [
    {
      title: "Invites",
      href: `/workspaces/${workspaceId}/invites`,
      icon: "mailPlus",
    },
    {
      title: "Members",
      href: `/workspaces/${workspaceId}/members`,
      icon: "users",
    },
    {
      title: "New task",
      href: `/workspaces/${workspaceId}/new-task`,
      icon: "filePlusCorner",
    },
    {
      title: "Promote",
      href: `/workspaces/${workspaceId}/promote`,
      icon: "userRoundPlus",
    },
  ];
}

export function getMobileMainNavItems(): {
  title: string;
  href: string;
  icon: keyof typeof navIcons;
}[] {
  return [
    { title: "Dashboard", href: "/dashboard", icon: "home" },
    { title: "All Workspaces", href: "/workspaces", icon: "group" },
    { title: "Profile", href: "/profile", icon: "squareUser" },
  ];
}

export function getMobileWorkspaceNavItems(workspaceId: string): {
  title: string;
  href: string;
  icon: keyof typeof navIcons;
}[] {
  return [
    {
      title: "Invites",
      href: `/workspaces/${workspaceId}/invites`,
      icon: "mailPlus",
    },
    {
      title: "Members",
      href: `/workspaces/${workspaceId}/members`,
      icon: "users",
    },
    {
      title: "New task",
      href: `/workspaces/${workspaceId}/new-task`,
      icon: "filePlusCorner",
    },
    {
      title: "Promote",
      href: `/workspaces/${workspaceId}/promote`,
      icon: "userRoundPlus",
    },
  ];
}

export const navIcons = {
  home: Home,
  group: Group,
  squareUser: SquareUser,
  filePlusCorner: FilePlusCorner,
  mailPlus: MailPlus,
  userRoundPlus: UserRoundPlus,
  users: Users,
};
