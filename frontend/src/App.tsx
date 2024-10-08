import { useState, useMemo, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { User } from "lucide-react"
import { MultiSelect } from './components/ui/multi-select'
import Footer from "./components/ui/footer"
import TeacherComp from "./mainPage/teachercomp"
import axios from "axios"

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
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { departmentKeys } from "./mainPage/data"

interface Teacher {
    id: number;
    name: string;
    className: string;
    department: string;
    subjects: string | string[];  // This is a string representation of an array
    image: string;
}

interface intfUser {
  id: number;
  name: string;
  className: string;
  department: string;
  subjects: string | string[];  // This is a string representation of an array
  newImage: string;
  oldImage: string;
}

export default function App() {
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [teachers, setTeachers] = useState<(Teacher & { subjects: string[] })[]>([])
  const [selectedProfileDepartment, setSelectedProfileDepartment] = useState('');
  const [user, setUser] = useState<intfUser>({id: 0,name: "", className: "", department: "", subjects: "", newImage: "", oldImage: ""});
  const [sideOpen, setSideOpen] = useState(false);
  const [alert, setAlert] = useState(false);


  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/teachers')
      if (!response.ok) {
        throw new Error('Failed to fetch teachers')
      }
      const data: Teacher[] = await response.json()
      console.log(data);
      // Parse the subjects string into an actual array for each teacher
      const parsedTeachers = data.map(teacher => ({
        ...teacher,
        subjects: JSON.parse((teacher.subjects as string).replace(/'/g, '"'))
      }))
      setTeachers(parsedTeachers)
    } catch (error) {
      console.error('Error fetching teachers:', error)
    }
  }

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get(
      "access_token"
    );

    console.log("Bearer " + token);

    axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: {
        Authorization: "Bearer " + token
      },
    })
    .then((resOauth) => {
      console.log(resOauth.data);
      axios.get("http://localhost:3000/getteacher?id="+resOauth.data["id"])
      .then((res) => {
        console.log("Server Daten:", res.data);
        if('id'in res.data){
          setUser(prevUser => ({
            ...prevUser,
            name: res.data["name"],
            id: res.data["id"],
            className: res.data["className"],
            department: res.data["department"],
            subjects: JSON.parse(res.data["subjects"].replace(/'/g, '"')),
            oldImage: res.data["image"]
          }));
          setSelectedProfileDepartment(res.data["department"]);
        }else{
          setUser(prevUser => ({
            ...prevUser,
            name: resOauth.data["displayName"],
            id: resOauth.data["id"]
          }));
        }
        setSideOpen(true);
      })
      .catch((error) => {
        console.log("error " + error);
      });
    })
    .catch((error) => {
      console.log("error " + error);
    });

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

  const handleSave = async () => {
    if (!user.id || !user.name || !user.className || !user.department || user.subjects.length === 0 || !(user.newImage || user.oldImage)) {
      console.error('Missing required user information');
      setAlert(true);
      return;
    }else{
      setSideOpen(false);
    }

    const formData = new FormData();
    formData.append('id', user.id.toString());
    formData.append('name', user.name);
    formData.append('className', user.className);
    formData.append('department', user.department);
    formData.append('subjects', JSON.stringify(user.subjects));

    if (user.newImage) {
      const response = await fetch(user.newImage);
      const blob = await response.blob();
      formData.append('image', blob, 'profile.jpg');
    }

    try {
      const response = await axios.post('http://localhost:3000/addteacher', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User saved successfully:', response.data);
      fetchTeachers();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-mono font-bold text-gray-900 tracking-tight w-98 hidden md:block">&lt;SHS Platform /&gt; Schüler helfen Schüler</h1>
        <h1 className="text-3xl font-mono font-bold text-gray-900 tracking-tight w-98 md:hidden">&lt;SHS Platform /&gt;</h1>
        <div className="flex space-x-2">
          <Sheet open={sideOpen} onOpenChange={setSideOpen}>
            <Button onClick={() => window.location.href = 'https://login.microsoftonline.com/190dcb4f-6bec-43c6-b761-484429dbf536/oauth2/v2.0/authorize?response_type=code&client_id=fb51977a-b42a-4905-84a9-5df79cb0d3fb&scope=user.read&redirect_uri=http://localhost:3000/oauth/redirect'}>
              <User className="h-4 w-4" />
              <p className="text-white ml-2 hidden md:block">Nachhilfe geben</p>
            </Button>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Dein Profil</SheetTitle>
                <SheetDescription>
                  Hier kannst du dein Profil als Nachhilfelehrer ändern. <br /> <br /> Mit dem speichern deines 
                  Profils aktzeptierst du automatisch die Einsehbarkeit für alle SchülerInnen und Eltern.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" readOnly={true} value={user?.name ?? ''} placeholder="Name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="class" className="text-right">
                    Klasse
                  </Label>
                  <Input id="class" onChange={(e) => setUser(prevUser => ({ ...prevUser, className: e.target.value }))} value={user?.className ?? ''}placeholder="1AHEL" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Abteilung
                  </Label>
                  <Select 
                    value={selectedProfileDepartment} 
                    onValueChange={(value) => {
                        setSelectedProfileDepartment(value);
                        setUser(prevUser => ({ ...prevUser, department: value }));
                      }}
                    >
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
                  <MultiSelect department={ selectedProfileDepartment } setUser={setUser} User={user}/>
                </div>
                <div className='flex justify-center'>
                  {user.oldImage && <img src={user.oldImage} alt="Old Profile" className="w-32 h-32 object-cover rounded-full" />}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="image" className="text-right">
                    Profilbild
                  </Label>
                  <Input id="image" type="file" className="col-span-3" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setUser(prevUser => ({ ...prevUser, newImage: reader.result as string }));
                        };
                        reader.readAsDataURL(file);
                        console.log(user);
                      }
                    }} 
                  />
                </div>
              </div>
              <SheetFooter>
                <Button onClick={handleSave} type="submit">Save</Button>
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
                  <SelectItem key={department} value={department}>{departmentKeys[department as keyof typeof departmentKeys]}</SelectItem>
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
                  <SelectItem key={department} value={department}>{departmentKeys[department as keyof typeof departmentKeys]}</SelectItem>
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

      <Separator className="my-8 bg-gray-400" />
      <AlertDialog open={alert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Bitte fülle alle Felder aus!</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setAlert(false)}>Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredTeachers.map(teacher => (
          <TeacherComp key={teacher.id} prop={teacher}/>
        ))}
      </div>
      <Footer />
    </div>
  )
}