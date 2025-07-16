import { useState } from "react"
import { Home } from "./tabs/home-tab"
import { Search } from "./tabs/search-tab"
import { Footer } from "@/components/footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, type tabStatus } from "@/components/ui/app-sidebar"
import { QuizTab } from "./tabs/Quiz-tab"


export const Dashboard = () =>{
  const [tab, setTab] = useState<tabStatus>("Home")

return <div className="flex relative bg-black min-h-screen overflow-hidden transition-all duration-300">
                <SidebarProvider className="relative z-10 w-full">
                      <AppSidebar tab={tab} setTab={setTab}/>
                    <SidebarInset className="flex-1 min-w-0 overflow-hidden">
                    {/* <AnimatedBackground/> */}
      {tab == "Home" &&
      <Home/>
      }
      {
        tab == "Search" &&
        <Search/>
      }
      {
        tab == "Quiz" &&
        <QuizTab/>
      }
    <Footer/>

    </SidebarInset>
    </SidebarProvider>
    </div>
}


