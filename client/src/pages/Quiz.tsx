"use client"
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowUp, Clock, Home, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils";



export const Quiz = () => {
  const { state } = useLocation();
  const quizData = state.data.questions;
  console.log(quizData)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(new Array(quizData.questions.length).fill(""))
  const [timeLeft, setTimeLeft] = useState(Number.parseInt(quizData.time_limit_minutes) * 60)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  // const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleSubmitQuiz()
    }
  }, [timeLeft, quizCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answer
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    setQuizCompleted(true)
    setShowResults(true)
  }

  const calculateScore = () => {
    return selectedAnswers.reduce((score, answer, index) => {
      return answer === quizData.questions[index].correct_answer ? score + 1 : score
    }, 0)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(quizData.questions.length).fill(""))
    setTimeLeft(Number.parseInt(quizData.time_limit_minutes) * 60)
    setQuizCompleted(false)
    setShowResults(false)
  }

  const navigate = useNavigate()

  const scrollToTop = (e:any) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (showResults) {
    const score = calculateScore()
    const percentage = Math.round((score / quizData.questions.length) * 100)

    return (
      <div className="bg-[#04152d] w-screen mx-auto p-6 space-y-6 overflow-hidden">
        <Card>
          <div className="flex justify-center">
            <Button className="bg-white text-[#04152d] rounded-lg hover: cursor-pointer"
            onClick={()=>{
              navigate("/dashboard")
            }}
            >
            <Home/>
              Go to Home
            </Button>
          </div>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Quiz Results</CardTitle>
            <CardDescription>
              Topic: {state.data.topic} • Difficulty: {quizData.topic}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-primary">
                {score}/{quizData.questions.length}
              </div>
              <div className="text-xl text-muted-foreground">{percentage}% Score</div>
              <Progress value={percentage} className="w-full max-w-md mx-auto" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Review Answers</h3>
              {quizData.questions.map((question: any, index: any) => {
                const userAnswer = selectedAnswers[index]
                const isCorrect = userAnswer === question.correct_answer

                return (
                  <Card key={index} className={cn("w-full overflow-hidden", isCorrect ? "bg-green-900" : "bg-red-900")}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-base">Question {index + 1}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">{question.question}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">Your answer:</span>
                          {userAnswer || "Not answered"}
                        </div>
                        {!isCorrect && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">Correct answer:</span>
                            {question.correct_answer}
                          </div>
                        )}
                      </div>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm">{question.explanation}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="flex justify-center">
              <Button onClick={restartQuiz} className="bg-white text-[#04152d] gap-2 hover:cursor-pointer">
                <RotateCcw className="w-4 h-4" />
                Retake Quiz
              </Button>
            </div>
            <Button className="fixed bottom-8 right-5 bg-white rounded-full hover:cursor-pointer"
            onClick={(e) => {
                  e.preventDefault();
                  scrollToTop(e);
                }}
            >
              <ArrowUp className="text-[#04152d]"/>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quizData.questions.length) * 100
  const question = quizData.questions[currentQuestion]

  return ( 
    <div className="bg-[#04152d] w-screen mx-auto p-4 h-screen pt-10 overflow-x-hidden">
      {/* Header */}
      <Card className="bg-[#030f22] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Quiz: {quizData.topic}</CardTitle>
              <CardDescription>
                Difficulty: {quizData.difficulty} • Question {currentQuestion + 1} of {quizData.questions.length}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-lg font-mono">
              <Clock className="w-5 h-5" />
              <span className={timeLeft < 60 ? "text-red-500" : "text-foreground"}>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="bg-white text-[#04152d] rounded-xl p-3 text-lg leading-relaxed ">Q.{ currentQuestion + 1 } {question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            {question.options.map((option: any, index: any) => (
              <Button
                key={index}
                // variant={selectedAnswers[currentQuestion] === option ? "bg-white text-[#04152d]" : "outline"}
                className={cn("justify-start text-left h-auto p-4 whitespace-normal bg-[#030f22]",selectedAnswers[currentQuestion] === option ? "bg-white text-[#04152d]": "")}
                onClick={() => {
                  handleAnswerSelect(option)
                }}
              >
                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <Button className="bg-white text-[#030f22]" onClick={handlePrevious} disabled={currentQuestion === 0}>
              Previous
            </Button>

            {currentQuestion === quizData.questions.length - 1 ? (
              <Button className="bg-green-900" onClick={handleSubmitQuiz}>Submit Quiz</Button>
            ) : (
              <Button className="bg-white text-[#030f22]" onClick={handleNext}>Next</Button>
            )}
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}
