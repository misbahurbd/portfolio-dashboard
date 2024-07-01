/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { cn } from "@/lib/utils"

interface FormSelectProps {
  name: string
  label?: string
  placeholder: string
  form: UseFormReturn<any>
  disabled: boolean
  data: { label: string; value: string }[]
  className?: string
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  form,
  label,
  placeholder,
  disabled,
  data,
  className,
}) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="space-y-0.5">
          {label && <FormLabel className="text-sm">{label}</FormLabel>}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger className={cn(className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map(item => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-sm" />
        </FormItem>
      )}
    />
  )
}
export default FormSelect
