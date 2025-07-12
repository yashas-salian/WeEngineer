import { FileUpload } from "@/components/ui/file-upload"
import {  useState } from "react"
import axios from "axios"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge,  BookOpen, Calendar, Download, Eye, FileText, Grid3X3, List, MoreVertical, NotebookTabs, Trash2, TrendingUp, User, Users } from "lucide-react"
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
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"

export const Home = () =>{
    type uploadStatus = "idle" | "uploading" | "error" | "success"
    const [files , setFiles] = useState<File[]>([]);
    const [status , setStatus] = useState< uploadStatus >("idle")
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [currentPage , setCurrentPage] = useState(1)
    const [postsPerPage , setPostsPerPage] = useState(4)
    const lastPostIndex = currentPage * postsPerPage
    const firstPageIndex = lastPostIndex - postsPerPage
    const { pdf } = getPdfs()
    const totalPages = Math.ceil(pdf.length / postsPerPage);
    const paginatedPdf = pdf.slice(firstPageIndex,lastPostIndex)
    const blockPerPage = 4
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [showStats, setShowStats] = useState(true)

    const stats = {
      totalFiles: pdf.length,
      totalDownloads: 1247,
      activeUsers: 89,
      weeklyGrowth: 12.5,
    }

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
    const handleOnUploadChange = (files: File[]) =>{
            setFiles(files)
        // console.log(files)
    }
    const handleOnUploadSubmit = async () =>{
        if (!files) return

        setStatus("uploading")
        const formData = new FormData()
        formData.append("file" , files[0])
        formData.append("year","2025-2026")
        formData.append("Examtype","Normal")
        formData.append("college_name","Aissms ioit")
        try {
            const response = await axios.post("http://127.0.0.1:8787/upload", formData)
            setStatus("success")
            console.log(response)
        } catch (error) {
            setStatus("error")
        }
        
    }


    return <div className={cn("z-10 h-full overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out" , sidebarOpen ? "w-[calc(100vw-18rem)]" : "w-[calc(100vw-1rem)]")}>
                <div className="bg-black border border-neutral-800  rounded-4xl grid grid-cols-3 p-4 m-4 gap-x-120">
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
                    <div className={cn("col-span-1 pl-10" , sidebarOpen ? "invisible" : "")}>
                        {/* <div className="flex gap-x-2 justify-center pt-1"> */}
                            <div className="bg-white w-10 h-10 rounded-full border border-gray-200"><User className="mt-1.5 ml-1.5 text-black"/></div>
                            {/* <div className="">Profile</div> */}
                        {/* </div> */}
                    </div>
                </div>
      <AnimatePresence>
//               {showStats && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-6 mb-8"
                >
                  <Card className="bg-neutral-950 border border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">Total Files</p>
                          <p className="text-3xl font-bold text-white">{stats.totalFiles}</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-950 border border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">PYQ's </p>
                          <p className="text-3xl font-bold text-white">{stats.totalDownloads}</p>
                        </div>
                        <Download className="h-8 w-8 text-white" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-950 border border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">Notes</p>
                          <p className="text-3xl font-bold text-white">{stats.activeUsers}</p>
                        </div>
                        <Users className="h-8 w-8 text-white" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-950 border border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm font-medium">Quiz</p>
                          <p className="text-3xl font-bold text-white">{stats.weeklyGrowth}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
                <div className="text-3xl font-bold pt-10 pb-5 pl-12 text-white">Contribute to our library </div>
                <div className={cn("relative pt-0.5 pb-0.5 pr-1.5 mx-6 mb-20 rounded-lg transition-all duration-300 ease-in-out", sidebarOpen ? "w-[calc(100vw-20rem)]" : "w-[calc(100vw-4rem)]")}>                      
                  <div className="relative m-[2px] flex flex-col w-full gap-y-4 bg-neutral-950 border border-neutral-800 rounded-xl p-6 text-white shadow-lg rounded-lg pb-6 pt-6">
                     <div className="flex justify-center">
                      <div className="w-1/2">
                      <FileUpload onChange={handleOnUploadChange} />
                    </div>
                      </div> 
                    
                    {files[0] && status !== "uploading" && (
                      <div className="flex justify-center gap-x-10">
                        <button
                          onClick={handleOnUploadSubmit}
                          className="bg-white hover:bg-gray-300 text-black px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Submit
                        </button>
                        
                      </div>
                    )}
                  </div>
                </div>

            <div className="pl-12 text-3xl font-bold pb-5">Our library</div>
      
                {pdf.length === 0 ? (
          <Card className="ml-10 mr-10 mb-10 bg-neutral-950 border border-neutral-800">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground " />
              <h3 className="text-lg font-semibold mb-2 text-white">No files found</h3>
              <p className="text-muted-foreground">
                   Try adjusting your search or filter criteria or Upload your first PDF to get started
              </p>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
           <div className="space-y-10 mb-10"> 
           <div className="">
            {/* <div className="pl-12 text-2xl font-bold">Our library</div> */}
            <div className="space-x-2 ml-300">
                    <Button className="bg-white" variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
                    <Grid3X3 className="h-4 w-4 text-black" />
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
                    <FileText className="h-12 w-12 text-muted-foreground" />
                    <div className="absolute top-2 right-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
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
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm line-clamp-2" title={file.pdf_name}>
                      {file.pdf_name}
                    </h3>
                    <div className="flex text-gray-400 items-center justify-between text-xs text-muted-foreground">
                      <span>2Mb</span>
                      <Badge className="text-xs">
                        {file.college_name}
                      </Badge>
                    </div>
                    <div className="flex text-gray-400 items-center text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {file.year}
                    </div>
                    <div className="flex text-gray-400 items-center text-xs text-muted-foreground">
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
            <div className="pl-20 text-3xl font-semibold">Behold our library of knowledge</div>
            <div className="space-x-2 ml-300">
                    <Button className="bg-black" size="sm" onClick={() => setViewMode("grid")}>
                    <Grid3X3 className="h-4 w-4 text-white" />
                    </Button>
                    <Button className="bg-white" variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                    <List className="h-4 w-4 text-black" />
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
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{file.pdf_name}</h3>
                      <div className="flex text-gray-400 items-center space-x-4 text-sm text-muted-foreground mt-1">
                        <span>2Mb</span>
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

