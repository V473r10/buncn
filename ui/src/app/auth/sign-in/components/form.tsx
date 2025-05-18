import { useCallback, useState } from "react"
import { z } from "zod"
import { useAppForm } from "@/components/ui/tanstack-form"
import { signIn } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Link } from "react-router"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setError(null)
      setIsLoading(true)
      try {
        await signIn.email({
          email: value.email,
          password: value.password,
        })
      } catch (err) {
        setError("Invalid email or password. Please try again.")
        console.error("Sign in failed:", err)
      } finally {
        setIsLoading(false)
      }
    },
  })

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    },
    [form],
  )

  return (
    <form.AppForm>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        
        <form.AppField name="email">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Email</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        
        <form.AppField name="password">
          {(field) => (
            <field.FormItem>
              <div className="flex items-center justify-between">
                <field.FormLabel>Password</field.FormLabel>
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs text-muted-foreground"
                  asChild
                >
                  <Link to="/auth/reset-password" className="hover:underline">
                    Forgot password?
                  </Link>
                </Button>
              </div>
              <field.FormControl>
                <Input
                  type="password"
                  autoComplete="current-password"
                  disabled={isLoading}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
      </form>
    </form.AppForm>
  )
}
