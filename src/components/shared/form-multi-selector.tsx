/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { CheckIcon } from "@radix-ui/react-icons"

interface DataItem {
  label: string
  value: string
}

interface FormMultiSelectorProps {
  name: string
  label?: string
  form: UseFormReturn<any>
  placeholder: string
  data: DataItem[]
  disabled: boolean
}

const FormMultiSelector: React.FC<FormMultiSelectorProps> = ({
  name,
  label,
  form,
  placeholder,
  data,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          {label && <FormLabel>{label}</FormLabel>}
          <Popover>
            <FormControl>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  className="w-full justify-between text-muted-foreground"
                >
                  {placeholder}
                </Button>
              </PopoverTrigger>
            </FormControl>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput />
                <CommandGroup>
                  <CommandList>
                    {data.map(item => (
                      <CommandItem
                        className="cursor-pointer justify-between"
                        key={item.value}
                        value={item.value}
                        onSelect={() => {
                          if (field.value.includes(item.value)) {
                            form.setValue(
                              name,
                              field.value.filter(
                                (val: string) => val !== item.value
                              )
                            )
                          } else {
                            form.setValue(name, [...field.value, item.value])
                          }
                        }}
                      >
                        <span>{item.label}</span>
                        {field.value.includes(item.value) && <CheckIcon />}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  )
}

export default FormMultiSelector
