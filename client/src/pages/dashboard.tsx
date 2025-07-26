import { useState } from "react"
import { Home } from "./tabs/home-tab"
import { Search } from "./tabs/search-tab"
import { Footer } from "@/components/footer"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar, type tabStatus } from "@/components/ui/app-sidebar"
import { QuizTab } from "./tabs/quiz-tab"
import { EngineeringMachine } from "@/components/simple-cogs"
import { SettingsTab } from "./tabs/settings-tab"
import { AddEventTab } from "./tabs/add-event-tab"



export const Dashboard = () =>{
  const [sidebarOpen, setSidebarOpen] = useState(true)  
  const [tab, setTab] = useState<tabStatus>("Home")
  const [loading, setLoading] = useState(false);
return loading ? <div className="flex justify-center bg-[#04152d]"><EngineeringMachine/></div> :
                  <div className="flex relative bg-[#04152d] min-h-screen overflow-hidden transition-all duration-300">
                    <SidebarProvider className="relative z-10 w-full">
                      <AppSidebar tab={tab} setTab={setTab}/>
                      <SidebarInset className="flex-1 min-w-0 overflow-hidden">
                          {tab == "Home" &&
                          <Home setLoading={setLoading} setTab={setTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                          }
                          {
                            tab == "Search" &&
                            <Search setTab={setTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                          }
                          {
                            tab == "Quiz" &&
                            <QuizTab setTab={setTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                          }
                          {
                            tab == "Settings" &&
                            <SettingsTab setTab={setTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                          }
                          {
                            tab == "Calender" &&
                            <AddEventTab setTab={setTab} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                          }
                        <Footer/>
                      </SidebarInset>
                    </SidebarProvider>
                      </div>
}


