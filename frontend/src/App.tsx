import { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import TeacherComp from "./mainPage/teachercomp"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose

} from "@/components/ui/sheet"

interface Teacher {
    id: number;
    name: string;
    className: string;
    department: string;
    subjects: string;  // This is a string representation of an array
    image: string;
}

export default function App() {
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [teachers, setTeachers] = useState<(Teacher & { subjects: string[] })[]>([])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('http://localhost:3000/teachers')
        if (!response.ok) {
          throw new Error('Failed to fetch teachers')
        }
        const data: Teacher[] = await response.json()
        // Parse the subjects string into an actual array for each teacher
        const parsedTeachers = data.map(teacher => ({
          ...teacher,
          subjects: JSON.parse(teacher.subjects.replace(/'/g, '"'))
        }))
        setTeachers(parsedTeachers)
      } catch (error) {
        console.error('Error fetching teachers:', error)
      }
    }

    fetchTeachers()
  }, [])

  const allSubjects = useMemo(() => {
    const subjects = new Set<string>()
    teachers.forEach(teacher => {
      console.log(teacher.subjects)
      teacher.subjects.forEach(subject => subjects.add(subject))
    })
    return Array.from(subjects).sort()
  }, [teachers])

  const allDepartments = useMemo(() => {
    const departments = new Set<string>()
    teachers.forEach(teacher => {
      departments.add(teacher.department)
    })
    return Array.from(departments).sort()
  }, [teachers])

  const filteredTeachers = teachers.filter(teacher =>
    (subjectFilter === "all" || teacher.subjects.includes(subjectFilter)) &&
    (departmentFilter === "all" || teacher.department === departmentFilter)
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-mono font-bold text-gray-900 tracking-tight w-98">&lt;SHS Platform/&gt; Schüler helfen Schüler</h1>
        <div className="flex space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button>
                <User className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Dein Profil</SheetTitle>
                <SheetDescription>
                  Hier kannst du dein Profil als Nachhilfelehrer ändern.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" placeholder="Max Mustermann" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Klasse
                  </Label>
                  <Input id="class" placeholder="1AHEL" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Abteilung
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Wähle deine Abteilung" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Abteilung</SelectLabel>
                        <SelectItem value="el">Elektronik</SelectItem>
                        <SelectItem value="it">Informationstechnologie</SelectItem>
                        <SelectItem value="mb">Maschinenbau</SelectItem>
                        <SelectItem value="me">Mechatronik</SelectItem>
                        <SelectItem value="et">Elektrotechnik</SelectItem>
                        <SelectItem value="wi">Wirtschaftsingenieure</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subjects" className="text-right">
                    Fächer
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select your subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Fächer</SelectLabel>
                        <SelectItem value="am">AM</SelectItem>
                        <SelectItem value="mtrs">MTRS</SelectItem>
                        <SelectItem value="dic">DIC</SelectItem>
                        <SelectItem value="hwe">HWE</SelectItem>
                        <SelectItem value="fsst">FSST</SelectItem>
                        <SelectItem value="d">D</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Profilbild
                  </Label>
                  <Input id="image" type="file" className="col-span-3" />
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <div className="w-64 hidden lg:block">
            <Select onValueChange={setDepartmentFilter} value={departmentFilter}>
              <SelectTrigger id="department-filter" className="w-full">
                <SelectValue placeholder="Filter nach Abteilung" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Abteilungen</SelectItem>
                {allDepartments.map(department => (
                  <SelectItem key={department} value={department}>{department}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-64 hidden lg:block">
            <Select onValueChange={setSubjectFilter} value={subjectFilter}>
              <SelectTrigger id="subject-filter" className="w-full">
                <SelectValue placeholder="Filter nach Fächern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Fächer</SelectItem>
                {allSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        <div className="flex-1 block lg:hidden">
            <Select onValueChange={setDepartmentFilter} value={departmentFilter}>
              <SelectTrigger id="department-filter" className="w-full">
                <SelectValue placeholder="Filter nach Abteilung" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Abteilungen</SelectItem>
                {allDepartments.map(department => (
                  <SelectItem key={department} value={department}>{department}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 block lg:hidden">
            <Select onValueChange={setSubjectFilter} value={subjectFilter}>
              <SelectTrigger id="subject-filter" className="w-full">
                <SelectValue placeholder="Filter nach Fächern" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Fächer</SelectItem>
                {allSubjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
      </div>

      <hr className="border-t border-gray-300 my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeachers.map(teacher => (
          <TeacherComp key={teacher.id} prop={teacher}/>
        ))}
      </div>
    </div>
  )
}