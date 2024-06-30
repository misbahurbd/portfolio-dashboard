import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { logOut } from "@/redux/features/auth/auth-slice"
import { useGetMeQuery } from "@/redux/features/user/user-api"
import { useAppDispatch } from "@/redux/hooks"
import { useState } from "react"
import { Link } from "react-router-dom"

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading, data: user } = useGetMeQuery("")
  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <Button
        size="icon"
        variant="secondary"
        className="hover:bg-primary/10 hover:text-primary ml-auto"
      />
    )
  }

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className={cn("relative rounded-full ml-auto")}
        >
          <img
            src={user?.data?.image || "/avatar.jpg"}
            alt={user?.data?.name}
            className="block rounded-full w-full h-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52"
        side="bottom"
        align="end"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <h4 className="text-sm font-medium leading-none">
              {user?.data?.name}
            </h4>
            <p className="text-xs leading-none text-muted-foreground font-normal">
              @{user?.data?.username}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            asChild
          >
            <Link to="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            asChild
          >
            <Link to="/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => dispatch(logOut())}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserNav
