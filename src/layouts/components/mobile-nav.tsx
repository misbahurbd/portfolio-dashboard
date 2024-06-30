import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "@/layouts/components/navbar"
import { PiTextAlignCenterDuotone } from "react-icons/pi"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false)

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
        <div className="p-3 h-14 flex items-center">
          <Link to="/">
            <img
              src="/misbahurbd-logo.svg"
              className="block w-28"
            />
          </Link>
        </div>
        <Navbar />
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav
