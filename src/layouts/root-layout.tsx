import { selectCurrentToken } from "@/redux/features/auth/auth-slice"
import { useAppSelector } from "@/redux/hooks"
import { Navigate, Outlet } from "react-router-dom"
import DashboardHeader from "./components/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import DashboardAside from "./components/dashboard-aside"

const RootLayout = () => {
  const token = useAppSelector(selectCurrentToken)

  if (!token) {
    return <Navigate to={"/auth/login"} />
  }

  return (
    <div className="flex flex-1 h-screen">
      <DashboardAside />
      <div className="flex flex-col flex-1 h-screen">
        <DashboardHeader />
        <ScrollArea className="flex-1">
          <main className="p-3 space-y-4">
            <Outlet />
          </main>
        </ScrollArea>
        <footer>footer</footer>
      </div>
    </div>
  )
}
export default RootLayout
