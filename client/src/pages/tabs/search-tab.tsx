"use client"

import { useState } from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  Badge,
  Calendar,
  Download,
  Eye,
  FileText,
  Filter,
  Grid3X3,
  List,
  MoreVertical,
  NotebookTabs,
  SearchIcon,
  Trash2,
  User,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FlipWords } from "@/components/ui/flip-words"
import logo from "../../images/WeE_logo.png"
import axios from "axios"
import { toast } from "react-fox-toast"


interface SearchSchema {
  college_name: string
  year: string
  Examtype: string
}

interface Data {
  ID: string
  college_name: string
  pdf_name: string
  year: string
  Examtype: string
  Url: string
  secure_Url: string
  size: number
  subject_name: string
}

export const Search = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(12)
  const [pdf, setPdf] = useState<Data[]>([])
  const [search, setSearch] = useState<SearchSchema>({
    college_name: "",
    year: "",
    Examtype: "",
  })

  const blockPerPage = 4
  const [filter, setFilter] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const words = ["PDFs", "Notes", "PYQs"]

  const totalPages = Math.ceil(pdf.length / postsPerPage)
  const lastPostIndex = currentPage * postsPerPage
  const firstPageIndex = lastPostIndex - postsPerPage
  const paginatedPdf = pdf.slice(firstPageIndex, lastPostIndex)

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
        setPdf(response.data.data)
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
        setPdf(response.data.data)
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
        setPdf(response.data.data)
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
        setPdf(response.data.data)
      }
    }
    }


  const clearFilters = () => {
    setSearch({
      college_name: "",
      year: "",
      Examtype: "",
    })
    setPdf([])
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

  return (
    <div className={cn("bg-[#04152d] z-10 h-full overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out" , sidebarOpen ? "w-[calc(100vw-16.5rem)]" : "w-[calc(100vw-0.5rem)]")}>
                <div  className="bg-[#04152d] border border-neutral-800 rounded-4xl grid grid-cols-3 p-4 m-4 gap-x-120">
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

      <div className="flex-1 p-6">
        {/* Hero Section */}
        <div data-aos="zoom-in" className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover amazing <FlipWords words={words} />
          </h1>
          <p className="text-xl text-slate-300 mb-8">Use filters to find exactly what you're looking for</p>

          <Button
            onClick={() => setFilter(!filter)}
            className={cn(
              "relative overflow-hidden px-8 py-3 rounded-full transition-all duration-300",
              filter ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white hover:bg-slate-100 text-slate-900",
            )}
          >
            <div className="flex items-center gap-2">
              {filter ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
              <span className="font-semibold">{filter ? "Close Filters" : "Open Filters"}</span>
            </div>
          </Button>
        </div>

        {/* Filter Section */}
        {filter && (
          <Card className="mb-8 bg-slate-800/50 border-slate-700">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">College Name</label>
                  <Input
                    placeholder="Enter college name"
                    value={search.college_name}
                    onChange={(e) => setSearch((prev) => ({ ...prev, college_name: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Year</label>
                  <Select
                    value={search.year}
                    onValueChange={(value) => setSearch((prev) => ({ ...prev, year: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Exam Type</label>
                  <Select
                    value={search.Examtype}
                    onValueChange={(value) => setSearch((prev) => ({ ...prev, Examtype: value }))}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Midterm">Midterm</SelectItem>
                      <SelectItem value="Final">Final</SelectItem>
                      <SelectItem value="Quiz">Quiz</SelectItem>
                      <SelectItem value="Assignment">Assignment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <SearchIcon className="w-4 h-4" />
                      Search
                    </div>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {pdf.length === 0 && !isLoading ? (
          <Card data-aos="fade-up" className="bg-slate-800/50 border-slate-700">
            <CardContent className="py-16 text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-slate-400" />
              <h3 className="text-xl font-semibold mb-2 text-white">No files found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria</p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Search Results</h2>
                <p className="text-slate-400">Found {pdf.length} results</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedPdf.map((file, index) => (
                  <Card
                    key={index}
                    data-aos="fade-up"
                    className="group bg-[#030f22] transition-all duration-300"
                  >
                    <CardContent className="p-4">
                      <div className="aspect-[3/4] bg-slate-700 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
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
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3 mb-8">
                {paginatedPdf.map((file, index) => (
                  <Card
                    key={index}
                    data-aos="fade-up"
                    className="bg-[#030f22] hover:bg-slate-800/70 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center overflow-hidden">
                            <iframe 
                              src = {`${file.secure_Url}#page=1`}
                              height={"500px"}>
                            </iframe>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate mb-1">{file.pdf_name}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                            <span>•</span>
                            <span>{file.college_name}</span>
                            <span>•</span>
                            <span>{file.year}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge className="bg-blue-600/20 text-blue-400 border-blue-600/30">
                            {file.Examtype}
                          </Badge>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400 hover:bg-slate-700">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
          </>
        )}
      </div>
    </div>
  )
}
