import { cn } from "@/lib/utils"
import { ClipLoader as Spinner } from "react-spinners"

interface LoadingUiProps {
  subject: string
  className?: string
}

const LoadingUi: React.FC<LoadingUiProps> = ({ subject, className }) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 items-center justify-center py-12 md:py-16 lg:py-20 px-6 md:px-12",
        className
      )}
    >
      <Spinner
        className="size-32"
        color="blue"
      />
      <p className="text-center animate-pulse">Loading {subject} data.</p>
    </div>
  )
}
export default LoadingUi
