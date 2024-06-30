/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { IconType } from "react-icons"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { PiEyeDuotone, PiEyeSlashDuotone } from "react-icons/pi"

interface AuthFormInputProps {
  form: UseFormReturn<any>
  name: string
  icon: IconType
  placeholder: string
  type?: "text" | "email" | "password"
  disabled: boolean
}

const AuthFormInput = ({
  form,
  name,
  placeholder,
  icon: Icon,
  type = "text",
  disabled,
}: AuthFormInputProps) => {
  const [selectedType, setSelectedType] = useState(type)

  const toggleType = () => {
    setSelectedType(crrType => (crrType === "password" ? "text" : "password"))
  }

  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative group/input">
              <span className="absolute h-full aspect-square left-0 top-0 grid place-items-center">
                <Icon className="text-muted-foreground group-focus-within/input:text-primary" />
                <span className="absolute top-1/2 -translate-y-1/2 right-0 h-3/5 w-[1px] rounded bg-border group-focus-within/input:bg-primary" />
              </span>
              <Input
                placeholder={placeholder}
                type={selectedType}
                disabled={disabled}
                className={cn("pl-12")}
                {...field}
                autoComplete="off"
              />
              {type === "password" && (
                <button
                  onClick={toggleType}
                  type="button"
                  className="absolute right-1 top-1 bottom-1 aspect-square grid place-items-center text-muted-foreground hover:bg-primary/10 hover:text-primary rounded"
                >
                  {selectedType === "password" ? (
                    <PiEyeDuotone />
                  ) : (
                    <PiEyeSlashDuotone />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default AuthFormInput
