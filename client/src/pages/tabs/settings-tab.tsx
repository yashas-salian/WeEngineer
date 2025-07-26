import { NavTabOptions } from "@/components/nav-tab"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ToastContainer } from "react-fox-toast"
import { AccountTab } from "./account-tab"
import { AboutUsTab } from "./about-us-tab"
import { NavBar } from "@/components/navbar"

type tabStatus = "Account" | "Contact us" | "About us" | "Docs"
export const SettingsTab = () => {
    const [tab , setTab] = useState<tabStatus>("Account")
    const [sidebarOpen, setSidebarOpen] = useState(true) 
    return <div className={cn("bg-[#04152d] z-10 h-full w-full overflow-x-hidden overflow-y-auto transition-all duration-150" , sidebarOpen ? "w-[calc(100vw-16.5rem)]" : "w-[calc(100vw-0.5rem)]")}>
                    <ToastContainer/>
                    <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/> 
                <div data-aos="zoom-in">
                    <h1 className="font-bold text-3xl pt-6 pl-6">
                        Settings
                    </h1>
                    <div className="text-lg pt-2 pl-6">
                        Manage your account details here
                    </div>
                    <div className="pl-10 mt-6">
                        <NavTabOptions tab={tab} setTab={setTab}/>
                    </div>
                    </div>  
                <div className="pt-6">
                    {tab === "Account" && <AccountTab/>}
                </div>
                <div className="pt-6">
                    {tab === "About us" && <AboutUsTab/>}
                </div>

           </div>
}