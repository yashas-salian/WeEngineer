import { Calendar, Home, Search, Settings, TestTube } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"

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

export type tabStatus = "Home" | "Search" | "Quiz" | "Calender" | "Settings"

export function AppSidebar({
  tab,
  setTab,
}: {
  tab: tabStatus
  setTab: React.Dispatch<React.SetStateAction<tabStatus>>
}) {
  return (
    <Sidebar className="bg-[#030f22]" collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white group-data-[collapsible=icon]:hidden">WeE</h1>
          <SidebarTrigger className="text-white" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="text-white group-data-[collapsible=icon]:sr-only">
            Navigation
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={tab === item.title}
                    tooltip={item.title}
                    onClick={() => {
                      setTab(item.title as tabStatus)
                    }}
                  >
                    <a href={item.url} className={
                      tab === item.title 
                        ? "bg-white text-black hover:bg-white hover:text-black" 
                        : "text-white hover:bg-white/10"
                    }>
                      <item.icon className={tab === item.title ? "text-black" : "text-white"} />
                      <span className={tab === item.title ? "text-black" : "text-white"}>
                        {item.title}
                      </span>
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

export const SearchPage = () => {
  return (
    <SidebarProvider>
      <AppSidebar tab="Search" setTab={() => {}} />
      <Search />
    </SidebarProvider>
  )
}