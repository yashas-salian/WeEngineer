import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useClerk } from "@clerk/clerk-react"

export const SSOCallback = () => {
  const { handleRedirectCallback } = useClerk()
  const navigate = useNavigate()

  useEffect(() => {
    const completeSSO = async () => {
      try {
        await handleRedirectCallback({
          redirectUrl: window.location.search+'/sso',
          signInForceRedirectUrl : '/dashboard',
          signUpForceRedirectUrl : '/dashboard'
        })
        navigate("/dashboard")
      } catch (err) {
        console.error("OAuth error:", err)
        navigate("/signin")
      }
    }

    completeSSO()
  }, [])

  return <p className="text-center mt-10 text-gray-600">Completing login...</p>
}
