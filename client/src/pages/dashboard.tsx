import { useState } from "react"
import { Home } from "./tabs/home-tab"
import { Search }from "./tabs/search-tab"
import { Footer } from "@/components/footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, type tabStatus } from "@/components/ui/app-sidebar"
import QuizTab from "./tabs/Quiz-tab"
import { EngineeringMachine } from "@/components/simple-cogs"
import { SettingsTab } from "./tabs/settings-tab"
import { AddEventTab } from "./tabs/add-event-tab"

// Create a wrapper component to access sidebar context
function DashboardContent() {
  const [tab, setTab] = useState<tabStatus>("Home")
  const [loading, setLoading] = useState(false)
  // const { open } = useSidebar() // Access sidebar state

  if (loading) {
    return (
      <div className="flex justify-center bg-[#04152d]">
        <EngineeringMachine />
      </div>
    )
  }

  return (
    <div className="flex relative bg-[#04152d] w-screen min-h-screen overflow-hidden transition-all duration-300">
      <AppSidebar tab={tab} setTab={setTab} />
      <SidebarInset className="flex-1 w-full min-w-0 overflow-x-hidden">
        {tab === "Home" && (
          <Home 
            setLoading={setLoading} 
          />
        )}
        {tab === "Search" && (
          <Search/>
        )}
        {tab === "Quiz" && (
          <QuizTab/>
        )}
        {tab === "Settings" && (
          <SettingsTab />
        )}
        {tab === "Calender" && (
          <AddEventTab />
        )}
        <Footer />
      </SidebarInset>
    </div>
  )
}

export const Dashboard = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <DashboardContent />
    </SidebarProvider>
  )
}