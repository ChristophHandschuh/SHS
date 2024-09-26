import teacherImg from "../assets/teacher.jpg"
import handImg from "../assets/hand.png"
import binderImg from "../assets/binder.png"
import artImg from "../assets/artlieb.png"

// Sample data for teachers
export const teachers = [
{
    id: 1,
    name: "Leon Binder",
    className: "5AHEL",
    department: "Elektronik",
    subjects: ["AM", "DIC", "FSST"],
    image: binderImg
},
{
    id: 2,
    name: "Christoph Handschuh",
    className: "5AHEL",
    department: "Elektronik",
    subjects: ["E", "HWE"],
    image: handImg
},
{
    id: 3,
    name: "Florian Artlieb",
    className: "5AHITS",
    department: "Informationstechnologie",
    subjects: ["SYT", "FSST"],
    image: artImg
},
{
    id: 4,
    name: "Alice Brown",
    className: "9D",
    department: "Humanities",
    subjects: ["History", "Geography"],
    image: teacherImg
},
{
    id: 5,
    name: "Charlie Wilson",
    className: "8E",
    department: "Arts",
    subjects: ["Art", "Music"],
    image: teacherImg
},
{
    id: 6,
    name: "Eva Davis",
    className: "7F",
    department: "Physical Education",
    subjects: ["Physical Education", "Health"],
    image: teacherImg
},
{
    id: 7,
    name: "Frank Miller",
    className: "6G",
    department: "Technology",
    subjects: ["Computer Science", "Math"],
    image: teacherImg
},
{
    id: 8,
    name: "Grace Taylor",
    className: "5H",
    department: "Languages",
    subjects: ["Spanish", "French"],
    image: teacherImg
}
]

// Color mapping for subjects
export const subjectColors: { [key: string]: string } = {
    "Math": "bg-blue-500",
    "Physics": "bg-purple-500",
    "English": "bg-green-500",
    "Literature": "bg-yellow-500",
    "Biology": "bg-pink-500",
    "Chemistry": "bg-indigo-500",
    "History": "bg-red-500",
    "Geography": "bg-orange-500",
    "Art": "bg-teal-500",
    "Music": "bg-cyan-500",
    "Physical Education": "bg-lime-500",
    "Health": "bg-emerald-500",
    "Computer Science": "bg-violet-500",
    "Spanish": "bg-amber-500",
    "French": "bg-fuchsia-500",
    "SYT": "bg-yellow-500",
    "FSST": "bg-orange-500",
    "AM": "bg-green-500",
    "HWE": "bg-blue-500",
    "E": "bg-cyan-500"
}

// Color mapping for departments
export const departmentColors: { [key: string]: string } = {
    "Science": "bg-blue-200",
    "Humanities": "bg-green-200",
    "Arts": "bg-yellow-200",
    "Physical Education": "bg-red-200",
    "Technology": "bg-purple-200",
    "Languages": "bg-pink-200",
    "Elektronik": "bg-yellow-200",
    "Informationstechnologie": "bg-orange-200"
}

type Subject = {
    value: string
    label: string
}

type DepartmentSubjects = {
    [key: string]: Subject[]
}

export const departmentSubjects: DepartmentSubjects = {
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



export const departments = {
    "el":"Elektronik",
    "it":"Informationstechnologie",
    "mb":"Maschinenbau",
    "me":"Mechatronik",
    "et":"Elektrotechnik",
    "wi":"Wirtschaftsingenieure"
}