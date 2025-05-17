import { useCallback } from "react";
import { useAppForm } from "~/components/ui/tanstack-form"
import { signIn } from "~/lib/auth-client"
import { z } from "zod"
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const FormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export const SignInForm = () => {

    const form = useAppForm({
        validators: { onChange: FormSchema },
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: ({ value }) => signIn.email({
            email: value.email,
            password: value.password,
        }),
    });

    const handleSubmit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
        },
        [form],
    );
    return (
        <form.AppForm>
            <form className="space-y-6" onSubmit={handleSubmit}>
                <form.AppField
                    name="email"
                    children={(field) => (
                        <field.FormItem>
                            <field.FormLabel>Email</field.FormLabel>
                            <field.FormControl>
                                <Input
                                    placeholder="email@example.com"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                            </field.FormControl>
                            <field.FormDescription>
                                This is your public display name.
                            </field.FormDescription>
                            <field.FormMessage />
                        </field.FormItem>
                    )}
                />
                <form.AppField
                    name="password"
                    children={(field) => (
                        <field.FormItem>
                            <field.FormLabel>Password</field.FormLabel>
                            <field.FormControl>
                                <Input
                                    placeholder="password"
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                            </field.FormControl>
                            <field.FormDescription>
                                This is your public display name.
                            </field.FormDescription>
                            <field.FormMessage />
                        </field.FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </form.AppForm>
    );
}