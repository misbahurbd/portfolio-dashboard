/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod"
import { ScaleLoader as Spinner } from "react-spinners"
import { Form } from "@/components/ui/form"
import { loginFormSchema } from "@/validations/auth.validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { PiKeyDuotone, PiUserDuotone } from "react-icons/pi"
import AuthFormInput from "@/pages/auth/components/auth-form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useLoginMutation } from "@/redux/features/auth/auth-api"
import { useAppDispatch } from "@/redux/hooks"
import { setCredentials } from "@/redux/features/auth/auth-slice"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onLogin = async (values: z.infer<typeof loginFormSchema>) => {
    const toastId = toast.loading("Logging in...")
    try {
      const res = await login(values).unwrap()
      if (res.success) {
        const { accessToken } = res.data
        dispatch(setCredentials({ accessToken }))
        toast.success("Login successful!", { id: toastId })
        navigate("/", { replace: true })
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
      })
    }
  }

  return (
    <div className="">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onLogin)}
          className="grid gap-2"
        >
          <AuthFormInput
            form={form}
            icon={PiUserDuotone}
            name="username"
            placeholder="Username"
            disabled={isLoading}
          />
          <AuthFormInput
            form={form}
            icon={PiKeyDuotone}
            name="password"
            type="password"
            placeholder="Password"
            disabled={isLoading}
          />
          <Button type="submit">
            {isLoading ? (
              <Spinner
                color="white"
                height={15}
              />
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default LoginPage
