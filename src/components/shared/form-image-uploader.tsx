/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUploadMutation } from "@/redux/features/upload/upload-api"
import { ClipLoader as Spinner } from "react-spinners"
import { ChangeEvent } from "react"
import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { PiImageDuotone, PiTrashDuotone } from "react-icons/pi"
import { Button } from "../ui/button"

interface FormImageUploaderProps {
  form: UseFormReturn<any>
  name: string
  placeholder: string
  setImgLoading: (vl: boolean) => void
  className?: string
  disabled: boolean
}

const FormImageUploader: React.FC<FormImageUploaderProps> = ({
  form,
  name,
  className,
  setImgLoading,
  placeholder,
  disabled,
}) => {
  const [upload, { isLoading }] = useUploadMutation()

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImgLoading(true)
    try {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (!file) return null

      const formData = new FormData()
      formData.append("file", file)

      const res = (await upload(formData)) as any

      form.setValue(name, res?.data?.data?.secure_url)
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to upload image")
    } finally {
      setImgLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "relative group border border-border bg-secondary rounded grid place-items-center h-72 md:h-80 xl:h-96 cursor-pointer overflow-hidden",
        className
      )}
    >
      {form.watch(name) && (
        <Button
          variant="destructive"
          size="icon"
          type="button"
          className="absolute transition right-2 top-2 z-10 size-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
          onClick={e => {
            e.stopPropagation()
            form.setValue(name, "")
          }}
        >
          <PiTrashDuotone className="size-4" />
        </Button>
      )}
      <label
        htmlFor="img"
        className="block w-full cursor-pointer"
      >
        {form.watch(name) ? (
          <img
            src={form.watch(name)}
            alt="Image"
            className="absolute w-full h-full left-0 top-0 object-cover object-center"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-3">
            <span className="absolute inset-4 border-2 border-border border-dashed" />
            <PiImageDuotone className="size-10 text-muted-foreground" />
            <p className="font-medium text-muted-foreground">{placeholder}</p>
          </div>
        )}
        {isLoading && (
          <div className="absolute bg-secondary/40 backdrop-blur-sm grid place-items-center w-full h-full top-0 left-0">
            <Spinner
              size={30}
              color="blue"
            />
          </div>
        )}
        <input
          type="file"
          id="img"
          hidden
          disabled={disabled}
          onChange={onChange}
        />
      </label>
      {form.formState.errors[name] && (
        <p className="absolute bottom-2 text-sm text-destructive">
          {form.formState.errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  )
}
export default FormImageUploader
