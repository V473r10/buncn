import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { SignInForm } from "./components/form"

export default function SignIn() {
  return (
    <>
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in to your account
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1 hidden sm:inline-block">
              Don't have an account?
            </span>
            <Button
              aria-label="Sign up"
              variant="link"
              className="h-auto p-0 text-primary"
              asChild
            >
              <Link to="/auth/sign-up">
                Sign up
              </Link>
            </Button>
          </div>
          <Button
            aria-label="Reset password"
            variant="link"
            className="h-auto p-0 text-primary"
            asChild
          >
            <Link to="/auth/reset-password">
              Forgot password?
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}
