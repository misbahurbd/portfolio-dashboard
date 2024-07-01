/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

interface FormTitleInputProps {
  name: string
  placeholder: string
  form: UseFormReturn<any>
  disabled: boolean
}

const FormTitleInput: React.FC<FormTitleInputProps> = ({
  name,
  placeholder,
  form,
  disabled,
}) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              placeholder={placeholder}
              disabled={disabled}
              className="text-xl md:text-2xl font-semibold px-10 border-none !ring-transparent shadow-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormTitleInput
