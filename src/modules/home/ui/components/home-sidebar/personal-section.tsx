"use client";
import { ClapperboardIcon, HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const items = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
    auth: true,
  },
  {
    title: "Liked Videos",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All Playlists",
    url: "/playlists",
    icon: ListVideoIcon,
  },
  {
    title: "Brew Studio",
    url: "/studio",
    icon: ClapperboardIcon,
  },
];

export const PersonalSection = () => {
  const clerk = useClerk();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>You</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                asChild
                isActive={pathname === item.url} 
                onClick={(e) => {
                  if (!isSignedIn && item.auth) {
                    e.preventDefault();
                    return clerk.openSignIn();
                  }
                }}
              >
                <Link
                  href={item.url}
                  className={cn(
                    "flex items-center gap-4",
                    pathname === item.url
                      ? "!text-amber-950 dark:!text-amber-400"
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="size-5" />
                  <span className="text-sm">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
