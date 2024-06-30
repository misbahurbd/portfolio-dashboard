import { selectCurrentToken } from "@/redux/features/auth/auth-slice"
import { useAppSelector } from "@/redux/hooks"
import { Link, Navigate, Outlet } from "react-router-dom"

const AuthLayout = () => {
  const token = useAppSelector(selectCurrentToken)
  if (token) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <main className="p-4 w-full max-w-[360px] space-y-6">
        <Link to="/">
          <img
            className="block w-40 pl-2 mx-auto"
            src="/misbahurbd-logo.svg"
            alt="Misbahur Rahman Logo"
          />
        </Link>
        <Outlet />
      </main>
    </div>
  )
}
export default AuthLayout
