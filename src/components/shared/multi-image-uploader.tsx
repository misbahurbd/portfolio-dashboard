/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUploadMutation } from "@/redux/features/upload/upload-api"
import { ChangeEvent } from "react"
import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { PiPlusSquareDuotone } from "react-icons/pi"

interface MultiImageUploaderProps {
  form: UseFormReturn<any>
  name: string
  setCount: (fn: any) => void
  setImgLoading: (vl: boolean) => void
  className?: string
  disabled: boolean
}

const MultiImageUploader: React.FC<MultiImageUploaderProps> = ({
  form,
  name,
  className,
  setImgLoading,
  setCount,
}) => {
  const [upload] = useUploadMutation()

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setImgLoading(true)
    try {
      e.preventDefault()

      if (!e.target.files || e.target.files.length == 0) return null
      setCount((crr: number) => crr + Number(e.target.files?.length))

      for (const file of e.target.files) {
        const formData = new FormData()
        formData.append("file", file)
        const res = (await upload(formData)) as any
        setCount((crr: number) => crr - 1)
        form.setValue(name, [...form.watch(name), res?.data?.data?.secure_url])
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Unable to upload image")
    } finally {
      setImgLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "relative bg-secondary rounded grid place-items-center h-72 md:h-80 xl:h-96 cursor-pointer overflow-hidden",
        className
      )}
    >
      <input
        id="file"
        type="file"
        onChange={onChange}
        multiple
        hidden
      />
      <label
        htmlFor="file"
        className="block w-full cursor-pointer"
      >
        <div className="flex flex-col items-center justify-center gap-3">
          <span className="absolute inset-4 border-2 border-border border-dashed" />
          <PiPlusSquareDuotone className="size-10 text-muted-foreground" />
        </div>
      </label>
      {form.formState.errors[name] && (
        <p className="absolute bottom-2 text-sm text-destructive">
          {form.formState.errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  )
}
export default MultiImageUploader
