import { NavTabOptions } from "@/components/nav-tab"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { User } from "lucide-react"
import { useState } from "react"
import { ToastContainer } from "react-fox-toast"
import logo from "../../images/WeE_logo.png"
import { AccountTab } from "./account-tab"

type tabStatus = "Account" | "Contact us" | "About us" | "Docs"
export const SettingsTab = () => {
    const [tab , setTab] = useState<tabStatus>("Account")
    const [sidebarOpen, setSidebarOpen] = useState(true) 
    return <div className={cn("bg-[#04152d] z-10 h-full w-full overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out" , sidebarOpen ? "w-[calc(100vw-16.5rem)]" : "w-[calc(100vw-0.5rem)]")}>
                    <ToastContainer/>
                    <div className="bg-[#04152d] border border-neutral-800 rounded-4xl grid grid-cols-3 p-4 m-4 gap-x-120">
                        <div className="bg-white col-span-1 fixed rounded-full mt-2 z-100">
                            <SidebarTrigger className="text-4xl text-black" onClick={()=>{
                              setSidebarOpen(prev => !prev)
                            }}/>
                        </div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1 items-center text-gray-200 font-semibold text-4xl">
                          <div className="flex gap-x-2">
                            <img src={logo} alt="Logo" className="w-12 h-12"></img>
                            <p className="text-white">WeEnginner</p>
                          </div>
                        </div>
                        <div className={cn("col-span-1 pl-10" , sidebarOpen ? "invisible" : "")}>
                            {/* <div className="flex gap-x-2 justify-center pt-1"> */}
                                <div className="bg-white w-10 h-10 rounded-full border border-gray-200"><User className="mt-1.5 ml-1.5 text-black"/></div>
                                {/* <div className="">Profile</div> */}
                            {/* </div> */}
                        </div>
                    </div>
                <div className="font-semibold text-3xl pt-6 pl-6">
                    Settings
                </div>
                <div className="text-lg pt-2 pl-6">
                    Manage your account details here
                </div>
                <div className="pl-10 mt-6">
                    <NavTabOptions tab={tab} setTab={setTab}/>
                </div>
                <div className="pt-6">
                    {tab === "Account" && <AccountTab/>}
                </div>

           </div>
}