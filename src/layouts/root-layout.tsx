import { selectCurrentToken } from "@/redux/features/auth/auth-slice"
import { useAppSelector } from "@/redux/hooks"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import DashboardHeader from "./components/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardAside from "./components/dashboard-aside"

const RootLayout = () => {
  const token = useAppSelector(selectCurrentToken)
  const { pathname } = useLocation()

  if (!token) {
    return <Navigate to={"/auth/login"} />
  }

  if (pathname === "/") {
    return <Navigate to={"/blogs"} />
  }

  return (
    <div className="flex flex-1 h-screen">
      <DashboardAside />
      <div className="flex flex-col flex-1 h-screen">
        <DashboardHeader />
        <ScrollArea className="flex-1">
          <main className="p-3 md:p-4 space-y-4 @container">
            <Outlet />
          </main>
        </ScrollArea>
      </div>
    </div>
  )
}
export default RootLayout
