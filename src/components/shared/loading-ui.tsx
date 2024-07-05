import { ClipLoader as Spinner } from "react-spinners"

interface LoadingUiProps {
  subject: string
}

const LoadingUi: React.FC<LoadingUiProps> = ({ subject }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center py-12 md:py-16 lg:py-20 px-6 md:px-12">
      <Spinner
        className="size-32"
        color="blue"
      />
      <p className="text-center animate-pulse">Loading {subject} data.</p>
    </div>
  )
}
export default LoadingUi
