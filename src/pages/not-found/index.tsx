import { Button } from "@/components/ui/button"
import { PiHouseLineDuotone, PiWarningDuotone } from "react-icons/pi"
import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6">
      <PiWarningDuotone className="size-32 text-primary" />
      <h2 className="font-bold text-xl">Oh! Page not found.</h2>
      <Button
        asChild
        className="flex gap-2"
      >
        <Link to="/">
          <PiHouseLineDuotone />
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
export default NotFoundPage
