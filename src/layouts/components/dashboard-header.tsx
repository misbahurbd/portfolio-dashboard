import UserNav from "./user-nav"
import MobileNav from "./mobile-nav"

const DashboardHeader = () => {
  return (
    <header className="flex items-center bg-background border-b-[1px] border-border h-14 px-3">
      <MobileNav />
      <UserNav />
    </header>
  )
}
export default DashboardHeader
