"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ToastContainer } from "react-fox-toast"
import { NavBar } from "@/components/navbar"
import Aos from "aos"
import type { tabStatus } from "@/components/ui/app-sidebar"
import axios from "axios"
import { useUser } from "@clerk/clerk-react"
import { useCustomHook } from "../../hooks/use-pdf"
import type {eventData} from "../../hooks/use-pdf"
import { BACKEND_URL } from "@/config"



export const AddEventTab = ({
  setTab,
  sidebarOpen,
  setSidebarOpen,
}: {
  setTab: React.Dispatch<React.SetStateAction<tabStatus>>
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { event } = useCustomHook()
  const {user} = useUser()
  const [events, setEvents] = useState<eventData[]>([])
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    type: "Exam" as eventData["type"],
  })

  const handleAddEvent = async() => {
    if (!formData.title || !formData.dueDate) return
    const formattedDate = new Date(formData.dueDate)
    const response = await axios.post(`${BACKEND_URL}/add-event?id=${user?.id}`,{
        title : formData.title,
        description : formData.description,
        dueDate : formattedDate,
        type : formData.type,
    })
    if(response.data.response === 'Event added successfully'){
      // setEvents([...events, response.data.response])
      setFormData({ title: "", description: "", dueDate: "", type: "Exam" })
      setIsAddingEvent(false)
    }

  }

  const handleEditEvent = (index: number, updatedData: Partial<eventData>) => {
    const updatedEvents = events.map((event, i) => (i === index ? { ...event, ...updatedData } : event))
    setEvents(updatedEvents)
    setEditingEvent(null)
  }

  const handleDeleteEvent = (index: number) => {
    setEvents(events.filter((_, i) => i !== index))
  }

  const getTypeColor = (type: eventData["type"]) => {
    switch (type) {
      case "Exam":
        return "bg-purple-100 text-purple-800"
      case "Deadline":
        return "bg-orange-100 text-orange-800"
      case "Assignment":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dateString: string) => {
    return new Date(dateString) < new Date() && new Date(dateString).toDateString() !== new Date().toDateString()
  }

  const sortedEvents = [...event].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())

  useEffect(() => {
    Aos.init({
      duration: 1000,
      once: true,
    })
  }, [])

  return (
    <div
      className={cn(
        "bg-[#04152d] z-10 h-full w-full overflow-x-hidden overflow-y-auto transition-all duration-150",
        sidebarOpen ? "w-[calc(100vw-16.5rem)]" : "w-[calc(100vw-0.5rem)]",
      )}
    >
      <ToastContainer />
      <NavBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setTab={setTab} />
      <div className="items-center p-4">
        <div className="max-w-4xl mx-auto">
          <div data-aos="zoom-in">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Student Events</h1>
              <p className="text-gray-400">Manage your exams, deadlines, and assignments</p>
            </div>
            {/* Add Event Button */}
            <div className="mb-6">
              <Button
                onClick={() => setIsAddingEvent((prev) => !prev)}
                className="flex items-center gap-2 bg-white text-[#04152d]"
              >
                <Plus className="h-4 w-4" />
                Add New Event
              </Button>
            </div>
          </div>

          {/* Add Event Form */}
          {isAddingEvent && (
            <Card className="bg-[#030f22] mb-6">
              <CardHeader>
                <CardTitle className="text-white">Add New Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Event Title</label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter event title"
                      className="bg-[#04152d] text-white border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-1">Event Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as eventData["type"] })}
                      className="w-full px-3 py-2 border border-gray-600 text-white bg-[#04152d] rounded-md"
                    >
                      <option value="Exam">Exam</option>
                      <option value="Deadline">Deadline</option>
                      <option value="Assignment">Assignment</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Date</label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="bg-[#04152d] text-white border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter event description (optional)"
                    rows={3}
                    className="bg-[#04152d] text-white border-gray-600"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddEvent} className="bg-white text-[#04152d]">
                    Add Event
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsAddingEvent(false)
                      setFormData({ title: "", description: "", dueDate: "", type: "Exam" })
                    }}
                    className="bg-white text-[#04152d]"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Events List */}
          <div className="space-y-4">
            {sortedEvents.length === 0 ? (
              <Card data-aos="fade-up" className="bg-slate-800/50 border-slate-700">
                <CardContent className="text-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No events yet</h3>
                  <p className="text-gray-500">Add your first event to get started!</p>
                </CardContent>
              </Card>
            ) : (
              event.map((event, index) => (
                <Card key={index} data-aos="fade-up" className="bg-[#030f22] border-slate-700">
                  <CardContent className="p-6">
                    {editingEvent === index ? (
                      <EditEventForm
                        event={event}
                        onSave={(updatedData) => handleEditEvent(index, updatedData)}
                        onCancel={() => setEditingEvent(null)}
                      />
                    ) : (
                      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                            <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                            {isOverdue(event.dueDate) && <Badge className="bg-red-100 text-red-800">Overdue</Badge>}
                          </div>
                          {event.description && <p className="text-gray-300 mb-2">{event.description}</p>}
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {formatDate(event.dueDate)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingEvent(index)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteEvent(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

interface EditEventFormProps {
  event: eventData
  onSave: (updatedData: Partial<eventData>) => void
  onCancel: () => void
}

function EditEventForm({ event, onSave, onCancel }: EditEventFormProps) {
  const [editData, setEditData] = useState({
    title: event.title,
    description: event.description,
    dueDate: event.dueDate,
    type: event.type,
  })

  const handleSave = () => {
    if (!editData.title || !editData.dueDate) return
    onSave(editData)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">Event Title</label>
          <Input
            value={editData.title}
            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            className="bg-[#04152d] text-white border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white mb-1">Event Type</label>
          <select
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value as eventData["type"] })}
            className="w-full px-3 py-2 border border-gray-600 text-white bg-[#04152d] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Exam">Exam</option>
            <option value="Deadline">Deadline</option>
            <option value="Assignment">Assignment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Date</label>
        <Input
          type="date"
          value={editData.dueDate}
          onChange={(e) => setEditData({ ...editData, dueDate: e.target.value })}
          className="bg-[#04152d] text-white border-gray-600"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white mb-1">Description</label>
        <Textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows={3}
          className="bg-[#04152d] text-white border-gray-600"
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave} className="bg-white text-[#04152d]">
          Save Changes
        </Button>
        <Button variant="outline" onClick={onCancel} className="bg-white text-[#04152d]">
          Cancel
        </Button>
      </div>
    </div>
  )
}
