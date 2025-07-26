import { cn } from "@/lib/utils"

type tabStatus = "Account" | "Contact us" | "About us" | "Docs"
export const NavTabOptions = ({tab , setTab} : {tab : tabStatus,setTab : React.Dispatch<React.SetStateAction<tabStatus>>} ) => {
    const options = ["Account" , "Contact us" , "About us" , "Docs"]
    return <div className="flex gap-x-10">
        {options.map((option ,index) =>(
            <button key={index} className={cn("rounded-3xl p-2", tab === option ? "bg-white text-[#04152d]" : "bg-[#030f22]" )}
                onClick={()=> setTab(option as tabStatus)}
            >
                {option}
            </button>
        ))}
    </div>
}

// bg-white text-[#04152d] 