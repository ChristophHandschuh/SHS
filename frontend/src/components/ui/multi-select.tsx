import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Subject = {
  value: string
  label: string
}

type DepartmentSubjects = {
  [key: string]: Subject[]
}

const departmentSubjects: DepartmentSubjects = {
  el: [
    { value: "AM", label: "AM" },
    { value: "HWE", label: "HWE" },
    { value: "KSN", label: "KSN" },
    { value: "D", label: "D" },
    { value: "DIC", label: "DIC" },
  ],
  et: [
    { value: "calculus", label: "Calculus" },
    { value: "algebra", label: "Algebra" },
    { value: "statistics", label: "Statistics" },
    { value: "discreteMath", label: "Discrete Mathematics" },
    { value: "linearAlgebra", label: "Linear Algebra" },
  ],
  mb: [
    { value: "SYT", label: "SYT" },
    { value: "NW", label: "NW" },
    { value: "E", label: "E" },
    { value: "IT", label: "Quantum Physics" },
    { value: "GGP", label: "GGP" },
  ],
  it: [
    { value: "SYT", label: "SYT" },
    { value: "NW", label: "NW" },
    { value: "E", label: "E" },
    { value: "IT", label: "IT" },
    { value: "GGP", label: "GGP" },
  ],
  me: [
    { value: "SYT", label: "SYT" },
    { value: "NW", label: "NW" },
    { value: "E", label: "E" },
    { value: "IT", label: "Quantum Physics" },
    { value: "GGP", label: "GGP" },
  ],
  wi: [
    { value: "SYT", label: "SYT" },
    { value: "NW", label: "NW" },
    { value: "E", label: "E" },
    { value: "IT", label: "Quantum Physics" },
    { value: "GGP", label: "GGP" },
  ],
}

interface MultiSelectProps {
  department: keyof typeof departmentSubjects
}

export function MultiSelect({ department }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string[]>([])

  const subjects = departmentSubjects[department] || []

  const handleSetValue = (val: string) => {
    if (value.includes(val)) {
        value.splice(value.indexOf(val), 1);
        setValue(value.filter((item) => item !== val));
    } else {
        setValue(prevValue => [...prevValue, val]);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="col-span-3 justify-between h-auto min-h-[2.5rem] py-2"
      >
        <div className="flex flex-wrap gap-2 justify-start items-center">
            {value?.length ?
                value.map((val, i) => (
                    <div key={i} className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">{subjects.find((subject) => subject.value === val)?.label}</div>
                ))
                : "Wähle deine Fächer"}
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      </PopoverTrigger>
      <PopoverContent className="col-span-3 p-0">
        <Command>
          <CommandInput placeholder="Fach suchen..." />
          <CommandEmpty>Fach nicht gefunden</CommandEmpty>
          <CommandList>
            <CommandGroup>
              <CommandList>
                  {subjects.map((subject) => (
                      <CommandItem
                          key={subject.value}
                          value={subject.value}
                          onSelect={() => {
                              handleSetValue(subject.value)
                          }}
                      >
                          <Check
                              className={cn(
                                  "mr-2 h-4 w-4",
                                  value.includes(subject.value) ? "opacity-100" : "opacity-0"
                              )}
                          />
                          {subject.label}
                      </CommandItem>
                  ))}
              </CommandList>
            </CommandGroup>
          </CommandList>
         </Command>
      </PopoverContent>
    </Popover>
  )
}