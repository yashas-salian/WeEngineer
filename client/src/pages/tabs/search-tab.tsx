"use client"

import { useState } from "react"
import {
  Calendar,
  FileText,
  Filter,
  Grid3X3,
  List,
  NotebookTabs,
  SearchIcon,
  X,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { FlipWords } from "@/components/ui/flip-words"
import axios from "axios"
import { toast, ToastContainer } from "react-fox-toast"
import colleges from "../../data/college-data.json"
import subjects from "../../data/subjects-data.json"
import { Link } from "react-router-dom"
import { NavBar } from "@/components/navbar"
import {BACKEND_URL} from "../../config"
import { EngineeringMachine } from "@/components/simple-cogs"


interface SearchSchema {
  college_name?: string
  year?: string
  Examtype?: string,
  subject? : string,
  type? : string 
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
  const [loading, setLoading] = useState(false)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(12)
  const [pdf, setPdf] = useState<Data[]>([])
  const [search, setSearch] = useState<SearchSchema>({})

  const blockPerPage = 4
  const [filter, setFilter] = useState(false)
  const isLoading = false
  // const [sidebarOpen, setSidebarOpen] = useState(true)

  const words = ["PDFs", "Notes", "PYQs"]

  const totalPages = Math.ceil(pdf.length / postsPerPage)
  const lastPostIndex = currentPage * postsPerPage
  const firstPageIndex = lastPostIndex - postsPerPage
  const paginatedPdf = pdf.slice(firstPageIndex, lastPostIndex)

  const handleSubmit = async() =>{
    try {
      
      setLoading(true)
      const query = new URLSearchParams()
      if (search.Examtype) query.append('Examtype',search.Examtype)
      if (search.year) query.append('year',search.year)
      if (search.subject) query.append('subject_name',search.subject)
      if (search.college_name) query.append('college_name',search.college_name)
      if (search.type) query.append('type',search.type)
        
      if(!search.Examtype && !search.college_name && !search.subject && !search.year && !search.type) {
        toast.error("Select atleast one field",{
          position : "top-center"
        })
      }
      // const response = await axios.get(`http://127.0.0.1:8787/get-pdf?${query.toString()}`)
      const response = await axios.get(`${BACKEND_URL}/get-pdf?${query.toString()}`)
      if (response.data.message === "Pdf/pdf's found"){
        toast.success("Pdf/Pdf's found",{
          position : "top-center"
        })
        setPdf(response.data.response)
      }
      else if (response.data.message === "Pdf for the following filter is not found"){
        toast.error("Pdf for the following filter is not found",{
          position : "top-center"
        })
        setPdf(response.data.response)
      }
      else{
        toast.error("Some error occured",{
          position : "top-center"
        })
      }
    } catch (error) {
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  }


  const clearFilters = () => {
    setSearch({})
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

  return (<>
    {loading && (
      <div>
        <EngineeringMachine/>
      </div>
    )}
    <div className={cn("w-full bg-[#04152d] min-h-screen overflow-x-hidden overflow-y-auto transition-all duration-150")}>
                <ToastContainer/>
                <NavBar/> 
      <div className="space-y-6 p-6">
        {/* Hero Section */}
        <div data-aos="zoom-in" className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover amazing <FlipWords words={words} />
          </h1>
          <p className="text-xl text-slate-300 mb-8">Use filters to find exactly what you're looking for</p>

          <Button
            onClick={() => setFilter(!filter)}
            className={cn(
              "relative overflow-hidden px-8 py-3 rounded-full transition-all duration-300 hover:cursor-pointer",
              filter ? "bg-[#030f22] text-white" : "bg-white hover:bg-slate-100 text-slate-900",
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">College name</label>
                        <Select
                          value={search?.college_name}
                          onValueChange={(value) => setSearch((prev) => ({ ...prev, college_name: value }))}
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
                          value={search?.year}
                          onValueChange={(value) => setSearch((prev) => ({ ...prev, year: value }))}
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
                          value={search?.subject}
                          onValueChange={(value) => setSearch((prev) => ({ ...prev, subject: value }))}
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
                          value={search?.Examtype}
                          onValueChange={(value) => setSearch((prev) => ({ ...prev, Examtype: value }))}
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-300">Type</label>
                        <Select
                          value={search?.type}
                          onValueChange={(value) => setSearch((prev) => ({ ...prev, type: value }))}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select content type" />
                          </SelectTrigger>
                          <SelectContent className="bg-white text-[#04152d]">
                              <SelectItem value="PYQ">PYQ</SelectItem>
                              <SelectItem value="Notes">Notes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-white hover:bg-gray-200 text-[#04152d] px-8 hover:cursor-pointer"
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
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent hover:cursor-pointer"
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

              <div className="flex justify-end items-center gap-2 mb-6">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }
                >
                  <Grid3X3 className={cn("h-4 w-4 ", viewMode === "grid" ? "text-black" : "text-white")} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-white"
                      : "text-slate-300 hover:bg-slate-700"
                  }
                >
                  <List className={cn("h-4 w-4 ", viewMode === "list" ? "text-black" : "text-white")} />
                </Button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === "grid" ? (
              <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {paginatedPdf.map((file, index) => (
                  <Link to={file.secure_Url}>
                  <Card
                    key={index}
                    className="group bg-[#030f22] transition-all duration-300"
                  >
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
  </>
  )
}
