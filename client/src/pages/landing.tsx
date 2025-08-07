'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, BookOpen, Calendar, ArrowRight, Play, CheckCircle, Star, Menu, X, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logo from "../../public/WeE_logo.png"
import { Footer } from '@/components/footer'

export const Landing = () => {
   const navigate = useNavigate() 
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: Upload,
      title: "Upload PYQs & Notes",
      description: "Easily upload and organize your previous year questions and study notes in one place."
    },
    {
      icon: Search,
      title: "Smart PDF Search",
      description: "Quickly find specific content across all your uploaded PDFs with intelligent search."
    },
    {
      icon: BookOpen,
      title: "50+ Subject Quizzes",
      description: "Test your knowledge with comprehensive quizzes across more than 50 subjects."
    },
    {
      icon: Calendar,
      title: "Events & Todos",
      description: "Keep track of important academic events, deadlines, and personal tasks."
    }
  ]

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Engineering Student",
      content: "Weengineer helped me organize all my study materials. The PDF search is incredibly fast!",
      rating: 5
    },
    {
      name: "Rahul Patel",
      role: "Medical Student", 
      content: "The quiz feature across 50+ subjects is amazing. It's like having a personal tutor.",
      rating: 5
    },
    {
      name: "Ananya Singh",
      role: "Commerce Student",
      content: "Never miss an assignment deadline again. The todo feature is a lifesaver!",
      rating: 5
    }
  ]

  const steps = [
    {
      icon: Upload,
      title: "Upload Your Materials",
      description: "Upload PYQs, notes, and study materials in PDF format"
    },
    {
      icon: Search,
      title: "Search Instantly", 
      description: "Find specific topics across all your PDFs with smart search"
    },
    {
      icon: BookOpen,
      title: "Take Quizzes",
      description: "Test yourself with quizzes from 50+ subjects"
    },
    {
      icon: Calendar,
      title: "Stay Organized",
      description: "Track important events, deadlines, and todos"
    }
  ]

  return (
    <div className="min-h-screen bg-[#04152d] overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full bg-[#030f22] backdrop-blur-md border-b border-slate-700/50 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <img src={logo}/>
              </div>
              <span className="text-xl font-bold text-white">WeEngineer</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 text-white">
              {/* <Link to="#features" className="text-white hover:text-white transition-colors">
                Features
              </Link>
              <Link to="#how-it-works" className="text-white hover:text-white transition-colors">
                How it Works
              </Link>
              <Link to="#testimonials" className="text-white hover:text-white transition-colors">
                Reviews
              </Link> */}
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black"
              onClick={()=>{
                navigate('/signin')
              }}
              >
                Sign In
              </Button>
              <Button className="bg-white hover:bg-gray-300 text-[#04152d]"
              onClick={()=>{
                navigate('/signup')
              }}
              >
                Get Started
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700">
              <div className="flex flex-col space-y-4">
                {/* <Link to="#features" className="text-white hover:text-white transition-colors">
                  Features
                </Link>
                <Link to="#how-it-works" className="text-white hover:text-white transition-colors">
                  How it Works
                </Link>
                <Link to="#testimonials" className="text-white hover:text-white transition-colors">
                  Reviews
                </Link> */}
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black w-full"
                onClick={()=>{
                navigate('/signin')
              }}
                >
                  Sign In
                </Button>
                <Button className="bg-white hover:bg-gray-300 text-[#04152d] w-full"
                onClick={()=>{
                navigate('/signup')
              }}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <Card className="bg-[#030f22] border-slate-700 overflow-hidden">
            <CardContent className="p-0">
              <div className="gap-8 items-center">
                <div className="lg:col-span-2 p-8">
                  <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div>
                      <Badge className="mb-6 bg-blue-400/20 text-blue-300 border-blue-400/30">
                        <Sparkles className="h-4 w-4 mr-2" />
                        Your Complete Study Companion
                      </Badge>
                      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                        Study Smarter, Not Harder
                      </h1>
                      <p className="text-lg text-slate-300 leading-relaxed mb-6">
                        Upload your notes and PYQs, search through PDFs instantly, take quizzes across 50+ subjects, 
                        and manage your academic schedule - all in one powerful platform.
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
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span>Add tasks or events to track all important activities</span>
                      </li>
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button 
                        size="lg" 
                        className="bg-white hover:bg-gray-300 text-[#04152d] px-8 py-3 text-lg group"
                        onClick={()=>{
                            navigate('/signup')
                        }}
                      >
                        Start Your Journey
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline" 
                        className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 text-lg group"
                      >
                        <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                        Watch Demo
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* <div className="col-span-1 flex justify-end">
                  <div className="w-50 flex justify-end mt-20 mr-4 bg-[#19376d] rounded-full animate-bounce duration-[5000ms]">
                    <div className="w-50 h-50 bg-blue-400/20 rounded-full flex items-center justify-center">
                      <BookOpen className="w-24 h-24 text-blue-400" />
                    </div>
                  </div>
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-slate-400">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-slate-400">Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">1M+</div>
              <div className="text-slate-400">PDFs Searched</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Unlimited</div>
              <div className="text-slate-400">Quiz Questions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Students
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Everything you need to organize your studies and boost your academic performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 group cursor-pointer"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How Weengineer Works
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Four simple steps to transform your study experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-[#030f22] border-slate-700 hover:border-slate-600 transition-all duration-300 hover:scale-105 group cursor-pointer h-full">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-slate-700/50 rounded-full bg-blue-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <step.icon className="w-8 h-8 text-white " />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-slate-300">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-slate-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Your Study Materials, Organized
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Experience seamless study management with instant PDF search, comprehensive quizzes, and smart organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Instant PDF content search</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Adaptive quiz system</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Smart event reminders</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center min-h-screen p-8">
      <div className="relative group">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
        
        {/* Main container */}
        <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-700/50 to-slate-800/90 backdrop-blur-sm rounded-full w-80 h-80 p-8 border border-slate-600/50 flex items-center justify-center shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500 group-hover:scale-105">
          
          {/* Inner circle */}
          <div className="bg-gradient-to-br from-slate-700/80 to-slate-800/80 rounded-full p-8 border border-slate-600/30 shadow-inner group-hover:shadow-lg transition-all duration-300">
            
            {/* Icon container */}
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full p-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <Search className="w-16 h-16 text-slate-300 group-hover:text-white transition-colors duration-300 drop-shadow-lg" />
            </div>
          </div>
          
          {/* Decorative rings */}
          <div className="absolute inset-4 border border-slate-600/20 rounded-full"></div>
          <div className="absolute inset-8 border border-slate-500/10 rounded-full"></div>
        </div>
        
        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400/60 rounded-full animate-ping animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400/60 rounded-full animate-ping animation-delay-2000"></div>
      </div>
    </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trusted by Students Worldwide
            </h2>
            <p className="text-xl text-slate-300">
              See what our users have to say about Weengineer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#030f22] border-slate-700 hover:border-slate-600 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <Card className="bg-slate-800/50 border-slate-700 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Ready to Ace Your Studies?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join thousands of students who are already using Weengineer to organize their study materials and improve their grades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {/* <Input 
                  placeholder="Enter your email address" 
                  className="max-w-md bg-slate-800 border-slate-600 text-white"
                /> */}
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-300 text-[#04152d] px-8"
                  onClick={()=>{
                    navigate('/signin')
                }}
                >
                  Start Your Journey
                </Button>
              </div>
              {/* <p className="text-slate-400 text-sm mt-4">
                No credit card required • 14-day free trial • Cancel anytime
              </p> */}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
