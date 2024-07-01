import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Navbar from "@/layouts/components/navbar"
import { PiTextAlignCenterDuotone } from "react-icons/pi"
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const MobileNav = () => {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <button
          className="md:hidden transition hover:text-primary"
          type="button"
        >
          <PiTextAlignCenterDuotone className="size-7" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 w-full !max-w-60 flex flex-col gap-4"
      >
        <SheetTitle>
          <div className="p-3 h-14 flex items-center">
            <Link to="/">
              <img
                src="/misbahurbd-logo.svg"
                className="block w-28"
              />
            </Link>
          </div>
        </SheetTitle>
        <Navbar />
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav
