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
import { departmentSubjects } from "@/mainPage/data"

interface Teacher {
  name: string;
  className: string;
  department: string;
  subjects: string[];
  image: string;
}

interface MultiSelectProps {
  department: keyof typeof departmentSubjects
  setUser: React.Dispatch<React.SetStateAction<Teacher>>
  User: Teacher
}

export function MultiSelect({ department, setUser, User }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedSubjects, setSelectedSubjects] = React.useState<string[]>(User.subjects || [])

  const subjects = departmentSubjects[department] || []

  const handleSetValue = (val: string) => {
    setSelectedSubjects(prev => {
      const newSubjects = prev.includes(val)
        ? prev.filter(item => item !== val)
        : [...prev, val]
      
      setUser(prevUser => ({ ...prevUser, subjects: newSubjects }))
      return newSubjects
    })
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
            {selectedSubjects.length > 0 ? (
              selectedSubjects.map((val, i) => (
                <div key={i} className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">
                  {subjects.find((subject) => subject.value === val)?.label}
                </div>
              ))
            ) : (
              "Wähle deine Fächer"
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="col-span-3 p-0">
        <Command className="max-h-[300px] overflow-auto">
          <CommandInput placeholder="Fach suchen..." />
          <CommandEmpty>Kein Fach gefunden</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {subjects.map((subject) => (
                <CommandItem
                  key={subject.value}
                  value={subject.value}
                  onSelect={() => handleSetValue(subject.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedSubjects.includes(subject.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {subject.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}