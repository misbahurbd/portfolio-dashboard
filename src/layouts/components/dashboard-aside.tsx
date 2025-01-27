import Navbar from "@/layouts/components/navbar"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PiTextAlignCenterDuotone } from "react-icons/pi"
import { cn } from "@/lib/utils"

const DashboardAside = () => {
  const [navCollapse, setNavCollapse] = useState(false)

  const toggleNavCollapse = () => {
    const crrStatus = navCollapse
    setNavCollapse(!crrStatus)
    localStorage.navCollapse = JSON.stringify(!crrStatus)
  }

  useEffect(() => {
    if (localStorage.navCollapse) {
      setNavCollapse(JSON.parse(localStorage.navCollapse))
    } else {
      localStorage.navCollapse = JSON.stringify(false)
    }
  }, [])

  return (
    <div
      className={cn(
        "hidden md:flex border-r-[1px] border-border h-screen w-52 shrink-0 flex-col gap-2",
        navCollapse && "w-13"
      )}
    >
      <div
        className={cn(
          "p-2 border-b-[1px] border-border h-14 shrink-0 flex items-center gap-2",
          navCollapse && "p-0 justify-center"
        )}
      >
        <button
          className="transition hover:text-primary"
          type="button"
          onClick={toggleNavCollapse}
        >
          <PiTextAlignCenterDuotone className="size-[2.1rem] scale-90" />
        </button>
        {!navCollapse && (
          <Link to="/">
            <img
              src="/misbahurbd-logo.svg"
              className="block w-24"
            />
          </Link>
        )}
      </div>
      <Navbar navCollapse={navCollapse} />
    </div>
  )
}
export default DashboardAside
