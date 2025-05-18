import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "react-router"
import { SignUpForm } from "./components/form"

export default function SignUp() {
  return (
    <>
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your details to create your account
        </p>
      </div>
      
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-center gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="mr-1">
              Already have an account?
            </span>
            <Button
              aria-label="Sign in"
              variant="link"
              className="h-auto p-0 text-primary"
              asChild
            >
              <Link to="/auth/sign-in">
                Sign in
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
