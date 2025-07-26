import logo from "../../public/WeE_logo.png"
import { SidebarTrigger } from "./ui/sidebar"
import { User } from "lucide-react"
import { cn } from "@/lib/utils"

export const NavBar = ({sidebarOpen , setSidebarOpen}:{sidebarOpen: boolean, setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {  
    return <div className={cn("bg-[#04152d] border border-neutral-800 rounded-4xl grid grid-cols-3 p-4 m-4" , sidebarOpen ? "w-[calc(100vw-18rem)]" : "w-[calc(100vw-2rem)]")}>
                <div className="bg-white col-span-1 fixed rounded-full mt-2 z-100">
                    <SidebarTrigger className="text-4xl text-black" onClick={()=>{
                        setSidebarOpen(prev => !prev)
                    }}/>
                </div>
                <div className="col-span-1"></div>
                <div className="col-span-1 items-center text-gray-200 font-semibold text-4xl">
                    <div className="flex justify-center gap-x-2">
                    <img src={logo} alt="Logo" className={cn("w-12 h-12 transition-all duration-400", sidebarOpen ? "w-10 h-10" : "")}></img>
                    <p className="text-white">WeEnginner</p>
                    </div>
                </div>
                <div className={cn("flex justify-end col-span-1 pl-10")}>
                        <div className="bg-white w-10 h-10 rounded-full border border-gray-200"><User className="mt-1.5 ml-1.5 text-black"/></div>
                </div>
            </div>
}