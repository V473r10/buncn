import type { ReactNode } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useSession } from "@/lib/auth-client"
import { Loader2 } from "lucide-react"

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { data, isPending } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isPending && !data) {
      navigate("/auth/sign-in")
    }
  }, [data, isPending, navigate])

  if (isPending) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (data) {
    return <>{children}</>
  }

  return null
}
