import { Calendar, Home,  Search, Settings, TestTube } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Quiz",
    url: "#",
    icon: TestTube,
  },
  {
    title: "Calender",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
export type tabStatus = "Home"  | "Search" | "Quiz" | "Calender" | "Settings"

export function AppSidebar({
  tab,
  setTab,
}: {
  tab: tabStatus
  setTab: React.Dispatch<React.SetStateAction<tabStatus>>
}) {
  return (
    <Sidebar className="bg-[#030f22]">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-4xl mb-10">WeE</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title as tabStatus}>
                  <SidebarMenuButton asChild onClick={()=>{
                    setTab(item.title as React.SetStateAction<tabStatus>)
                  }}>
                    <a href={item.url} className={tab == item.title ? "bg-white text-black" : ""}>
                      <item.icon className={tab == item.title ? "text-black" : "text-white"}/>
                      <span className={tab == item.title ? "text-black" : "text-white"}>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
