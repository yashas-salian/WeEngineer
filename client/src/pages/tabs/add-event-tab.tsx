"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Edit, Trash2, Check, X, Plus, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { ToastContainer } from "react-fox-toast"
import { SidebarTrigger } from "@/components/ui/sidebar"
import logo from "../../images/WeE_logo.png"


interface Event {
  id: string
  title: string
  description: string
  date: string
  type: "exam" | "deadline" | "assignment" | "other"
  status: "pending" | "completed" | "given-up"
  createdAt: Date
}

export const AddEventTab=() => {
  const [events, setEvents] = useState<Event[]>([])
  const [isAddingEvent, setIsAddingEvent] = useState(false)
  const [editingEvent, setEditingEvent] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    type: "exam" as Event["type"],
  })
    const [sidebarOpen, setSidebarOpen] = useState(true)


  const handleAddEvent = () => {
    if (!formData.title || !formData.date) return

    const newEvent: Event = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      date: formData.date,
      type: formData.type,
      status: "pending",
      createdAt: new Date(),
    }

    setEvents([...events, newEvent])
    setFormData({ title: "", description: "", date: "", type: "exam" })
    setIsAddingEvent(false)
  }

  const handleEditEvent = (id: string, updatedData: Partial<Event>) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, ...updatedData } : event)))
    setEditingEvent(null)
  }

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const handleStatusChange = (id: string, status: Event["status"]) => {
    setEvents(events.map((event) => (event.id === id ? { ...event, status } : event)))
  }

  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "given-up":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const getTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "exam":
        return "bg-purple-100 text-purple-800"
      case "deadline":
        return "bg-orange-100 text-orange-800"
      case "assignment":
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

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  return (<div className={cn("bg-[#04152d] z-10 h-full w-full overflow-x-hidden overflow-y-auto transition-all duration-300 ease-in-out" , sidebarOpen ? "w-[calc(100vw-16.5rem)]" : "w-[calc(100vw-0.5rem)]")}>
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
    <div className="items-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Student Events</h1>
          <p className="text-gray-400">Manage your exams, deadlines, and assignments</p>
        </div>

        {/* Add Event Button */}
        <div className="mb-6">
          <Button onClick={() => setIsAddingEvent(prev => !prev)} className="flex items-center gap-2 bg-white text-[#04152d]">
            <Plus className="h-4 w-4" />
            Add New Event
          </Button>
        </div>

        {/* Add Event Form */}
        {isAddingEvent && (
          <Card className="bg-[#030f22] mb-6">
            <CardHeader>
              <CardTitle>Add New Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Event Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Event Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Event["type"] })}
                    className="w-full px-3 py-2 border border-gray-300 text-white bg-[#030f22] rounded-md"
                  >
                    <option value="exam">Exam</option>
                    <option value="deadline">Deadline</option>
                    <option value="assignment">Assignment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-1">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter event description (optional)"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddEvent} className="bg-white text-[#04152d]">Add Event</Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddingEvent(false)
                    setFormData({ title: "", description: "", date: "", type: "exam" })
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
            <Card>
              <CardContent className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No events yet</h3>
                <p className="text-gray-500">Add your first event to get started!</p>
              </CardContent>
            </Card>
          ) : (
            sortedEvents.map((event) => (
              <Card key={event.id} className={`${event.status === "completed" ? "opacity-75" : ""}`}>
                <CardContent className="p-6">
                  {editingEvent === event.id ? (
                    <EditEventForm
                      event={event}
                      onSave={(updatedData) => handleEditEvent(event.id, updatedData)}
                      onCancel={() => setEditingEvent(null)}
                    />
                  ) : (
                    <div className="bg-[#030f22] flex flex-col md:flex-row md:rounded-xl items-center justify-between gap-4 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3
                            className={` text-lg font-semibold text-white ${event.status === "completed" ? "line-through text-gray-500" : "text-gray-900"}`}
                          >
                            {event.title}
                          </h3>
                          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
                          <Badge className={getStatusColor(event.status)}>{event.status}</Badge>
                          {isOverdue(event.date) && event.status === "pending" && (
                            <Badge className="bg-red-100 text-red-800">Overdue</Badge>
                          )}
                        </div>
                        {event.description && <p className="text-gray-300 mb-2">{event.description}</p>}
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            Added {event.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {event.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(event.id, "completed")}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(event.id, "given-up")}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {event.status !== "pending" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusChange(event.id, "pending")}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Restore
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => setEditingEvent(event.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteEvent(event.id)}
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
  event: Event
  onSave: (updatedData: Partial<Event>) => void
  onCancel: () => void
}

function EditEventForm({ event, onSave, onCancel }: EditEventFormProps) {
  const [editData, setEditData] = useState({
    title: event.title,
    description: event.description,
    date: event.date,
    type: event.type,
  })

  const handleSave = () => {
    if (!editData.title || !editData.date) return
    onSave(editData)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
          <Input value={editData.title} onChange={(e) => setEditData({ ...editData, title: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <select
            value={editData.type}
            onChange={(e) => setEditData({ ...editData, type: e.target.value as Event["type"] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="exam">Exam</option>
            <option value="deadline">Deadline</option>
            <option value="assignment">Assignment</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <Input type="date" value={editData.date} onChange={(e) => setEditData({ ...editData, date: e.target.value })} />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <Textarea
          value={editData.description}
          onChange={(e) => setEditData({ ...editData, description: e.target.value })}
          rows={3}
        />
      </div>
      <div className="flex gap-2">
        <Button onClick={handleSave} className="bg-white">Save Changes</Button>
        <Button variant="outline" onClick={onCancel} className="bg-white">
          Cancel
        </Button>
      </div>
    </div>
  )
}
