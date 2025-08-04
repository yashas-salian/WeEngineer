import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import sky from "./images/sky-login.jpg"
import {useSignIn , useClerk , useAuth} from "@clerk/clerk-react"
import { useState } from "react"

export const SigninComponent = () => {
    const navigate = useNavigate()
    const { signIn, isLoaded } = useSignIn()
    const {isSignedIn} = useAuth()
    const { setActive } = useClerk()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLoginSubmit = async () =>{
        if(!isLoaded) return
        if (isSignedIn){
        navigate('/dashboard')
        return
      }
        const res = await signIn.create({identifier: email, password})
        console.log(res)
        if (res.status === "complete"){
            await setActive({session : res.createdSessionId})
            // db call
            // redirect
            navigate('/dashboard')
            return
        }
    }
    const handleOauthSubmit = async (provider: "oauth_google" | "oauth_github") => {
      if (isSignedIn){
        navigate('/dashboard')
        return
      }
        await signIn?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: "/sso", 
          redirectUrlComplete: "/dashboard",
        });
      
    };

  return (
    <div className="w-screen min-h-screen w-full grid lg:grid-cols-2 overflow-hidden bg-[#04152d]">
      {/* Left side - Form */}
      <div className="flex items-center justify-center p-8 lg:p-12 bg-[#04152d]">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
            <p className="text-gray-300">Sign in to your account to continue</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button variant="outline" className="w-full bg-white text-[#04152d]" type="button"
              onClick={()=>handleOauthSubmit("oauth_google")}
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

            <Button variant="outline" className="w-full bg-white text-[#04152d]" type="button"
              onClick={()=>handleOauthSubmit("oauth_github")}
            >
              <Github className="w-5 h-5 mr-2" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative">
            {/* <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white" />
            </div> */}
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 text-white">Or continue with</span>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input id="email" type="email" placeholder="john@example.com" required className="border-gray-300" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-500 underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="border-gray-300"
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-white text-[#04152d] hover:bg-white/90"
            onClick={handleLoginSubmit} 
            >
              Sign in
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500 underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Image with dark blue background */}
      <div className="hidden lg:flex relative bg-[#04152d] min-h-screen">
        <img
          src={sky}
          alt="Login illustration"
          className="object-cover opacity-80 h-screen w-full"
        />
        <div className="absolute inset-0 bg-[#04152d]/40" />
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <blockquote className="text-white">
            <p className="text-xl font-medium leading-relaxed">
             "Empowering students to learn, share, and grow — WeEngineer makes knowledge accessible for every engineer."
            </p>
            <footer className="mt-6">
              <div className="font-semibold text-lg">Yashas Salian</div>
              <div className="text-sm opacity-90">Dev, WeEnginner</div>
            </footer>
          </blockquote>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/3 left-8 w-24 h-24 bg-blue-400/20 rounded-full blur-lg"></div>
      </div>
    </div>
  )
}
