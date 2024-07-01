/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { cn } from "@/lib/utils"
import { Textarea } from "../ui/textarea"

interface FormTextareaProps {
  name: string
  label?: string
  placeholder: string
  form: UseFormReturn<any>
  disabled: boolean
  counter?: boolean
  max?: number
  className?: string
}

const FormTextarea: React.FC<FormTextareaProps> = ({
  name,
  form,
  label,
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
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              disabled={disabled}
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
export default FormTextarea
