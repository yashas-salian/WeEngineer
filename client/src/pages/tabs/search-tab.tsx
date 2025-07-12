import {  useState } from "react"
import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge, Calendar, Download, Eye, FileText, Filter, Grid3X3, List, MoreVertical, NotebookTabs, Trash2, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getPdfs } from "../../hooks/use-pdf"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import logo from "../../images/WeE_logo.png"
import { Link } from "react-router-dom"
import { FlipWords } from "@/components/ui/flip-words"
import { Form } from "@/components/form"
import { toast, ToastContainer } from "react-fox-toast"
import axios from "axios"

interface SearchSchema {
  college_name : string
  year : string
  Examtype : string
}
interface data{
    ID : string,
    college_name : string,
    pdf_name : string,
    year : string,
    Examtype : string,
    Url : string,
    secure_Url : string,
    size : number,
    subject_name : string
}
export const Search = () =>{
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [currentPage , setCurrentPage] = useState(1)
    const [postsPerPage , setPostsPerPage] = useState(4)
    const lastPostIndex = currentPage * postsPerPage
    const firstPageIndex = lastPostIndex - postsPerPage
    const [pdf , setpdf] = useState<data[]>([])
    const totalPages = Math.ceil(pdf.length / postsPerPage);
    const paginatedPdf = pdf.slice(firstPageIndex,lastPostIndex)
    const blockPerPage = 4
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [search , setSearch] = useState<SearchSchema>({
      college_name : "",
      year : "",
      Examtype : ""
    })
    const [filter , setFilter] = useState(false)
    const words = ['PDfs' , 'Notes' , 'PYQs']

    const getVisiblePages = () => {
      let tempPages = []
      let maxBlocks = Math.min(currentPage + blockPerPage, totalPages)

      if(totalPages <= blockPerPage){
        for (let i = 1; i <= maxBlocks; i++){
          tempPages.push(i)
        }
      }
      else{
        if(currentPage == 1){
          for (let i = 1; i <= maxBlocks; i++){
            tempPages.push(i)
          }
        }
        else if(currentPage == 2){
          for (let i = 1; i <= maxBlocks - 1; i++){
            tempPages.push(i)
          }
        }
        else if(maxBlocks - currentPage  < blockPerPage){
          for (let i = maxBlocks - blockPerPage; i <= maxBlocks; i++){
            tempPages.push(i)
          }
        }
        else if (currentPage > 2){
          for (let i = currentPage - 2; i < maxBlocks - 1; i++){
            tempPages.push(i)
          }
        }
      }
      return tempPages
    }
    const handleSubmit = async() =>{
    if(search.Examtype === "" && search.college_name === "" && search.year === ""){
        toast.error('Atleast select a single field',{
            position : 'top-center'
        })
    }
    else if(search.Examtype === "" && search.college_name != "" && search.year === ""){
      const response = await axios.get(`http://127.0.0.1:8787/get-pdf-for-college?college_name=${search.college_name}`)

      if (response.data.message == "No pdf with college name found"){
        toast.error("No Pdf found",{
          position : 'top-center'
        })
      }
      else if (response.data.message == "Pdf's found"){
        toast.success("Pdf found",{
          position : 'top-center'
        })
        setpdf(response.data.data)
      }
    }
    else if(search.Examtype === "" && search.college_name != "" && search.year != ""){
      const response = await axios.get(`http://127.0.0.1:8787/get-pdf-for-college-and-year?college_name=${search.college_name}&year=${search.year}`)

      if (response.data.message == "No pdf with college name and exam year found"){
        toast.error("No pdf with college name and exam year found",{
          position : 'top-center'
        })
      }
      else if (response.data.message == "Pdf's found"){
        toast.success("Pdf found",{
          position : 'top-center'
        })
        setpdf(response.data.data)
      }
    }
    else if(search.Examtype != "" && search.college_name != "" && search.year === ""){
      const response = await axios.get(`http://127.0.0.1:8787/get-pdf-for-college-and-exam-type?college_name=${search.college_name}&Examtype=${search.Examtype}`)

      if (response.data.message == "No pdf with college name and exam-type found"){
        toast.error("No pdf with college name and exam year found",{
          position : 'top-center'
        })
      }
      else if (response.data.message == "Pdf's found"){
        toast.success("Pdf found",{
          position : 'top-center'
        })
        setpdf(response.data.data)
      }
    }
    else{
      const response = await axios.get(`http://127.0.0.1:8787/get-pdf-for-college-and-exam-type-and-year?college_name=${search.college_name}&Examtype=${search.Examtype}&year=${search.year}`)

      if (response.data.message == "No pdf with college name, year and exam-type found"){
        toast.error("No pdf with college name, year and exam-type found",{
          position : 'top-center'
        })
      }
      else if (response.data.message == "Pdf's found"){
        toast.success("Pdf found",{
          position : 'top-center'
        })
        setpdf(response.data.data)
      }
    }
    }

    return <div className={cn("z-10 h-full overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out" , sidebarOpen ? "w-[calc(100vw-1rem)]" : "w-[calc(100vw-18rem)]")}>
              <ToastContainer/>
                <div className="bg-black border border-white  rounded-4xl grid grid-cols-3 p-4 m-4 gap-x-120">
                    <div className="col-span-1 relative mt-2">
                        <SidebarTrigger className="text-4xl" onClick={()=>{
                          setSidebarOpen(prev => !prev)
                        }}/>
                    </div>
                    {/* <div className="col-span-1"></div> */}
                    <div className="col-span-1 items-center text-gray-200 font-semibold text-4xl">
                      <div className="flex gap-x-2">
                        <img src={logo} alt="Logo" className="w-12 h-12"></img>
                        <p className="text-white">WeEnginner</p>
                      </div>
                    </div>
                    <div className={cn("col-span-1 pl-10" , sidebarOpen ? "" : "invisible")}>
                        {/* <div className="flex gap-x-2 justify-center pt-1"> */}
                            <div className="w-10 h-10 rounded-full border border-gray-200"><User className="mt-1.5 ml-1.5"/></div>
                            {/* <div className="">Profile</div> */}
                        {/* </div> */}
                    </div>
                </div>
        <div className="">
            <div className="w-full max-w-4xl">
      <div className="bg-black p-8">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white leading-tight">
              Discover amazing <FlipWords words={words} />
              <span className="text-white">.</span>
            </h1>
            <p className="text-gray-600 mt-2 text-lg">Use filters to find exactly what you're looking for</p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={() => setFilter((prev) => !prev)}
              className={`
                group relative overflow-hidden rounded-xl px-6 py-3 
                transition-all duration-300 ease-out
                ${
                  filter
                    ? "bg-neutral-950 text-white"
                    : "bg-white text-gray-700"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Filter
                  className={`
                    w-5 h-5 transition-all duration-300
                    ${filter ? "text-white" : "text-gray-700 "}
                  `}
                />
                <span className="font-semibold text-sm uppercase tracking-wide">
                  {filter ? "Filters On" : "Filter"}
                </span>
              </div>

              <div
                className={`
                absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 
                transition-transform duration-300 ease-out
                ${filter ? "translate-x-0" : "translate-x-full"}
              `}
                style={{ zIndex: -1 }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
            {filter && 
                <div className="mb-10 pl-60 pr-30 ">
                    <Form search={search} setSearch={setSearch}/>
                    <div className="flex justify-end">
                      <button className="bg-white text-black font-semibold rounded-xl p-2" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>  
            }
            
        </div>
        {pdf.length === 0 ? (
          <Card className="ml-10 mr-10 mb-10 bg-neutral-950 border border-neutral-800">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground " />
              <h3 className="text-lg font-semibold mb-2 text-white">No files found</h3>
              <p className="text-muted-foreground">
                   Try adjusting your search or filter criteria
              </p>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
           <div className="space-y-10 mb-10"> 
           <div className="">
            <div className="pl-20 text-3xl font-semibold"><TextHoverEffect text="Behold our library of knowledge"/></div>
            <div className="space-x-2 ml-300">
                    <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                    <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={() => setViewMode("list")}>
                    <List className="h-4 w-4" />
                    </Button>
            </div>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-10 mr-10 ">
            
            {paginatedPdf?.map((file,index) => (
              <Link to={file.secure_Url}>
              <Card key={index} className="group bg-neutral-950 border border-neutral-800 text-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <iframe 
                      src = {`${file.secure_Url}#page=1`}
                      height={"500px"}
                      >
                    </iframe>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2" title={file.pdf_name}>
                      {file.pdf_name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} Mb</span>

                      <Badge className="text-xs">
                        {file.college_name}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {file.year}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <NotebookTabs className="h-3 w-3 mr-1" />
                      {file.Examtype}
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
          </div>
        ) : (
            <div className="space-y-10 mb-10">
                <div className="">
            <div className="pl-20 text-3xl font-semibold"><TextHoverEffect text="Behold our library of knowledge"/></div>
            <div className="space-x-2 ml-300">
                    <Button size="sm" onClick={() => setViewMode("grid")}>
                    <Grid3X3 className="h-4 w-4" />
                    </Button>
                    <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                    <List className="h-4 w-4" />
                    </Button>
            </div>
            </div>
          <div className="ml-10 mr-10 space-y-2 ">
            {paginatedPdf?.map((file,index) => (
              <Link to={file.secure_Url}>
              <Card key={index} className="bg-neutral-950 border border-neutral-800 text-white hover:shadow-sm transition-shadow mb-2">
                <CardContent className="p-4 ">
                  <div className="flex items-center space-x-4 ">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <iframe 
                          src = {`${file.secure_Url}#page=1`}
                           width={"60px"}
                          height={"50px"}
                        >
                        </iframe>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{file.pdf_name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>{(file.size / (1024 * 1024)).toFixed(2)} Mb</span>
                        <span>•</span>
                        <span>{file.college_name}</span>
                        <span>•</span>
                        <span>{file.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge>{file.Examtype}</Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </Link>
            ))}
          </div>
          </div>
        )}
        {paginatedPdf.length !=0 &&
        <div className="flex justify-center mb-10">
          <Pagination >
            <PaginationContent>
              <PaginationItem >
                <PaginationPrevious onClick={()=>{
                  if(currentPage > 1){
                  setCurrentPage(currentPage-1)
                  }
                }} />
              </PaginationItem>
              {getVisiblePages().map((pageNumber, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={pageNumber === currentPage}
                  onClick={() => setCurrentPage(Number(pageNumber))}
                >
                  {Number(pageNumber)}
                </PaginationLink>
              </PaginationItem>
        ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={()=>{
                  if(currentPage < totalPages){
                  setCurrentPage(currentPage+1)
                  }
                }}/>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      }
            </div>
}

