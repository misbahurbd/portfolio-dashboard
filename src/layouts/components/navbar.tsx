import { navlinks } from "@/constants/base"
import { cn } from "@/lib/utils"
import { Link, useLocation } from "react-router-dom"

const Navbar = ({ navCollapse = false }: { navCollapse?: boolean }) => {
  const { pathname } = useLocation()
  const links = navlinks(pathname)

  return (
    <nav className="flex flex-col gap-6 h-full">
      <ul className="grid gap-0.5">
        {links.map((link, i) => (
          <li
            key={"link-" + i + link.path}
            className="relative"
          >
            <Link
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-3 py-1.5 relative h-9 group/link",
                !link.isActive && "hover:bg-secondary/80 hover:text-foreground",
                link.isActive && "text-primary bg-primary/10"
              )}
            >
              <span className="block px-1">
                <link.icon className="text-[1.1em]" />
              </span>
              <span
                className={cn(
                  navCollapse &&
                    "absolute transition invisible opacity-0 translate-x-3 left-[120%] top-1/2 -translate-y-1/2 bg-background drop-shadow-md z-10 px-2 py-1 rounded group-hover/link:visible group-hover/link:opacity-100 group-hover/link:translate-x-0"
                )}
              >
                {link.label}
                <span className="absolute size-2 left-0 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-background rotate-45" />
              </span>
              <span
                className={cn(
                  "absolute transition w-0 bg-primary h-full top-0 -right-[1px]",
                  link.isActive && "w-1"
                )}
              />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
