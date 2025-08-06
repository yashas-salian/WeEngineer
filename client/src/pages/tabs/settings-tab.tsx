import { NavTabOptions } from "@/components/nav-tab"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { ToastContainer } from "react-fox-toast"
import { AccountTab } from "./account-tab"
import { AboutUsTab } from "./about-us-tab"
import { NavBar } from "@/components/navbar"

type settingstabStatus = "Account" | "Contact us" | "About us" | "Docs"
export const SettingsTab = () => {
    const [settingsTab , setSettingsTab] = useState<settingstabStatus>("Account")
    // const [sidebarOpen, setSidebarOpen] = useState(true) 
    return <div className={cn("bg-[#04152d] z-10 h-full w-full overflow-x-hidden overflow-y-auto transition-all duration-150")}>
                    <ToastContainer/>
                    <NavBar/> 
                <div data-aos="zoom-in">
                    <h1 className="font-bold text-3xl pt-6 pl-6">
                        Settings
                    </h1>
                    <div className="text-lg pt-2 pl-6">
                        Manage your account details here
                    </div>
                    <div className="pl-10 mt-6">
                        <NavTabOptions tab={settingsTab} setTab={setSettingsTab}/>
                    </div>
                    </div>  
                <div className="pt-6">
                    {settingsTab === "Account" && <AccountTab/>}
                </div>
                <div className="pt-6">
                    {settingsTab === "About us" && <AboutUsTab/>}
                </div>

           </div>
}