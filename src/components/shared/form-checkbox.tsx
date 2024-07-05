/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Checkbox } from "../ui/checkbox"

interface FormCheckboxProps {
  name: string
  label: string
  form: UseFormReturn<any>
  disabled: boolean
}

const FormCheckbox: React.FC<FormCheckboxProps> = ({
  name,
  label,
  form,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="space-y-0.5">
            <div className="flex flex-row items-center space-x-3 ">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={disabled}
                  {...field}
                />
              </FormControl>
              <FormLabel className="text-sm font-normal">{label}</FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
export default FormCheckbox
