import { FileUpload } from "@/components/ui/file-upload"
import {  useEffect, useState } from "react"
import axios from "axios"
import { Badge, BookOpen, Calendar, Download, Eye, FileText, Grid3X3, List, MoreVertical, NotebookTabs, Sparkles, Trash2, Upload, } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Link } from "react-router-dom"
import Aos from "aos"
import 'aos/dist/aos.css';
import robot from "../../components/images/robot-image.png"
import { StatusCard } from "@/components/status-card"
import { toast, ToastContainer } from "react-fox-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import colleges from "../../data/college-data.json"
import subjects from "../../data/subjects-data.json"
import { NavBar } from "@/components/navbar"
import type { tabStatus } from "@/components/ui/app-sidebar"


export const Home = ({ setLoading , setTab , sidebarOpen, setSidebarOpen }: { setLoading: React.Dispatch<React.SetStateAction<boolean>>, setTab: React.Dispatch<React.SetStateAction<tabStatus>>,sidebarOpen: boolean, setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }) =>{
    type uploadStatus = "idle" | "uploading" | "error" | "success"
    interface uploadSchma {
      college_name : string,
      year : string,
      subject : string,
      exam_type : string
    }
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
    // const [sidebarOpen, setSidebarOpen] = useState(true)  
    const [uploadData , setUploadData] = useState<uploadSchma>({
      college_name : "",
      year : "",
      subject : "",
      exam_type : ""
    })
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
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
        if (uploadData.college_name === "" || uploadData.exam_type === "" || uploadData.subject === "" || uploadData.year === ""){
          toast.error("Please fill all the fields correctly",{
            position : "top-center"
          })
          return
        }
        setStatus("uploading")
        setLoading  (true)
        const formData = new FormData()
        formData.append("file" , files[0])
        formData.append("year", uploadData.year)
        formData.append("Examtype",uploadData.exam_type)
        formData.append("college_name",uploadData.college_name)
        formData.append("subject_name",uploadData.subject)
        try {
            const response = await axios.post("http://127.0.0.1:8787/upload", formData)
            console.log(response)
            if (response.data.Message === "file uploaded successfully"){
              setStatus("success")
              toast.success("File uploaded successfully",{
                position : "top-center"
              })
              setFiles([])
              // handleOnUploadChange(files)
            }
            if(response.data.Message === "Some error occured"){
              setStatus("error")
              toast.error("Some error occured",{
                position : "top-center"
              })
            }

        } catch (error) {
            setStatus("error")
        }
        finally{
          setLoading(false)
        }
        
    }
  useEffect(() => {
      Aos.init({
        duration: 1000,  
        once: true   
      });
    }, []);

    return (<div className={cn("bg-[#04152d] z-10 h-full w-full overflow-x-hidden overflow-y-auto transition-all duration-150" , sidebarOpen ? "w-[calc(100vw-0.5rem)]" : "w-[calc(100vw-16.5rem)]")}>
                <ToastContainer/>
                <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setTab={setTab}/> 
                <StatusCard/>

          <Card data-aos="fade-up" className="bg-[#030f22] mr-4 ml-4 overflow-hidden">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-2 p-8">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="h-8 w-8 text-blue-400" />
                      Hi! we are WeE
                    </h1>
                    <p className="text-lg text-slate-300 leading-relaxed">
                      At WeE, we make learning simple and accessible. We provide a platform where students can:
                    </p>
                  </div>

                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Upload and access Previous Year Questions (PYQs)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Share and read study notes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span>Attempt quizzes to test their knowledge</span>
                    </li>
                  </ul>

                  <p className="text-slate-400 italic">
                    Whether you're preparing for exams or revising key concepts, WeE is here to support your academic
                    journey.
                  </p>
                </div>
              </div>

              <div className="col-span-1 flex justify-end">
              <div className="col-span-1 w-50 flex justify-end mt-20 mr-4 bg-[#19376d] rounded-full animate-bounce duration-[5000ms]">
                <img src={robot} className="w-50 h-50"/>
              </div>
            </div>
            </div>
          </CardContent>
        </Card>

          <Card data-aos="zoom-in-up" className="bg-slate-800/50 border-slate-700 mt-10 mr-4 ml-4">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-3">
              <Upload className="h-8 w-8 text-blue-400" />
              Contribute to our library
            </CardTitle>
            <p className="text-slate-400">Share your knowledge with fellow students</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="gap-8 items-center">
              <div className="grid justify-center space-y-6">
                <FileUpload onChange={handleOnUploadChange}/>                
                    {files[0] && status !== "uploading" && (
                      <div className="grid gap-x-10">
                        <Card className="mb-8 bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">College name</label>
                        <Select
                          value={uploadData.college_name}
                          onValueChange={(value) => setUploadData((prev) => ({ ...prev, college_name: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select college" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-[#04152d]">
                            {colleges.engineering_colleges_pune.map((college : any , index : any) =>(
                              <SelectItem key={index} value={college.name}>{college.name}</SelectItem>
                            )
                            )}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Year</label>
                        <Select
                          value={uploadData.year}
                          onValueChange={(value) => setUploadData((prev) => ({ ...prev, year: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-[#04152d]">
                            {years.map((year  , index) => (
                              <SelectItem key={index} value={year.toString()}>{year}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Subject name</label>
                        <Select
                          value={uploadData.subject}
                          onValueChange={(value) => setUploadData((prev) => ({ ...prev, subject: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-[#04152d]">
                            {subjects.map((subject , index) => (
                              <SelectItem key={index} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Exam Type</label>
                        <Select
                          value={uploadData.exam_type}
                          onValueChange={(value) => setUploadData((prev) => ({ ...prev, exam_type: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-[#04152d]">
                            <SelectItem value="Insem">Insem</SelectItem>
                            <SelectItem value="Ensem">Ensem</SelectItem>
                            <SelectItem value="Re-Endsem">Re-Endsem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center">
                        <button
                          onClick={handleOnUploadSubmit}
                          className="bg-white hover:bg-gray-300 text-black px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                          Submit
                        </button>
                </div>
                        
                      </div>
                    )}
              </div>
            </div>
          </CardContent>
        </Card>
            <div className="flex items-center gap-4 mt-20 ml-10 mb-10">
              <div className="text-blue-400">
                <BookOpen size={40} />
              </div>
              <div className="text-3xl font-bold text-text-white">
                Our Library
              </div>
            </div>

      
                {pdf.length === 0 && (
          <Card className="ml-10 mr-10 mb-10 bg-slate-800/50 border-slate-700">
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground " />
              <h3 className="text-lg font-semibold mb-2 text-white">No files found</h3>
              <p className="text-muted-foreground">
                   Try adjusting your search or filter criteria or Upload your first PDF to get started
              </p>
            </CardContent>
          </Card>
        )} 

        {viewMode === "grid" ? (
           <div className="space-y-10 mb-10">
            <div className="space-x-2 ml-300">
                        <Button className="bg-white" size="sm" onClick={() => setViewMode("grid")}>
                        <Grid3X3 className="h-4 w-4 text-black" />
                        </Button>
                        <Button className="bg-[#030f22]" variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                        <List className="h-4 w-4 text-white" />
                        </Button>
                </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-10 mr-10 ">
            
            {paginatedPdf?.map((file,index) => (
              <Link to={file.secure_Url}>
              <Card key={index}  className="group bg-[#030f22] text-white hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <iframe 
                          src = {`${file.secure_Url}#page=1`}
                          height={"500px"}>
                        </iframe>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-medium text-white line-clamp-2 transition-colors">
                          {file.pdf_name}
                        </h3>

                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                            </div>
                            <div className="truncate">{file.college_name}</div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{file.year}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <NotebookTabs className="h-3 w-3" />
                              <span>{file.Examtype}</span>
                            </div>
                          </div>
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
                <div className="space-x-2 ml-300">
                        <Button className="bg-[#030f22]" size="sm" onClick={() => setViewMode("grid")}>
                        <Grid3X3 className="h-4 w-4 text-white" />
                        </Button>
                        <Button className="bg-white" variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                        <List className="h-4 w-4 text-black" />
                        </Button>
                </div>
          <div className="ml-10 mr-10 space-y-2 ">
            {paginatedPdf?.map((file,index) => (
              <Link to={file.secure_Url}>
              <Card key={index} className="bg-[#030f22] text-white hover:shadow-sm transition-shadow mb-2">
                <CardContent className="p-4 ">
                  <div className="flex items-center space-x-4 ">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        {/* <FileText className="h-6 w-6 text-muted-foreground" /> */}
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
                      <div className="flex text-gray-400 items-center space-x-4 text-sm text-muted-foreground mt-1">
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
      {/* <BlueRobot/> */}
            </div>)

            
}

  