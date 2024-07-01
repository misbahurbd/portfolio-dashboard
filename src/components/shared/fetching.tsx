import { ClipLoader as Spinner } from "react-spinners"

const Fetching = ({ isFetching }: { isFetching: boolean }) => {
  if (isFetching) {
    return (
      <div className="absolute z-10 inset-0 flex flex-col gap-6 items-center justify-center bg-background/90 backdrop-blur-sm">
        <Spinner
          size={30}
          color="blue"
        />
      </div>
    )
  } else {
    return null
  }
}

export default Fetching
