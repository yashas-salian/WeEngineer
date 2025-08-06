"use client"

import type React from "react"

import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import sky from "./images/sky-login.jpg"
import { useSignUp, useClerk, useAuth } from "@clerk/clerk-react"
import { useState } from "react"
import { EngineeringMachine } from "./simple-cogs"

export const SignupComponent = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { signUp, isLoaded } = useSignUp()
  const {isSignedIn} = useAuth()
  const { setActive } = useClerk()

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    DOB: "",
    college: "",
    degree: "",
    field: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoaded) return
    if (isSignedIn){
        navigate('/dashboard')
        return
      }
    try {
      setLoading(true)
      console.log("before result")
      const result = await signUp.create({
        emailAddress: formData.email,
        password: formData.password,
        username: formData.username,
      })
      console.log(result)
    //   await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      if (result.status === "complete"){
        setActive({session : result.createdSessionId})
        navigate('/dashboard')
        //db
      }
      if (result.status === "abandoned"){
        throw new Error("Login failed ")
      }
    } catch (err) {
      console.error("Error during sign up:", err)
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  }

  const handleOauthSubmit = async (provider: "oauth_google" | "oauth_github") => {
    if (!isLoaded) return
    if (isSignedIn){
        navigate('/dashboard')
        return
      }
    try {
      setLoading(true)
      await signUp?.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sso",
        redirectUrlComplete: "/dashboard",
      })
    } catch (error) {
      setLoading(false)
    }  
    finally{
      setLoading(false)
    }
  }

  return (
    <>
    {loading && (
      <div>
        <EngineeringMachine/>
      </div>
    )}
    <div className="w-screen min-h-screen w-full grid lg:grid-cols-2 overflow-hidden bg-[#04152d]">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-[#04152d] overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Create your account</h1>
            <p className="text-gray-300">Join WeEngineer to start your learning journey</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-white text-[#04152d]"
              type="button"
              onClick={() => handleOauthSubmit("oauth_google")}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white text-[#04152d]"
              type="button"
              onClick={() => handleOauthSubmit("oauth_github")}
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-white">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="johndoe"
                  required
                  className="border-gray-300"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="border-gray-300"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a strong password"
                required
                className="border-gray-300"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="DOB" className="text-white">
                Date of Birth
              </Label>
              <Input
                id="DOB"
                name="DOB"
                type="date"
                required
                className="border-gray-300"
                value={formData.DOB}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="college" className="text-white">
                College
              </Label>
              <Input
                id="college"
                name="college"
                type="text"
                placeholder="Your college name"
                required
                className="border-gray-300"
                value={formData.college}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="degree" className="text-white">
                  Degree
                </Label>
                <Input
                  id="degree"
                  name="degree"
                  type="text"
                  placeholder="B.Tech, M.Tech, etc."
                  required
                  className="border-gray-300"
                  value={formData.degree}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="field" className="text-white">
                  Field
                </Label>
                <Input
                  id="field"
                  name="field"
                  type="text"
                  placeholder="Computer Science, etc."
                  required
                  className="border-gray-300"
                  value={formData.field}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-white text-[#04152d] hover:bg-white/90">
              Create Account
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500 underline underline-offset-4">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image with dark blue background */}
      <div className="hidden lg:flex relative bg-[#04152d] min-h-screen">
        <img
          src={sky || "/placeholder.svg"}
          alt="Signup illustration"
          className="object-cover opacity-80 h-full w-full"
        />
        <div className="absolute inset-0 bg-[#04152d]/40" />
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <blockquote className="text-white">
            <p className="text-xl font-medium leading-relaxed">
              "Join thousands of engineers who are already learning, sharing, and growing together on WeEngineer."
            </p>
            <footer className="mt-6">
              <div className="font-semibold text-lg">Yashas Salian</div>
              <div className="text-sm opacity-90">Dev, WeEngineer</div>
            </footer>
          </blockquote>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-8 w-24 h-24 bg-blue-400/20 rounded-full blur-lg"></div>
      </div>
    </div>
  </>
  )
}
