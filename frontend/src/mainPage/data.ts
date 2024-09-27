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
    "FSST": "bg-orange-500",
    "AM": "bg-green-400",
    "HWE": "bg-blue-500",
    "E": "bg-cyan-500",
    "KSN": "bg-sky-400",
    "DIC": "bg-yellow-500",
    "D": "bg-purple-500",
    "WIR": "bg-lime-600",
    "NW": "bg-red-700",
    "MTRS": "bg-amber-700",
    "GGP": "bg-stone-500",
    "AUT": "bg-amber-700",
    "AT": "bg-sky-400",
    "ES": "bg-orange-500",
    "KPT": "bg-lime-600",
    "SMLIV": "bg-blue-500",
    "IE": "bg-purple-400",
    "BEHP": "bg-emerald-400",
    "CPE": "bg-blue-500",
    "FI": "bg-lime-600",
    "MEUB": "bg-lime-400",
    "SM": "bg-yellow-400",
    "MANL": "bg-sky-400",
    "TMB": "bg-red-700",
    "KM": "bg-orange-500",
    "KOP": "bg-emerald-400",
    "UWT": "bg-amber-700",
    "FET": "bg-yellow-900",
    "KOPM": "bg-lime-500",
    "MKU": "bg-sky-400",
    "AINF": "bg-emerald-400",
    "KOPD": "bg-yellow-500",
    "KOPK": "bg-sky-400",
    "SYT": "bg-orange-500",
    "MEDT": "bg-yellow-500",
    "NWT": "bg-sky-400",
    "INSY": "bg-emerald-400",
    "SEW": "bg-amber-700",
    "ITP": "bg-blue-500",
    "ITSI": "bg-yellow-400",
    "ROBV": "bg-sky-400",
    "MTSA": "bg-emerald-400",
    "FTBT": "bg-orange-500",
    "ETE": "bg-amber-700",
    "AIIT": "bg-lime-400",
    "MEEM": "bg-blue-500",
    "NWES": "bg-blue-500",
    "UFW": "bg-orange-500",
    "INFI": "bg-emerald-400",
    "SWP": "bg-sky-400",
    "BET": "bg-yellow-500",
    "SESD": "bg-amber-700",
    "AMEC": "bg-purple-400",
    "SPL": "bg-pink-700",
    "JUF": "bg-stone-500",
    "SEIN": "bg-sky-400",
    "DMOD": "bg-orange-500",
    "MTST": "bg-blue-500",
    "MTCAD": "bg-sky-400",
    "MTFTW": "bg-orange-500",
    "RECE": "bg-yellow-500",
    "LO": "bg-red-700",
    "QUM": "bg-green-600",
    "KOMWT": "bg-lime-400",
    "KOMWZ": "bg-amber-700",
}

// Color mapping for departments
export const departmentColors: { [key: string]: string } = {
    "Elektronik": "bg-yellow-300",
    "Informationstechnologie": "bg-orange-600",
    "Maschinenbau": "bg-green-800",
    "Mechatronik": "bg-lime-400",
    "Elektrotechnik": "bg-red-700",
    "Wirtschaftsingenieure": "bg-blue-700",
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
        { value: "E", label: "E" },
        { value: "WIR", label: "WIR" },
        { value: "FSST", label: "FSST" },
        { value: "NW", label: "NW" },
        { value: "MTRS", label: "MTRS" },
        { value: "GGP", label: "GGP" },
    ],
    et: [
        { value: "AM", label: "AM" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
        { value: "AUT", label: "AUT" },
        { value: "AT", label: "AT" },
        { value: "WIR", label: "WIR" },
        { value: "ES", label: "ES" },
        { value: "KPT", label: "KPT" },
        { value: "SMLIV", label: "SMLIV" },
        { value: "IE", label: "IE" },
        { value: "BEHP", label: "BEHP" },
        { value: "CPE", label: "CPE" },
        { value: "NW", label: "NW" },
        { value: "GGP", label: "GGP" },
        { value: "FI", label: "FI" },
    ],
    mb: [
        { value: "AM", label: "AM" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
        { value: "NW", label: "NW" },
        { value: "GGP", label: "GGP" },
        { value: "WIR", label: "WIR" },
        { value: "MEUB", label: "MEUB" },
        { value: "SM", label: "SM" },
        { value: "MANL", label: "MANL" },
        { value: "TMB", label: "TMB" },
        { value: "KM", label: "KM" },
        { value: "AUT", label: "AUT" },
        { value: "KOP", label: "KOP" },
        { value: "UWT", label: "UWT" },
        { value: "FET", label: "FET" },
        { value: "KOPM", label: "KOPM" },
        { value: "AINF", label: "AINF" },
        { value: "MKU", label: "MKU" },
        { value: "KOPD", label: "KOPD" },
        { value: "KOPK", label: "KOPK" },
    ],
    it: [
        { value: "AM", label: "AM" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
        { value: "NW", label: "NW" },
        { value: "GGP", label: "GGP" },
        { value: "WIR", label: "WIR" },
        { value: "SYT", label: "SYT" },
        { value: "MEDT", label: "MEDT" },
        { value: "NWT", label: "NWT" },
        { value: "INSY", label: "INSY" },
        { value: "SEW", label: "SEW" },
        { value: "ITP", label: "ITP" },
        { value: "ITSI", label: "ITSI" },
    ],
    me: [
        { value: "AM", label: "AM" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
        { value: "NW", label: "NW" },
        { value: "GGP", label: "GGP" },
        { value: "WIR", label: "WIR" },
        { value: "ROBV", label: "ROBV" },
        { value: "MTSA", label: "MTSA" },
        { value: "FTBT", label: "FTBT" },
        { value: "KOP", label: "KOP" },
        { value: "ETE", label: "ETE" },
        { value: "AIIT", label: "AIIT" },
        { value: "MEEM", label: "MEEM" },
    ],
    wi: [
        { value: "AM", label: "AM" },
        { value: "D", label: "D" },
        { value: "E", label: "E" },
        { value: "NW", label: "NW" },
        { value: "GGP", label: "GGP" },
        { value: "WIR", label: "WIR" },
        { value: "NWES", label: "NWES" },
        { value: "UFW", label: "UFW" },
        { value: "INFI", label: "INFI" },
        { value: "SWP", label: "SWP" },
        { value: "BET", label: "BET" },
        { value: "KPT", label: "KPT" },
        { value: "SESD", label: "SESD" },
        { value: "AMEC", label: "AMEC" },
        { value: "SPL", label: "SPL" },
        { value: "JUF", label: "JUF" },
        { value: "SEIN", label: "SEIN" },
        { value: "DMOD", label: "DMOD" },
        { value: "MTST", label: "MTST" },
        { value: "MTCAD", label: "MTCAD" },
        { value: "MTFTW", label: "MTFTW" },
        { value: "RECE", label: "RECE" },
        { value: "LO", label: "LO" },
        { value: "QUM", label: "QUM" },
        { value: "KOMWT", label: "KOMWT" },
        { value: "KOMWZ", label: "KOMWZ" },
    ],
}

export const departmentKeys = {
    "el":"Elektronik",
    "it":"Informationstechnologie",
    "mb":"Maschinenbau",
    "me":"Mechatronik",
    "et":"Elektrotechnik",
    "wi":"Wirtschaftsingenieure"
}

export const departmentNames = {
    "Elektronik":"el",
    "Informationstechnologie":"it",
    "Maschinenbau":"mb",
    "Mechatronik":"me",
    "Elektrotechnik":"et",
    "Wirtschaftsingenieure":"wi"
}