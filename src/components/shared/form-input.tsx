/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"

interface FormInputProps {
  name: string
  label?: string
  placeholder: string
  form: UseFormReturn<any>
  type?: string
  disabled: boolean
  counter?: boolean
  max?: number
  className?: string
}

const FormInput: React.FC<FormInputProps> = ({
  name,
  form,
  label,
  type = "text",
  placeholder,
  disabled,
  counter = false,
  max,
  className,
}) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className={cn("space-y-0.5", className)}>
          {label && <FormLabel className="text-sm">{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              type={type}
              {...field}
            />
          </FormControl>
          <div className="flex items-center">
            <FormMessage className="text-sm" />
            {counter && (
              <span
                className={cn(
                  "ml-auto text-xs text-muted-foreground",
                  max && form.watch(name).length > max && "text-destructive"
                )}
              >
                {form.watch(name).length}
              </span>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}
export default FormInput
