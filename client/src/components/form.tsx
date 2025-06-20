import { useState } from "react"

interface SearchSchema {
  college_name : string
  year : string
  Examtype : string
}

interface Selected{
    college_name : string
    year : string
    Examtype : string
}

export const Form = ({search , setSearch} : {search : SearchSchema , setSearch :React.Dispatch<React.SetStateAction<SearchSchema>>}) =>{
    const [selected , setSelected] = useState<Selected>({
        college_name : "" ,
        year : "" ,
        Examtype : "" 
    })
    const handleReset = () =>{
       const resetData = {
        college_name : "" ,
        year : "" ,
        Examtype : "" 
    }
        setSelected(resetData)
        setSearch(resetData)
}
    return <form className="p-4 border border-white bg-gradient-to-br from-[#0a0a0a] via-[#0d0d0d] to-[#000000] rounded-lg">
                <div className="grid grid-cols-4 text-xl w-full">
                    <div className="mb-2">
                    <select 
                    value={selected.college_name}
                    onChange={(e) =>{
                        setSearch((c)=>({
                            ...c,
                            college_name : e.target.value
                        }))
                        setSelected((prev) =>({
                            ...prev,
                            college_name : e.target.value
                        }))
                    }
                    }>
                        <option value="" disabled>College name</option>
                        <option className="text-black">Aissms ioit</option>
                        <option className="text-black">coep</option>
                        <option className="text-black">VIT</option>
                        <option className="text-black">PICT</option>
                    </select>
                    </div>
                    <div className="mb-2">
                    <select 
                    value={selected.year}
                    onChange={(e) =>{
                        setSearch((c)=>({
                            ...c,
                            year : e.target.value
                        }))
                        setSelected((prev) =>({
                            ...prev,
                            year : e.target.value
                        }))
                    }}>
                        <option value="" disabled>Year</option>
                        <option className="text-black">2025-2026</option>
                        <option className="text-black">2024-2025</option>
                        <option className="text-black">2023-2024</option>
                        <option className="text-black">2022-2023</option>
                    </select>
                    </div>
                    <div >
                    <select 
                    value={selected.Examtype}
                    onChange={(e) =>{
                        setSearch((c)=>({
                            ...c,
                            Examtype : e.target.value
                        }))
                        setSelected((prev) =>({
                            ...prev,
                            Examtype : e.target.value
                        }))
                    }}>
                        <option value="" disabled>Exam type</option>
                        <option className="text-black">Normal</option>
                        <option className="text-black">Re-Exam</option>
                    </select>
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleReset} className="text-xs">Reset</button>
                    </div>
                </div>
            </form>
}