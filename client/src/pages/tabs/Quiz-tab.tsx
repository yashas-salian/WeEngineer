import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Clock, BookOpen, Target, Hash, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import axios from "axios"
import { toast, ToastContainer } from "react-fox-toast"
import { useNavigate } from "react-router-dom"
import { NavBar } from "@/components/navbar"
import subjects from "../../data/subjects-data.json"
import {BACKEND_URL} from "../../config"

const QuizTab = () => {
  const [difficulty, setDifficulty] = useState("")
  const [timeLimit, setTimeLimit] = useState([30])
  const [topic, setTopic] = useState("")
  const [questionCount, setQuestionCount] = useState([10])
  // const [sidebarOpen, setSidebarOpen] = useState(true)
  
  const navigate = useNavigate()

  const handleStartQuiz = async () => {
    // const response = await axios.get(`http://127.0.0.1:8787/get-questions?num_questions=${questionCount}&difficulty=${difficulty}&time_limit=${timeLimit}&topic=${topic}`)
    const response = await axios.get(`${BACKEND_URL}/get-questions?num_questions=${questionCount}&difficulty=${difficulty}&time_limit=${timeLimit}&topic=${topic}`)
    if (!response){
        toast.error("Some error occured",{
            position: "top-center"
        })
        return
    } 
    toast.success("Success",{
            position: "top-center"
        })
    const data = response.data
    navigate('/quiz',  { state: { data } })

    console.log(response.data)
  }

  const isFormValid = difficulty && topic

  return (
    <div className={cn("bg-[#04152d] z-10 h-full w-full scroll-smooth overflow-x-hidden overflow-y-auto transition-all duration-150")}>
        <ToastContainer/>
        <NavBar/> 

      <div className="max-w-2xl mx-auto">
        <div data-aos="zoom-in" className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Quiz Setup</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Configure your quiz preferences and get ready to test your knowledge!
          </p>
        </div>

        <div className="grid gap-6">
          {/* Difficulty Selection */}
          <Card data-aos="fade-up" className="bg-[#030f22]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-orange-500" />
                Difficulty Level
              </CardTitle>
              <CardDescription>Choose the difficulty level that matches your expertise</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={difficulty} onValueChange={setDifficulty}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="easy" id="easy" className="data-[state=checked]:bg-white"/>
                    <Label htmlFor="easy" className="flex-1 cursor-pointer">
                      <div className="font-medium text-green-600 dark:text-green-400">Easy</div>
                      <div className="text-sm text-gray-500">Perfect for beginners</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="medium" id="medium" className="data-[state=checked]:bg-white"/>
                    <Label htmlFor="medium" className="flex-1 cursor-pointer">
                      <div className="font-medium text-yellow-600 dark:text-yellow-400">Medium</div>
                      <div className="text-sm text-gray-500">Moderate challenge</div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem value="hard" id="hard" className="data-[state=checked]:bg-white"/>
                    <Label htmlFor="hard" className="flex-1 cursor-pointer">
                      <div className="font-medium text-red-600 dark:text-red-400">Hard</div>
                      <div className="text-sm text-gray-500">Expert level</div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Topic Selection */}
          <Card data-aos="fade-up" className="bg-[#030f22]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                Topic
              </CardTitle>
              <CardDescription>Select the subject you want to be quizzed on</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a topic" />
                </SelectTrigger>
                <SelectContent className="bg-white text-black">
                  {
                    subjects.map((subject : string , index : number) => 
                      <SelectItem key={index} value={subject} className="hover:bg-gray-300">{subject}</SelectItem>
                    )}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Time Limit */}
          <Card data-aos="fade-up" className="bg-[#030f22]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-purple-500" />
                Time Limit
              </CardTitle>
              <CardDescription>Set the time limit for the entire quiz (in minutes)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Duration: {timeLimit[0]} minutes</Label>
                  <span className="text-sm text-gray-500">
                    {timeLimit[0] < 15 ? "Quick" : timeLimit[0] < 45 ? "Standard" : "Extended"}
                  </span>
                </div>
                <Slider value={timeLimit} onValueChange={setTimeLimit} max={120} min={5} step={5} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 min</span>
                  <span>60 min</span>
                  <span>120 min</span>  
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Number of Questions */}
          <Card data-aos="fade-up" className="bg-[#030f22]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-green-500" />
                Number of Questions
              </CardTitle>
              <CardDescription>Choose how many questions you want in your quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Questions: {questionCount[0]}</Label>
                  <span className="text-sm text-gray-500">
                    {questionCount[0] < 10 ? "Short" : questionCount[0] < 25 ? "Medium" : "Long"}
                  </span>
                </div>
                <Slider
                  value={questionCount}
                  onValueChange={setQuestionCount}
                  max={50}
                  min={5}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 questions</span>
                  <span>25 questions</span>
                  <span>50 questions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          

          {/* Quiz Summary */}
          {isFormValid && (
            <Card data-aos="fade-up" className="bg-[#030f22] mb-5">
              <CardHeader>
                <CardTitle className="text-blue-800 dark:text-blue-200">Quiz Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Difficulty:</span> {difficulty}
                  </div>
                  <div>
                    <span className="font-medium">Topic:</span> {topic}
                  </div>
                  <div>
                    <span className="font-medium">Time Limit:</span> {timeLimit[0]} minutes
                  </div>
                  <div>
                    <span className="font-medium">Questions:</span> {questionCount[0]}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          {/* Start Quiz Button */}
          <div className="flex justify-center">
            <Button
                  onClick={handleStartQuiz}
                  disabled={!isFormValid}
                  className="bg-white text-[#030f22] w-1/2 h-12 text-lg font-semibold mb-10 hover:bg-white/80 hover:cursor-pointer"
                  size="lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default QuizTab