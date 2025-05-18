import { useCallback, useState } from "react"
import { z } from "zod"
import { useAppForm } from "@/components/ui/tanstack-form"
import { signUp } from "@/lib/auth-client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router"

const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
  .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
  .regex(/[0-9]/, { message: "Must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { message: "Must contain at least one special character" })

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  }
)

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const form = useAppForm({
    validators: { onChange: FormSchema },
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true)
      try {
        await signUp.email({
          name: value.name,
          email: value.email,
          password: value.password,
        })
        toast.success("Account created successfully!")
        navigate("/")
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create account. Please try again."
        toast.error(errorMessage)
        console.error("Sign up failed:", err)
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
      <form onSubmit={handleSubmit} className="space-y-4">

        
        <form.AppField
          name="name"
        >
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Full Name</field.FormLabel>
              <field.FormControl>
                <Input
                  placeholder="John Doe"
                  autoComplete="name"
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
        
        <form.AppField
          name="email"
        >
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
        
        <form.AppField
          name="password"
        >
          {(field) => {
            const value = field.state.value || ''
            return (
              <field.FormItem>
                <field.FormLabel>Password</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    disabled={isLoading}
                    value={value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
                <div className="mt-1 text-xs text-muted-foreground">
                  <p>Password must contain:</p>
                  <ul className="list-inside list-disc">
                    <li className={value.length >= 8 ? 'text-green-500' : ''}>
                      At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(value) ? 'text-green-500' : ''}>
                      At least one uppercase letter
                    </li>
                    <li className={/[a-z]/.test(value) ? 'text-green-500' : ''}>
                      At least one lowercase letter
                    </li>
                    <li className={/[0-9]/.test(value) ? 'text-green-500' : ''}>
                      At least one number
                    </li>
                    <li className={/[^A-Za-z0-9]/.test(value) ? 'text-green-500' : ''}>
                      At least one special character
                    </li>
                  </ul>
                </div>
              </field.FormItem>
            )
          }}
        </form.AppField>
        
        <form.AppField
          name="confirmPassword"
        >
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Confirm Password</field.FormLabel>
              <field.FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
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
          Create Account
        </Button>
      </form>
    </form.AppForm>
  )
}
