"use client"

import { AppWindowMac, Calendar, GraduationCap, Mail, Pencil, University, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const AccountTab = () => {
  const accountFields = [
    {
      label: "Name",
      value: "Yashas Salian",
      icon: User,
    },
    {
      label: "Email",
      value: "yashassalian40@gmail.com",
      icon: Mail,
    },
    {
      label: "Date of Birth",
      value: "28/05/2005",
      icon: Calendar,
    },
    {
      label: "College",
      value: "AISSMS IOIT",
      icon: University,
    },
    {
      label: "Degree",
      value: "BTECH",
      icon: GraduationCap,
    },
    {
      label: "Field of Study",
      value: "AI & Data Science",
      icon: AppWindowMac,
    },
  ]

  return (
    <div data-aos="fade-up" className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-white">Account Information</h1>
        <p className="text-gray-400">Manage your personal details and preferences</p>
      </div>

      <Card className="bg-[#030f22]">
        <CardContent className="p-0">
          {accountFields.map((field, index) => {
            const IconComponent = field.icon
            return (
              <div key={index}>
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-700/50">
                      <IconComponent className="w-5 h-5 text-slate-300" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">{field.label}</p>
                      <p className="text-lg font-semibold text-white">{field.value}</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border-white/20 text-[#030f22] hover:bg-gray-300 transition-all duration-200 group"
                  >
                    <Pencil className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Edit
                  </Button>
                </div>
                {index < accountFields.length - 1 && <Separator className="bg-slate-700/30" />}
              </div>
            )
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3 pt-4">
        <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
          Cancel Changes
        </Button>
        <Button className="bg-white text-[#030f22]">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

export default function Component() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AccountTab />
    </div>
  )
}
